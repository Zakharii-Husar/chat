using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using API.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using API.Services.UsersService;

namespace API.Controllers
{
    [Route("chat-api/[controller]")]
    [ApiController]

    public partial class ChatsController(
        UserManager<AppUser> userManager,
        UsersService usersService,
        IAllChatsService allChatsService,
        IChatMembershipService chatMembershipService,
        IPrivateChatsService privateChatsService,
        GroupService groupService,
        WSService WSService) : ControllerBase
    {
        [Authorize]
        [HttpPatch("{ChatId}/Rename/{NewName}")]
        public async Task<IActionResult> RenameChat(int ChatId, string NewName)
        {
            var currentUser = await userManager.GetUserAsync(User);
            var isAdmin = await chatMembershipService.CheckRoleAsync(ChatId, currentUser.Id);
            if (!isAdmin) return Unauthorized();
            var notificationContent = await groupService.RenameChatAsync(ChatId, NewName, currentUser);
            if (notificationContent == null) return StatusCode(500);
            var notificationDTO = await allChatsService.SendNotificationAsync(ChatId, notificationContent, currentUser.Id);
            if (notificationDTO != null) await WSService.BroadcastMessageAsync(notificationDTO);
            return Ok();
        }

        [Authorize]
        [HttpPatch("{ChatId}/RmMember/{Username}")]
        public async Task<IActionResult> RemoveChatMember(int ChatId, string Username)
        {
            var currentUser = await userManager.GetUserAsync(User);
            bool isAdmin = await chatMembershipService.CheckRoleAsync(ChatId, currentUser.Id);
            bool isLeaving = currentUser.UserName == Username;
            if (!isAdmin && !isLeaving) return Unauthorized();
            var notificationContent = await chatMembershipService.RmChatMemberAsync(ChatId, Username, currentUser);
            if (notificationContent == null) return StatusCode(500);
            var notification = await allChatsService.SendNotificationAsync(ChatId, notificationContent, currentUser.Id);
            if (notification != null) await WSService.BroadcastMessageAsync(notification);
            return Ok();
        }

        [Authorize]
        [HttpGet("{ChatId}")]
        public async Task<IActionResult> GetChatById(int ChatId, int itemsToSkip = 0, int itemsToTake = 5)
        {
            var currentUser = await userManager.GetUserAsync(User);
            var isMember = await chatMembershipService.GetMemberByChatIdAsync(ChatId, currentUser.Id);
            if (isMember == null) return Unauthorized();
            var chat = await allChatsService.GetChatByIdAsync(currentUser!.Id, ChatId, itemsToSkip, itemsToTake);
            if (chat == null) return StatusCode(500);
            await allChatsService.MarkChatAsReadAsync(ChatId, currentUser);
            await WSService.MarkAsReadAsync(ChatId, currentUser);
            return Ok(chat);
        }

        [Authorize]
        [HttpPost("CreatePrivate/{RecipientUname}")]
        public async Task<IActionResult> CreatePrivateChat(string RecipientUname)
        {
            var recipient = await userManager.FindByNameAsync(RecipientUname);
            if (recipient == null) return BadRequest();
            var currentUser = await userManager.GetUserAsync(User);
            if (currentUser == null) return Unauthorized();
            var chatId = await privateChatsService.CreatePrivateChatAsync(currentUser!.UserName!, RecipientUname);
            if (chatId != null) return Ok(chatId);
            return StatusCode(500);
        }

        [Authorize]
        [HttpPost("CreateGroup")]
        public async Task<IActionResult> CreateGroupChat([FromBody] NewChatModel model)
        {
            if (!ModelState.IsValid) return BadRequest();
            var currentUser = await userManager.GetUserAsync(User);
            if (currentUser == null) return Unauthorized();
            var chatId = await groupService.CreateGroupChatAsync(model, currentUser);
            if (!chatId.HasValue) return StatusCode(500);
            string notificationContent = currentUser.UserName + " created chat.";
            var notification = await allChatsService.SendNotificationAsync(chatId.Value, notificationContent, currentUser.Id);
            if (notification != null) await WSService.BroadcastMessageAsync(notification);
            return Ok();
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetChats(int itemsToSkip = 0, int itemsToTake = 5)
        {
            var currentUser = await userManager.GetUserAsync(User);
            var chatsList = await allChatsService.GetChatsOverviewAsync(currentUser!.Id, itemsToSkip, itemsToTake);
            return Ok(chatsList);
        }

        [Authorize]
        [HttpGet("GetIdByUname/{Username}")]
        public async Task<IActionResult> GetChatIdByUsername(string Username)
        {
            var currentUser = await userManager.GetUserAsync(User);
            var chatId = await privateChatsService.GetPrivateChatIdAsync(currentUser!.UserName!, Username);
            return Ok(chatId);
        }

        [Authorize]
        [HttpPost("{ChatId}/AddMember/{Username}")]
        public async Task<IActionResult> AddChatMember(int ChatId, string Username)
        {
            var candidat = usersService.GetUserByUnameAsync(Username);
            if (candidat == null) return BadRequest();
            var currentUser = await userManager.GetUserAsync(User);
            bool isAdmin = await chatMembershipService.CheckRoleAsync(ChatId, currentUser!.Id);
            if (!isAdmin) return Unauthorized();
            var isAlreadyAdded = chatMembershipService.GetMemberByUnameAsync(ChatId, Username);
            if (isAlreadyAdded != null) return Ok();
            var notificationContent = await chatMembershipService.AddChatMemberAsync(ChatId, Username, currentUser);
            if (notificationContent == null) return StatusCode(500);
            var notification = await allChatsService.SendNotificationAsync(ChatId, notificationContent, currentUser.Id);
            if (notification != null) await WSService.BroadcastMessageAsync(notification);
            return Ok();
        }
    };
}

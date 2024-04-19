using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using API.Models;

namespace API.Controllers
{
    [Route("chat-api/Chats/Group")]
    [ApiController]

    public partial class GroupChatsController(
        UserManager<AppUser> userManager,
        IUsersService usersService,
        IAllChatsService allChatsService,
        IChatMembershipService chatMembershipService,
        IGroupChatService groupService,
        IWSService WSService) : ControllerBase
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
            var notificationDTO = await allChatsService.SendNotificationAsync(ChatId, currentUser.Id, notificationContent);
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
            var notification = await allChatsService.SendNotificationAsync(ChatId, currentUser.Id, notificationContent);
            if (notification != null) await WSService.BroadcastMessageAsync(notification);
            return Ok();
        }



        [Authorize]
        [HttpPost("Create")]
        public async Task<IActionResult> CreateGroupChat([FromBody] NewChatModel model)
        {
            if (!ModelState.IsValid) return BadRequest();
            var currentUser = await userManager.GetUserAsync(User);
            if (currentUser == null) return Unauthorized();
            var chatId = await groupService.CreateGroupChatAsync(model, currentUser);
            if (!chatId.HasValue) return StatusCode(500);
            string notificationContent = currentUser.UserName + " created chat.";
            var notification = await allChatsService.SendNotificationAsync(chatId.Value, currentUser.Id, notificationContent);
            if (notification != null) await WSService.BroadcastMessageAsync(notification);
            return Ok();
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
            var notification = await allChatsService.SendNotificationAsync(ChatId, currentUser.Id, notificationContent);
            if (notification != null) await WSService.BroadcastMessageAsync(notification);
            return Ok();
        }
    };
}

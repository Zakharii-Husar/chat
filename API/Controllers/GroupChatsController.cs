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
            var isAdmin = await chatMembershipService.GetMemberByUnameAsync(ChatId, currentUser!.UserName);
            if (isAdmin == null) return Unauthorized();
            var notificationContent = await groupService.RenameChatAsync(ChatId, NewName, currentUser);
            if (notificationContent == null) return StatusCode(500);
            var notificationMsg = await allChatsService.SendNotificationAsync(ChatId, currentUser.Id, notificationContent);

            var payload = new SysMessagePayload { NewChatName = NewName };
            if (notificationMsg != null) await WSService.BroadcastSysMessageAsync(notificationMsg, currentUser.Id, "rename_chat", payload);
            return Ok();
        }

        [Authorize]
        [HttpPatch("{ChatId}/RmMember/{Username}")]
        public async Task<IActionResult> RemoveChatMember(int ChatId, string Username)
        {
            try 
            {
                var currentUser = await userManager.GetUserAsync(User);
                if (currentUser == null) return Unauthorized();

                bool isAdmin = await chatMembershipService.CheckRoleAsync(ChatId, currentUser.Id);
                bool isLeaving = currentUser.UserName == Username;
                
                if (!isAdmin && !isLeaving) return Unauthorized();
                
                var notificationContent = await chatMembershipService.RmChatMemberAsync(ChatId, Username, currentUser);
                if (notificationContent == null) return StatusCode(500);

                var notification = await allChatsService.SendNotificationAsync(ChatId, currentUser.Id, notificationContent);
                
                if (notification != null)
                {
                    var member = await usersService.GetUserByUnameAsync(Username);
                    var payload = new SysMessagePayload { Member = member };
                    await WSService.BroadcastSysMessageAsync(notification, Username, "rm_member", payload);
                }

                return Ok();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Critical Error in RemoveChatMember: {ex.Message}");
                Console.WriteLine($"Stack Trace: {ex.StackTrace}");
                return StatusCode(500, new { error = "Internal server error" });
            }
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
            if (notification != null) await WSService.BroadcastMessageAsync(notification, currentUser.Id);
            return Ok(chatId);
        }

        [Authorize]
        [HttpPost("{ChatId}/AddMember/{Username}")]
        public async Task<IActionResult> AddChatMember(int ChatId, string Username)
        {
            try 
            {
                var currentUser = await userManager.GetUserAsync(User);
                if (currentUser == null) return Unauthorized();

                var isAdmin = await chatMembershipService.CheckRoleAsync(ChatId, currentUser.Id);
                if (!isAdmin)
                {
                    Console.WriteLine($"Error: User {currentUser.UserName} attempted to add {Username} without permission to chat {ChatId}");
                    return Unauthorized();
                }

                var notificationContent = await chatMembershipService.AddChatMemberAsync(ChatId, Username, currentUser);
                if (notificationContent == null) return StatusCode(500);

                var notification = await allChatsService.SendNotificationAsync(ChatId, currentUser.Id, notificationContent);
                
                if (notification != null)
                {
                    var newMember = await usersService.GetUserByUnameAsync(Username);
                    var payload = new SysMessagePayload { Member = newMember };
                    await WSService.BroadcastSysMessageAsync(notification, currentUser.Id, "add_member", payload);
                }

                return Ok();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Critical Error in AddChatMember: {ex.Message}");
                Console.WriteLine($"Stack Trace: {ex.StackTrace}");
                return StatusCode(500, new { error = "Internal server error" });
            }
        }
    };
}

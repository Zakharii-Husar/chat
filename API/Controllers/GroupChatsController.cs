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
                if (currentUser == null)
                {
                    Console.WriteLine($"Error: Current user is null when trying to remove {Username} from chat {ChatId}");
                    return Unauthorized();
                }

                bool isAdmin = await chatMembershipService.CheckRoleAsync(ChatId, currentUser.Id);
                bool isLeaving = currentUser.UserName == Username;
                
                if (!isAdmin && !isLeaving)
                {
                    Console.WriteLine($"Error: User {currentUser.UserName} attempted to remove {Username} without permission from chat {ChatId}");
                    return Unauthorized();
                }
                
                var notificationContent = await chatMembershipService.RmChatMemberAsync(ChatId, Username, currentUser);
                if (notificationContent == null)
                {
                    Console.WriteLine($"Error: Failed to remove member {Username} from chat {ChatId}. Notification content is null");
                    return StatusCode(500);
                }

                try 
                {
                    var notification = await allChatsService.SendNotificationAsync(ChatId, currentUser.Id, notificationContent);
                    if (notification != null)
                    {
                        try 
                        {
                            await WSService.BroadcastMessageAsync(notification, currentUser.Id);
                        }
                        catch (Exception wsEx)
                        {
                            Console.WriteLine($"Warning: WebSocket broadcast failed: {wsEx.Message}");
                            // Continue execution - WebSocket failure shouldn't prevent member removal
                        }
                    }
                }
                catch (Exception notifEx)
                {
                    Console.WriteLine($"Warning: Notification creation failed: {notifEx.Message}");
                    // Continue execution - notification failure shouldn't prevent member removal
                }
                
                return Ok(new { message = notificationContent });
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
            var candidat = await usersService.GetUserByUnameAsync(Username);
            if (candidat == null) return BadRequest();
            var currentUser = await userManager.GetUserAsync(User);
            bool isAdmin = await chatMembershipService.CheckRoleAsync(ChatId, currentUser!.Id);
            if (!isAdmin) return Unauthorized();
            var isAlreadyAdded = await chatMembershipService.GetMemberByUnameAsync(ChatId, Username);
            if (isAlreadyAdded != null) return Ok();
            var notificationContent = await chatMembershipService.AddChatMemberAsync(ChatId, Username, currentUser);
            if (notificationContent == null) return StatusCode(500);
            var notification = await allChatsService.SendNotificationAsync(ChatId, currentUser.Id, notificationContent);
            if (notification != null) await WSService.BroadcastMessageAsync(notification, currentUser.Id);
            return Ok();
        }
    };
}

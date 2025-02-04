using API.Data;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("chat-api/Chats/All")]
    [ApiController]
    public class AllChatsController(UserManager<AppUser> userManager,
        IChatMembershipService chatMembershipService,
        IAllChatsService allChatsService,
        IWSService WSService) : ControllerBase
    {

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetChats(int itemsToSkip = 0, int itemsToTake = 5)
        {
            var currentUser = await userManager.GetUserAsync(User);
            var chatsList = await allChatsService.GetChatsOverviewAsync(currentUser!.Id, itemsToSkip, itemsToTake);
            
            foreach (var chat in chatsList)
            {
                chat.SenderIsOnline = chat.SenderId == currentUser.Id || WSService.IsUserOnline(chat.SenderId);
                
                if (chat.Interlocutor != null)
                {
                    chat.Interlocutor.IsOnline = WSService.IsUserOnline(chat.Interlocutor.Id);
                }
            }
            
            return Ok(chatsList);
        }

        [Authorize]
        [HttpGet("{ChatId}")]
        public async Task<IActionResult> GetChatById(int ChatId, int itemsToSkip = 0, int itemsToTake = 5)
        {
            var currentUser = await userManager.GetUserAsync(User);
            var isMember = await chatMembershipService.GetMemberByChatIdAsync(ChatId, currentUser!.Id);
            if (isMember == null) return Unauthorized();
            var chat = await allChatsService.GetChatByIdAsync(currentUser!.Id, ChatId, itemsToSkip, itemsToTake);
            if (chat == null) return StatusCode(500);
            await allChatsService.MarkChatAsReadAsync(ChatId, currentUser);
            await WSService.MarkAsReadAsync(ChatId, currentUser);
            
            foreach (var msg in chat.Messages)
            {
                msg.SenderIsOnline = msg.SenderId == currentUser.Id || WSService.IsUserOnline(msg.SenderId);
                
                if (msg.Interlocutor != null)
                {
                    msg.Interlocutor.IsOnline = WSService.IsUserOnline(msg.Interlocutor.Id);
                }
            }
            chat.Members.ForEach(m => m.IsOnline = WSService.IsUserOnline(m.Id));
            return Ok(chat);
        }
    }
}

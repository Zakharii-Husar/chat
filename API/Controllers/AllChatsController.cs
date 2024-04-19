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
            return Ok(chat);
        }
    }
}

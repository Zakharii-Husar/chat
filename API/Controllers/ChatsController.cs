using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Services.ChatsService;

namespace API.Controllers
{
    [Route("chat-api/[controller]")]
    [ApiController]

    public class ChatsController(UserManager<AppUser> userManager, IChatsService chatsService) : ControllerBase
    {
        [HttpGet("GetChatsOverview")]
        public async Task<IActionResult> GetChatsOverview([FromQuery] int itemsToSkip)
        {
            var currentUser = await userManager.GetUserAsync(User);
            var chatsList = await chatsService.GetChatsOverviewAsync(currentUser!.Id, itemsToSkip, 5);
            return Ok(chatsList);
        }

        [HttpGet("GetChatById")]
        public async Task<IActionResult> GetChatById([FromQuery] int chatId, int itemsToSkip)
        {
            const int itemsToTake = 5;
            var currentUser = await userManager.GetUserAsync(User);
            var chat = await chatsService.GetChatAsync(currentUser!.Id, chatId, itemsToSkip, itemsToTake);
            return Ok(chat);
        }

    }
}

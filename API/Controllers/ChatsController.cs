using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Services.ChatsService;
using Microsoft.AspNetCore.Authorization;
using API.Models;

namespace API.Controllers
{
    [Route("chat-api/[controller]")]
    [ApiController]

    public class ChatsController(UserManager<AppUser> userManager, IChatsService chatsService) : ControllerBase
    {
        [Authorize]
        [HttpGet("GetChatsOverview")]
        public async Task<IActionResult> GetChatsOverview([FromQuery] int itemsToSkip)
        {
            var currentUser = await userManager.GetUserAsync(User);
            var chatsList = await chatsService.GetChatsOverviewAsync(currentUser!.Id, itemsToSkip, 5);
            return Ok(chatsList);
        }

        [Authorize]
        [HttpGet("GetChatById/{chatId}")]
        public async Task<IActionResult> GetChatById(int chatId, [FromQuery] int itemsToSkip)
        {
            const int itemsToTake = 5;
            var currentUser = await userManager.GetUserAsync(User);
            var chat = await chatsService.GetChatAsync(currentUser!.Id, chatId, itemsToSkip, itemsToTake);
            return Ok(chat);
        }

        [Authorize]
        [HttpGet("GetChatIdByUsername/{username}")]
        public async Task<IActionResult> GetChatIdByUsername(string username)
        {
            var currentUser = await userManager.GetUserAsync(User);
            var chatId = await chatsService.GetPrivateChatIdAsync(currentUser!.UserName!, username);
            return Ok(chatId);

        }

        [Authorize]
        [HttpPost("CreatePrivateChat")]
        public async Task<IActionResult> CreatePrivateChat([FromBody] string username)
        {
            var recipient = await userManager.FindByNameAsync(username);
            if (recipient == null) return BadRequest();
            var currentUser = await userManager.GetUserAsync(User);
            if (currentUser == null) return Unauthorized();
            var chatId = await chatsService.CreatePrivateChatAsync(currentUser!.UserName!, username);
            if (chatId != null) return Ok(chatId);
            return StatusCode(500);
        }

        [Authorize]
        [HttpPost("CreateGroupChat")]
        public async Task<IActionResult> CreateGroupChat([FromBody] NewChatModel model)
        {
            if (!ModelState.IsValid) return BadRequest();
            var currentUser = await userManager.GetUserAsync(User);
            if (currentUser == null) return Unauthorized();
            var chatId = await chatsService.CreateGroupChatAsync(model, currentUser);
            if (chatId != null) return Ok(chatId);
            return StatusCode(500);
        }

    }
}

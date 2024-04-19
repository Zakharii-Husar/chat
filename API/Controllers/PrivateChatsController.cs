using API.Data;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("chat-api/Chats/Private")]
    [ApiController]
    public class PrivateChatsController(UserManager<AppUser> userManager, IPrivateChatService privateChatService) : ControllerBase
    {
        [Authorize]
        [HttpPost("Create/{RecipientUname}")]
        public async Task<IActionResult> CreatePrivateChat(string RecipientUname)
        {
            var recipient = await userManager.FindByNameAsync(RecipientUname);
            if (recipient == null) return BadRequest();
            var currentUser = await userManager.GetUserAsync(User);
            if (currentUser == null) return Unauthorized();
            var chatId = await privateChatService.CreatePrivateChatAsync(currentUser!.UserName!, RecipientUname);
            if (chatId != null) return Ok(chatId);
            return StatusCode(500);
        }

        [Authorize]
        [HttpGet("GetIdByUname/{Username}")]
        public async Task<IActionResult> GetChatIdByUsername(string Username)
        {
            var currentUser = await userManager.GetUserAsync(User);
            var chatId = await privateChatService.GetPrivateChatIdAsync(currentUser!.UserName!, Username);
            return Ok(chatId);
        }
    }
}

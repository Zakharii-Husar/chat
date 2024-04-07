using API.Services.ChatsService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.ChatsController
{
    public partial class ChatsController
    {
        [Authorize]
        [HttpGet("GetIdByUname/{username}")]
        public async Task<IActionResult> GetChatIdByUsername(string username)
        {
            var currentUser = await userManager.GetUserAsync(User);
            var chatId = await chatsService.GetPrivateChatIdAsync(currentUser!.UserName!, username);
            return Ok(chatId);

        }
    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.ChatsController
{
    public partial class ChatsController
    {
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
    }
}

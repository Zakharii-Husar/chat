using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.ChatsController
{
    public partial class ChatsController
    {
        [Authorize]
        [HttpPost("CreatePrivate")]
        public async Task<IActionResult> CreatePrivateChat([FromBody] string Username)
        {
            var recipient = await userManager.FindByNameAsync(Username);
            if (recipient == null) return BadRequest();
            var currentUser = await userManager.GetUserAsync(User);
            if (currentUser == null) return Unauthorized();
            var chatId = await chatsService.CreatePrivateChatAsync(currentUser!.UserName!, Username);
            if (chatId != null) return Ok(chatId);
            return StatusCode(500);
        }
    }
}

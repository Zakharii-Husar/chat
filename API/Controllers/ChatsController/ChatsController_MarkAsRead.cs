using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.ChatsController
{
    public partial class ChatsController
    {
        [Authorize]
        [HttpPost("MarkAsRead")]
        public async Task<IActionResult> MarkAsRead([FromBody] int chatId)
        {
            if (!ModelState.IsValid) return BadRequest();
            var currentUser = await userManager.GetUserAsync(User);
            if (currentUser == null) return Unauthorized();
            var result = await chatsService.MarkChatAsReadAsync(chatId, currentUser);
            if (result) return Ok();
            return StatusCode(500);
        }
    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.ChatsController
{
    public partial class ChatsController
    {
        [Authorize]
        [HttpPost("{ChatId}/MarkAsRead")]
        public async Task<IActionResult> MarkAsRead(int ChatId)
        {
            if (!ModelState.IsValid) return BadRequest();
            var currentUser = await userManager.GetUserAsync(User);
            if (currentUser == null) return Unauthorized();
            var result = await chatsService.MarkChatAsReadAsync(ChatId, currentUser);
            if (result) return Ok();
            return StatusCode(500);
        }
    }
}

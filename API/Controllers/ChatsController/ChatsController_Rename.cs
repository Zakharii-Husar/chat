using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.ChatsController
{
    public partial class ChatsController
    {
        [Authorize]
        [HttpPatch("{ChatId}/Rename/{NewName}")]
        public async Task<IActionResult> RenameChat(int ChatId, string NewName)
        {
            if (!ModelState.IsValid) return BadRequest();
            var currentUser = await userManager.GetUserAsync(User);
            if (currentUser == null) return Unauthorized();
            var result = await chatsService.RenameChatAsync(ChatId, NewName, currentUser);
            if (result) return Ok();
            return StatusCode(500);
        }
    }
}

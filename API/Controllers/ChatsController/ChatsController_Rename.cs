using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.ChatsController
{
    public partial class ChatsController
    {
        [Authorize]
        [HttpPatch("Rename")]
        public async Task<IActionResult> RenameChat([FromBody] RenameChatRequest model)
        {
            if (!ModelState.IsValid) return BadRequest();
            var currentUser = await userManager.GetUserAsync(User);
            if (currentUser == null) return Unauthorized();
            var result = await chatsService.RenameChatAsync(model, currentUser);
            if (result) return Ok();
            return StatusCode(500);
        }
    }
}

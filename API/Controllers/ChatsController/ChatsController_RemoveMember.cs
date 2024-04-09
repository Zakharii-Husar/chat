using API.Data;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.ChatsController
{
    public partial class ChatsController
    {
        [Authorize]
        [HttpPatch("{chatId}/RmMember/{username}")]
        public async Task<IActionResult> RemoveChatMember(int chatId, string username)
        {
            if (!ModelState.IsValid) return BadRequest();
            var currentUser = await userManager.GetUserAsync(User);
            if (currentUser == null) return Unauthorized();
            var result = await chatsService.RmChatMemberAsync(chatId, username, currentUser);
            if (result) return Ok();
            return StatusCode(500);
        }
    }
}

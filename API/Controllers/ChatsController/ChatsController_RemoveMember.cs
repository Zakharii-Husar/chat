using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.ChatsController
{
    public partial class ChatsController
    {
        [Authorize]
        [HttpPost("RemoveChatMember")]
        public async Task<IActionResult> RemoveChatMember([FromBody] EditMembershipRequest request)
        {
            if (!ModelState.IsValid) return BadRequest();
            var currentUser = await userManager.GetUserAsync(User);
            if (currentUser == null) return Unauthorized();
            var result = await chatsService.RmChatMemberAsync(request, currentUser);
            if (result) return Ok();
            return StatusCode(500);
        }
    }
}

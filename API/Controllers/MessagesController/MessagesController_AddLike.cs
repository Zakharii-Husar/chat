using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.MessagesController
{
    public partial class MessagesController
    {
        [HttpPost("{messageId}/AddLike")]
        public async Task<IActionResult> AddLike(int messageId)
        {
            var currentUser = await userManager.GetUserAsync(User);
            if (currentUser == null) return Unauthorized();
            var result = await chatsService.AddLikeAsync(messageId, currentUser.Id);
            if (!result) return BadRequest();
            return Ok();
        }
    }
}

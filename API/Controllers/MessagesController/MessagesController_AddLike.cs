using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.MessagesController
{
    public partial class MessagesController
    {
        [HttpPost("{MessageId}/AddLike")]
        public async Task<IActionResult> AddLike(int MessageId)
        {
            var currentUser = await userManager.GetUserAsync(User);
            if (currentUser == null) return Unauthorized();
            var result = await chatsService.AddLikeAsync(MessageId, currentUser.Id);
            if (!result) return BadRequest();
            return Ok();
        }
    }
}

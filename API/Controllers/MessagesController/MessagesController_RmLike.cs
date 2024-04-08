using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.MessagesController
{
    public partial class MessagesController
    {
        [HttpDelete("{messageId}/RmLike")]
        public async Task<IActionResult> RmLike(int messageId)
        {
            var currentUser = await userManager.GetUserAsync(User);
            if (currentUser == null) return Unauthorized();
            var result = await chatsService.RmLikeAsync(messageId, currentUser.Id);
            if (!result) return BadRequest();
            return Ok();
        }
    }
}

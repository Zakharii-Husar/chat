using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.MessagesController
{
    public partial class MessagesController
    {
        [HttpDelete("{MessageId}/RmLike")]
        public async Task<IActionResult> RmLike(int MessageId)
        {
            var currentUser = await userManager.GetUserAsync(User);
            if (currentUser == null) return Unauthorized();
            var result = await chatsService.RmLikeAsync(MessageId, currentUser.Id);
            if (!result) return BadRequest();
            return Ok();
        }
    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.MessagesController
{
    public partial class MessagesController
    {
        [Authorize]
        [HttpPatch("{messageId}/MarkAsDeleted")]
        public async Task<IActionResult> MarkAsDeleted(int messageId)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var currentUser = await userManager.GetUserAsync(User);
            var result = await chatsService.MarkMsgAsDelAsync(messageId, currentUser!.Id);
            return Ok(result);
        }
    }
}

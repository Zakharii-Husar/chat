using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.MessagesController
{
    public partial class MessagesController
    {
        [Authorize]
        [HttpPost("Send")]
        public async Task<IActionResult> Send([FromBody] SendMessageModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var currentUser = await userManager.GetUserAsync(User);
            var result = await chatsService.SendMsgAsync(model, currentUser!.Id);
            if (!result) return StatusCode(500);
            return Ok();
        }
    }
}
U
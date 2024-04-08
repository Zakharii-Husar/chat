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
            var participantsIds = await chatsService.GetMembersIdsAsync(model.ChatId);
            if (!participantsIds.Contains(currentUser!.Id)) return Unauthorized();
            var insertedMessage = await chatsService.InsertAsync(model, currentUser.Id);
            if (insertedMessage == null) return StatusCode(500);

            return Ok();
        }
    }
}

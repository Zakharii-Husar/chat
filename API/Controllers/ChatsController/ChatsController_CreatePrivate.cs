using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.ChatsController
{
    public partial class ChatsController
    {
        [Authorize]
        [HttpPost("CreatePrivate/{RecipientUname}")]
        public async Task<IActionResult> CreatePrivateChat(string RecipientUname)
        {
            var recipient = await userManager.FindByNameAsync(RecipientUname);
            if (recipient == null) return BadRequest();
            var currentUser = await userManager.GetUserAsync(User);
            if (currentUser == null) return Unauthorized();
            var chatId = await chatsService.CreatePrivateChatAsync(currentUser!.UserName!, RecipientUname);
            if (chatId != null) return Ok(chatId);
            return StatusCode(500);
        }
    }
}

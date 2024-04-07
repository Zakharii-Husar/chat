using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.ChatsController
{
    public partial class ChatsController
    {
        [Authorize]
        [HttpGet("GetChatById/{chatId}")]
        public async Task<IActionResult> GetChatById(int chatId, [FromQuery] int itemsToSkip)
        {
            const int itemsToTake = 5;
            var currentUser = await userManager.GetUserAsync(User);
            var chat = await chatsService.GetChatDTOAsync(currentUser!.Id, chatId, itemsToSkip, itemsToTake);
            return Ok(chat);
        }
    }

}
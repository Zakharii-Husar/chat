using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.ChatsController
{
    public partial class ChatsController
    {
        [Authorize]
        [HttpGet("{chatId}")]
        public async Task<IActionResult> GetChatById(int chatId, int itemsToSkip = 0, int itemsToTake = 5)
        {
            var currentUser = await userManager.GetUserAsync(User);
            var chat = await chatsService.GetChatDTOAsync(currentUser!.Id, chatId, itemsToSkip, itemsToTake);
            return Ok(chat);
        }
    }

}
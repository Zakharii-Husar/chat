using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.ChatsController
{
    public partial class ChatsController
    {
        [Authorize]
        [HttpGet("{ChatId}")]
        public async Task<IActionResult> GetChatById(int ChatId, int itemsToSkip = 0, int itemsToTake = 5)
        {
            var currentUser = await userManager.GetUserAsync(User);
            var chat = await chatsService.GetChatDTOAsync(currentUser!.Id, ChatId, itemsToSkip, itemsToTake);
            return Ok(chat);
        }
    }

}
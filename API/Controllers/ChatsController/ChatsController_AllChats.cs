using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.ChatsController
{
    public partial class ChatsController
    {
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetChats(int itemsToSkip = 0, int itemsToTake = 5)
        {
            var currentUser = await userManager.GetUserAsync(User);
            var chatsList = await chatsService.GetChatsOverviewAsync(currentUser!.Id, itemsToSkip, itemsToTake);
            return Ok(chatsList);
        }
    }
}

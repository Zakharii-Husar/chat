using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.ChatsController
{
    public partial class ChatsController
    {
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetChats([FromQuery] int itemsToSkip)
        {
            var currentUser = await userManager.GetUserAsync(User);
            var chatsList = await chatsService.GetChatsOverviewAsync(currentUser!.Id, itemsToSkip, 5);
            return Ok(chatsList);
        }
    }

}
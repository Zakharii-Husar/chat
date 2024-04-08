using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Services.ChatsService;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers.ChatsController
{
    [Route("chat-api/[controller]")]
    [ApiController]

    public partial class ChatsController(
        UserManager<AppUser> userManager,
        IChatsService chatsService) : ControllerBase
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

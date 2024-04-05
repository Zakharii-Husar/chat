using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Services.MessagesService;

namespace API.Controllers
{
    [Route("chat-api/[controller]")]
    [ApiController]

    public class ChatsController(UserManager<AppUser> userManager, IChatsService chatsService) : ControllerBase
    {
        [HttpGet("GetChatsOverview")]
        public async Task<IActionResult> GetChatsOverview([FromQuery] int paginationOffset)
        {
            var currentUser = await userManager.GetUserAsync(User);
            var currentUserId = currentUser?.Id;

            var chatsList = await chatsService.GetChatsOverview(currentUserId, paginationOffset, 5);
            return Ok(chatsList);
        }
    }
}

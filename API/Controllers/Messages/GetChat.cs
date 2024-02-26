using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Models;
using API.Models.DB;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace API.Controllers.Messages
{
    [Route("chat-api/[controller]")]
    [ApiController]
    public class GetChat(AppDbContext dbContext, UserManager<AppUser> userManager) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Get([FromBody] string friendId)
        {
            var currentUser = await userManager.GetUserAsync(User);
            if (currentUser == null)
            {
                return Unauthorized();
            }

            var currentUserId = currentUser.Id;

            var messagesWithUsers = await dbContext.Messages
                .Include(m => m.Sender)
                .Where(m =>
                    (m.SenderId == currentUserId || m.SenderId == friendId))
                .ToListAsync();

            return Ok(messagesWithUsers);
        }
    }
}


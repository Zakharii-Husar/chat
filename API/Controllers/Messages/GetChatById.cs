using System.Reflection.Metadata.Ecma335;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers.Messages
{
    [Route("chat-api/[controller]")]
    [ApiController]
    public class GetChatById(AppDbContext dbContext, UserManager<AppUser> userManager) : ControllerBase
    {
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Get([FromBody] int chatId)
        {
            var currentUser = await userManager.GetUserAsync(User);
            if (currentUser == null) { return Unauthorized(); }
            var currentUserId = currentUser.Id;


            var chat = await dbContext.Chats
                .Where(chat => chat.ChatId == chatId)
                .Where(chat => chat.ChatMembers.Any(member => member.MemberId == currentUserId))
                .ToListAsync();
            return Ok(chat);

        }

    }
}


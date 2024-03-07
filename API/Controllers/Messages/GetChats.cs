using API.Data;
using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers.Messages
{
    [Route("chat-api/[controller]")]
    [ApiController]
    public class GetChats(AppDbContext dbContext, UserManager<AppUser> userManager) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var currentUser = await userManager.GetUserAsync(User);
            var currentUserId = currentUser?.Id;
            var allChatsIds = await dbContext.ChatMembers
                .Where(cm => cm.MemberId == currentUserId)
                .Select(chat => chat.ChatId)
                .Distinct()
                .ToListAsync();

            var chats = await dbContext.Messages
                .Where(m => allChatsIds.Contains(m.ChatId))
                .GroupBy(m => m.ChatId)
                .Select(g => g.OrderByDescending(m => m.SentAt).First())
                .ToListAsync();

            return Ok(allChatsIds);
        }
    }
}

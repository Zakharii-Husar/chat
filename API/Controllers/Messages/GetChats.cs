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

            var latestMessages = await dbContext.Messages
                .Where(m => allChatsIds.Contains(m.ChatId))
                .GroupBy(m => m.ChatId)
                .Select(g => g.OrderByDescending(m => m.SentAt).FirstOrDefault())
                .ToListAsync();

            var chats = latestMessages
                .Select(m => new
                {
                    m.MessageId,
                    m.SenderId,
                    m.ChatId,
                    Content = !m.IsDeleted ? m.Content : "Deleted",
                    m.SentAt
                    // Include other properties as needed
                })
                .ToList();

            return Ok(chats);


        }
    }
}

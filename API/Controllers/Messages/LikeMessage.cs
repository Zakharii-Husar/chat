using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers.Messages
{
    [Authorize]
    [Route("chat-api/[controller]")]
    [ApiController]
    public class LikeMessageController(AppDbContext dbContext, UserManager<AppUser> userManager) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] int messageId)
        {
            var currentUser = await userManager.GetUserAsync(User);
            var currentUserId = currentUser?.Id;

            var chatId = await dbContext.Chats
                .Where(chat => chat.ChatId == messageId)
                .Select(chat => chat.ChatId)
                .FirstOrDefaultAsync();

            var isAuthorizedToLike = await dbContext.ChatMembers
                .AnyAsync(member => member.MemberId == currentUserId && member.ChatId == chatId);

            var existingLike = await dbContext.Likes
                .FirstOrDefaultAsync(like => like.MessageId == messageId && like.UserId == currentUserId);

            var newLike = new Like
            {
                MessageId = messageId,
                UserId = currentUserId!
            };

            if (!isAuthorizedToLike) return Unauthorized();

            if (existingLike != null)
            {
                dbContext.Likes.Remove(existingLike);
                await dbContext.SaveChangesAsync();
                return Ok();
            }


            dbContext.Likes.Add(newLike);
            await dbContext.SaveChangesAsync();

            return Ok();
        }
    }
}
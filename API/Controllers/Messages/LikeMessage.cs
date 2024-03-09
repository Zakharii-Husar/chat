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

            var chatId = await dbContext.Messages
                .Where(message => message.MessageId == messageId)
                .Select(message => message.ChatId)
                .FirstOrDefaultAsync();

            var isAuthorizedToLike = await dbContext.ChatMembers
                .AnyAsync(member => member.MemberId == currentUserId && member.ChatId == chatId);

            if (!isAuthorizedToLike) return Ok(chatId);

            var existingLike = await dbContext.Likes
                .FirstOrDefaultAsync(like => like.MessageId == messageId && like.UserId == currentUserId);

            if (existingLike != null)
            {
                dbContext.Likes.Remove(existingLike);
                await dbContext.SaveChangesAsync();
                return Ok("unliked");
            }

            var newLike = new Like
            {
                MessageId = messageId,
                UserId = currentUserId!
            };


            dbContext.Likes.Add(newLike);
            await dbContext.SaveChangesAsync();

            return Ok("liked");
        }
    }
}
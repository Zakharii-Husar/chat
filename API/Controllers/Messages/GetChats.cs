using API.Data;
using API.Models;
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

            var userMemberships = await dbContext.ChatMembers
                .Where(cm => cm.MemberId == currentUserId)
                .Select(chat => new { chat.ChatId, chat.EnteredChat, chat.LeftChat })
                .ToListAsync();

            var latestMessages = dbContext.Messages
                .Include(message => message.Chat)
                .Include(message => message.Likes)
                .AsEnumerable()
                .Where(message => userMemberships
                    .Any(cm =>
                    cm.ChatId == message.ChatId &&
                    (cm.LeftChat == null || cm.LeftChat > message.SentAt) &&
                    (cm.EnteredChat <= message.SentAt)))
                .GroupBy(m => m.ChatId)
                .Select(g => g.OrderByDescending(m => m.SentAt).FirstOrDefault())
                .ToList();





            //var userMembershipsIds = await dbContext.ChatMembers
            //    .Where(cm => cm.MemberId == currentUserId)
            //    .Select(chat => chat.ChatId)
            //    .Distinct()
            //    .ToListAsync();

            //var latestMessages = await dbContext.Messages
            //    .Include(m => m.Chat)
            //    .Include(m => m.Likes)
            //    .Where(m => userMembershipsIds.Contains(m.ChatId))
            //    .GroupBy(m => m.ChatId)
            //    .Select(g => g.OrderByDescending(m => m.SentAt).FirstOrDefault())
            //    .ToListAsync();


            var chats = latestMessages
                .Select(m => new MessageDto()
                {
                    MessageId = m.MessageId,
                    SenderId = m.SenderId,
                    SenderUserName = m.Sender?.UserName ?? "Unknown",
                    ChatId = m.ChatId,
                    ChatName = m.Chat?.ChatName ?? m.Sender?.UserName ?? "Unknown",
                    Content = !m.IsDeleted ? m.Content : "Deleted",
                    SentAt = m.SentAt,
                    Likes = m.Likes?.Select(like => like.User?.UserName).ToList() ?? new List<string?>()
                })
                .OrderByDescending(m => m.SentAt)
                .ToList();

            return Ok(chats);


        }
    }
}

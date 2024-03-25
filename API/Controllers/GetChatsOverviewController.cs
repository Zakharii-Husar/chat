using API.Data;
using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("chat-api/[controller]")]
    [ApiController]
    public class GetChatsOverviewController(AppDbContext dbContext, UserManager<AppUser> userManager) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] int paginationOffset)
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
                    cm.EnteredChat <= message.SentAt))
                .GroupBy(m => m.ChatId)
                .Select(g => g.OrderByDescending(m => m.SentAt).FirstOrDefault())
                .ToList();


            var chats = latestMessages
                .Select(m => new MessageDto()
                {
                    MessageId = m.MessageId,
                    SenderId = m.SenderId,
                    SenderUserName = m.Sender?.UserName ?? "Unknown",
                    SenderAvatarName = m.Sender?.AvatarName,
                    ChatName = m.Chat?.ChatName ?? m.Sender?.UserName ?? "Unknown",
                    ChatId = m.ChatId,
                    Content = !m.IsDeleted ? m.Content : m.Sender?.UserName + "deleted message",
                    SentAt = m.SentAt
                })
                .OrderByDescending(m => m.SentAt)
                .ToList();

            const int paginationStep = 5;
            var chatsLeft = chats.Count - paginationOffset;
            var chatsToTake = chatsLeft < paginationStep ? chatsLeft : paginationStep;

            var paginatedChats = chats
                .Skip(paginationOffset)
                .Take(chatsToTake)
                .OrderByDescending(m => m.SentAt);


            return Ok(new
            {
                chats = paginatedChats,
                paginationOffset = paginationOffset + paginationStep,
                hasMore = chatsLeft > paginationStep
            });


        }
    }
}

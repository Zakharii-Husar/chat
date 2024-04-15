using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Repos.MessagesRepo
{
    public partial class MessagesRepo
    {
        public async Task<Message?> GetLastMessageAsync(int chatId, string userId)
        {
            DateTime? leftChat = await dbContext.ChatMembers
                 .Where(chat => chat.ChatId == chatId && chat.MemberId == userId)
                 .Select(cm => cm.LeftChat)
            .FirstOrDefaultAsync();

            if (leftChat == null) return await dbContext.Messages
                    .Include(m => m.ReadReceipts)
                    .ThenInclude(rr => rr.User)
                    .Include(m => m.Likes)
                    .ThenInclude(like => like.User)
                    .Where(m => m.ChatId == chatId)
                    .OrderBy(m => m.SentAt)
                    .LastOrDefaultAsync();

            return await dbContext.Messages
                .Include(m => m.ReadReceipts)
                .ThenInclude(rr => rr.User)
                .Include(m => m.Likes)
                .ThenInclude(like => like.User)
                .Where(m => m.ChatId == chatId)
                .Where(m => m.SentAt < leftChat)
                .OrderBy(m => m.SentAt)
                .LastOrDefaultAsync();
        }
    }
}

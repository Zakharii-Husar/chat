using API.Data;
using Microsoft.EntityFrameworkCore;
namespace API.Repos.MessagesRepo
{
    public partial class MessagesRepo
    {
        public async Task<List<int>> GetUnreadMessagesIds(int chatId, string userId)
        {
            return await dbContext.Messages
                .Where(m => m.ChatId == chatId)
                .Where(m => !m.ReadReceipts.Any(rr => rr.UserId == userId))
                .Select(m => m.MessageId)
                .ToListAsync();
        }
    }
}

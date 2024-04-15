using API.Data;
using Microsoft.EntityFrameworkCore;
namespace API.Repos.MessagesRepo
{
    public partial class MessagesRepo
    {

        public async Task<List<Message>> GetUnreadMessagesAsync(int chatId, string userId)
        {
            return await dbContext.Messages
                .Where(m => m.ChatId == chatId)
                .Where(m => !m.ReadReceipts.Any(rr => rr.UserId == userId))
                .Select(m => m)
                .ToListAsync();
        }
    }
}

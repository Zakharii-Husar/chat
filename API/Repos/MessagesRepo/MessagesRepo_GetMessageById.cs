using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Repos.MessagesRepo
{
    public partial class MessagesRepo
    {
        public async Task<Message?> GetMessageByIdAsync(int messageId)
        {
            return await dbContext.Messages
                .Where(m => m.MessageId == messageId)
                .FirstOrDefaultAsync();
        }
    }
}

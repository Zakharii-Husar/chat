using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Repos.MessagesRepo
{
    public partial class MessagesRepo
    {
        public async Task<ReadReceipt?> GetReadReceiptAsync(int messageId, string userId)
        {
            return await dbContext.ReadReceipts
                .Where(r => r.MessageId == messageId && r.UserId == userId)
                .FirstOrDefaultAsync();
        }
    }
}

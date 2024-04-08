using Microsoft.EntityFrameworkCore;

namespace API.Services.ChatsService
{
    public partial class ChatsService
    {
        public async Task<bool> CheckMembershipByMsgIdAsync(int messageId, string userId)
        {
            return await dbContext.Messages
                .Where(m => m.MessageId == messageId)
                .SelectMany(m => m.Chat.ChatMembers)
                .AnyAsync(member => member.MemberId == userId);
        }
    }
}

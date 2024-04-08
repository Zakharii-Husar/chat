using Microsoft.EntityFrameworkCore;

namespace API.Services.ChatsService
{
    public partial class ChatsService
    {
        public async Task<bool> CheckMembershipByChatIdAsync(int chatId, string userId)
        {
            return await dbContext.ChatMembers
                .Where(m => m.ChatId == chatId && m.MemberId == userId && m.LeftChat == null)
                .AnyAsync();
        }
    }
}

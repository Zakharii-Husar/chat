using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Repos.ChatsRepo
{
    public partial class ChatsRepo
    {
        public async Task<ChatMember?> GetChatMemberAsync(int chatId, string userId)
        {
            return await dbContext.ChatMembers
                .Where(m => m.ChatId == chatId && m.MemberId == userId)
                .FirstOrDefaultAsync();
        }
    }
}

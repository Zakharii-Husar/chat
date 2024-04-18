using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Repos.ChatsRepo
{
    public partial class ChatsRepo
    {
        public async Task<ChatMember?> GetMemberByMsgIdAsync(int messageId, string userId)
        {
            return await dbContext.Messages
           .Where(m => m.MessageId == messageId)
           .SelectMany(m => m.Chat.ChatMembers)
           .FirstOrDefaultAsync(member => member.MemberId == userId);
        }
        public async Task<ChatMember?> GetMemberByChatIdAsync(int chatId, string userId)
        {
            return await dbContext.ChatMembers
                .Where(m => m.ChatId == chatId && m.MemberId == userId)
                .FirstOrDefaultAsync();
        }

        public async Task<ChatMember?> GetMemberByUnameAsync(int chatId, string username)
        {
            return await dbContext.ChatMembers
                .Where(m => m.ChatId == chatId && m.Member.UserName == username)
                .FirstOrDefaultAsync();
        }
    }
}

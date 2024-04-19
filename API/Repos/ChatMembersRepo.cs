using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Repos
{
    public interface IChatMembersRepo
    {
        public Task<bool> AddChatMemberAsync(ChatMember member);
        public Task<bool> RmChatMemberAsync(ChatMember memberToRemove);
        public Task<ChatMember?> GetAdminByChatIdAsync(int chattId);
        public Task<ChatMember?> GetMemberByMsgIdAsync(int chatId, string userId);
        public Task<ChatMember?> GetMemberByChatIdAsync(int chatId, string userId);
        public Task<ChatMember?> GetMemberByUnameAsync(int chatId, string username);
        public Task<List<AppUser>> GetAllMembersAsync(int chatId);
        public Task<List<string>> GetMembersIdsAsync(int chatId);
    }
    public class ChatMembersRepo(AppDbContext dbContext) : IChatMembersRepo
    {
        public async Task<bool> AddChatMemberAsync(ChatMember member)
        {
            await dbContext.ChatMembers.AddAsync(member);
            var rowsAffected = await dbContext.SaveChangesAsync();
            return rowsAffected > 0;
        }

        public async Task<bool> RmChatMemberAsync(ChatMember memberToRemove)
        {
            memberToRemove.LeftChat = DateTime.Now;
            dbContext.ChatMembers.Update(memberToRemove);
            var rowsAffected = await dbContext.SaveChangesAsync();
            return rowsAffected > 0;
        }

        public async Task<ChatMember?> GetAdminByChatIdAsync(int chattId)
        {
            return await dbContext.ChatMembers
                .Where(member => member.ChatId == chattId
                && member.LeftChat == null
                && member.IsCreator == true)
                .FirstOrDefaultAsync();
        }

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

        public async Task<List<AppUser>> GetAllMembersAsync(int chatId)
        {
            return await dbContext.ChatMembers
                .Where(member => member.ChatId == chatId)
                .Select(member => member.Member)
                .ToListAsync();
        }

        public async Task<List<string>> GetMembersIdsAsync(int chatId)
        {
            var members = await dbContext.Chats
                .Where(chat => chat.ChatId == chatId)
                .Select(chat => chat.ChatMembers)
                .FirstAsync();
            return members.Select(member => member.MemberId).ToList();
        }
    }
}

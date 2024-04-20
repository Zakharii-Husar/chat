using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repos
{
    public interface IChatsRepo
    {
        public Task<int?> CreateChatAsync(Chat chat);
        public Task<Chat?> GetChatById(int Id);
        public Task<int?> GetPrivateChatIdAsync(string uname1, string uname2);
        public Task<string?> RenameChatAsync(int chatId, string newName);
        public Task<string?> GetChatNameByIdAsync(int chatId);



    }

    public class ChatsRepo(AppDbContext dbContext) : IChatsRepo
    {
        public async Task<int?> CreateChatAsync(Chat chat)
        {
            dbContext.Chats.Add(chat);
            await dbContext.SaveChangesAsync();

            return chat.ChatId;
        }

        public async Task<Chat?> GetChatById(int Id)
        {
            return await dbContext.Chats
                .Where(chat => chat.ChatId == Id)
                .FirstOrDefaultAsync();
        }

        public async Task<string?> GetChatNameByIdAsync(int chatId)
        {
            return await dbContext.Chats
                .Where(chat => chat.ChatId == chatId)
                .Select(chat => chat.ChatName)
                .FirstOrDefaultAsync();
        }

        public async Task<int?> GetPrivateChatIdAsync(string uname1, string uname2)
        {
            return await dbContext.Chats
              .Where(chat => chat.IsGroupChat == false)
              .Where(chat => chat.ChatMembers.Any(cm => cm.Member.UserName == uname1) &&
                   chat.ChatMembers.Any(cm => cm.Member.UserName == uname2))
              .Select(chat => chat.ChatId)
              .FirstOrDefaultAsync();
        }

        public async Task<string?> RenameChatAsync(int chatId, string newName)
        {
            var chatToUpdate = await GetChatById(chatId);
            if (chatToUpdate == null) return null;

            chatToUpdate.ChatName = newName;
            await dbContext.SaveChangesAsync();
            return newName;
        }
    };
}

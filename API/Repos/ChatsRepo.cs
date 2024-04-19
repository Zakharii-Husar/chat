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
        public Task<List<int>> GetUserChatsIdsAsync(string userId, int itemsToSkip, int itemsToTake);



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

        public async Task<List<int>> GetUserChatsIdsAsync(string userId, int itemsToSkip, int itemsToTake)
        {
            var chatsQuery = dbContext.ChatMembers
                .Where(cm => cm.MemberId == userId)
                .Join(dbContext.Chats, cm => cm.ChatId, c => c.ChatId, (cm, c) => c)
                .Join(dbContext.Messages, c => c.ChatId, m => m.ChatId, (c, m) => c.ChatId)
                .Distinct()
                .Join(
                      dbContext.Messages.GroupBy(m => m.ChatId)
                                        .Select(g => new
                                        {
                                            ChatId = g.Key,
                                            LastMessageTime = g.Max(m => m.SentAt) // Max timestamp for each chat
                                        }),
        chatId => chatId,
        chatGroup => chatGroup.ChatId,
        (chatId, chatGroup) => new
        {
            ChatId = chatId,
            chatGroup.LastMessageTime
        })
    .OrderByDescending(chat => chat.LastMessageTime)
    .Select(chat => chat.ChatId);

            var totalChats = await chatsQuery.CountAsync();

            var itemsLeft = totalChats - itemsToSkip;
            var take = itemsToTake < itemsLeft ? itemsToTake : itemsLeft;
            if (itemsLeft <= 0) return [];

            return await chatsQuery
                .Skip(itemsToSkip)
                .Take(take)
                .ToListAsync();
        }

    };
}

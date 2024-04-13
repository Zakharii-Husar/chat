using Microsoft.EntityFrameworkCore;

namespace API.Repos.ChatsRepo
{
    public partial class ChatsRepo
    {
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
            LastMessageTime = chatGroup.LastMessageTime
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

    }
}

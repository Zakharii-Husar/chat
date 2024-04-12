using Microsoft.EntityFrameworkCore;

namespace API.Repos.ChatsRepo
{
    public partial class ChatsRepo
    {
        public async Task<List<int>> GetUserChatsIdsAsync(string userId, int itemsToSkip, int itemsToTake)
        {
            //The only reason for Join is to prevent returning ids of chats that don't have any messages
            var chatsQuery = dbContext.ChatMembers
                .Where(cm => cm.MemberId == userId)
                .Join(dbContext.Chats, cm => cm.ChatId, c => c.ChatId, (cm, c) => c)
                .Join(dbContext.Messages, c => c.ChatId, m => m.ChatId, (c, m) => c.ChatId)
                .Distinct()
                .OrderByDescending(c => c);

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

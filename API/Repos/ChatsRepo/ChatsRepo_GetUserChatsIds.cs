using Microsoft.EntityFrameworkCore;

namespace API.Repos.ChatsRepo
{
    public partial class ChatsRepo
    {
        public async Task<List<int>> GetUserChatsIdsAsync(string userId, int itemsToSkip, int itemsToTake)
        {
            var totalRows = await dbContext.ChatMembers
                .Where(cm => cm.MemberId == userId)
                .CountAsync();


            var itemsLeft = totalRows - itemsToSkip;
            var take = itemsToTake < itemsLeft ? itemsToTake : itemsLeft;

            return await dbContext.ChatMembers
                .Where(cm => cm.MemberId == userId)
                .Skip(itemsToSkip)
                .Take(take)
                .Select(cm => cm.ChatId)
                .ToListAsync();
        }
    }
}

using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Repos.UsersRepo
{
    public partial class UsersRepo
    {
        public async Task<List<AppUser>> GetSearchedAsync(string currentUserId, string searchQuery, int itemsToSkip = 0, int itemsToTake = 5)
        {
            if (string.IsNullOrEmpty(searchQuery)) return [];

            var usersQuery = dbContext.Users
                .Where(u => u.Id == currentUserId)
                .Where(
                    user =>
                    user.UserName!.Contains(searchQuery, StringComparison.OrdinalIgnoreCase) ||
                    user.FullName.Contains(searchQuery, StringComparison.OrdinalIgnoreCase));

            var usersTotal = await usersQuery.CountAsync();
            var usersLeft = usersTotal - itemsToSkip;
            var usersToTake = usersLeft < itemsToTake ? usersLeft : itemsToTake;
            if (usersToTake < 1) return [];

            return await usersQuery
                .ToListAsync();
        }
    }
}


using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Repos.UsersRepo
{
    public partial class UsersRepo
    {
        public async Task<List<AppUser>> GetAllAsync(string currentUserId, int itemsToSkip = 0, int itemsToTake = 5)
        {

            var usersQuery = userManager.Users
                .Where(u => u.Id != currentUserId);

            var usersTotal = await usersQuery.CountAsync();

            var usersLeft = usersTotal - itemsToSkip;
            var usersToTake = usersLeft < itemsToTake ? usersLeft : itemsToTake;
            if (usersToTake < 1) return [];

            return await usersQuery
                .Skip(itemsToSkip)
                .Take(usersToTake)
                .ToListAsync();
        }
    }
}

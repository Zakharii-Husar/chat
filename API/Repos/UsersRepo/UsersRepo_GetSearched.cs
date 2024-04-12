using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Repos.UsersRepo
{
    public partial class UsersRepo
    {
        public async Task<List<AppUser>> GetSearchedAsync(string currentUserId, string searchQuery, int itemsToSkip = 0, int itemsToTake = 5)
        {
            if (string.IsNullOrEmpty(searchQuery)) return [];

            return await userManager.Users
                .Where(u => u.Id != currentUserId)
                .Where(
                    user =>
                    user.UserName.Contains(searchQuery) ||
                    user.FullName.Contains(searchQuery))
                .ToListAsync();
        }
    }
}


using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Repos.UsersRepo
{
    public partial class UsersRepo
    {
        public async Task<List<AppUser>> GetAllAsync(string currentUserId, int itemsToSkip, int itemsToTake)
        {

            return await userManager.Users
                .Where(u => u.Id == currentUserId)
                .Skip(itemsToSkip)
                .Take(itemsToTake)
                .ToListAsync();
        }
    }
}

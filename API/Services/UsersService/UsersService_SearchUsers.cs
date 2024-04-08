using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Services.UsersService
{
    public partial class UsersService
    {
        public async Task<List<UserDTO>> SearchUsers(
            string query,
            string currentUserId,
            int intemsToSkip,
            int itemsToTake)
        {
            return await dbContext.Users
                .Where(user =>
                    user.UserName!.Contains(query, StringComparison.OrdinalIgnoreCase) ||
                    user.FullName.Contains(query, StringComparison.OrdinalIgnoreCase)
                )
                .Where(user => user.Id != currentUserId)
                .Select(user => ConvertUserToDTO(user))
                .ToListAsync();
        }
    }
}

using API.Data;
using API.Models;

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
            var users = await usersRepo.GetSearchedAsync(currentUserId, query, intemsToSkip, itemsToTake);


            if (users.Count == 0) return [];
            return users.Select(user => user.ToDTO()).ToList();
        }
    }
}

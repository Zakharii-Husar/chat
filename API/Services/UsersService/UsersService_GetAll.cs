using API.Data;
using API.Models;

namespace API.Services.UsersService
{
    public partial class UsersService
    {
        public async Task<List<UserDTO>> GetAllUsers(string currentUserId, int itemsToSkip, int itemsToTake)
        {

            var users = await usersRepo.GetAllAsync(currentUserId, itemsToSkip, itemsToTake);
            return users.Select(user => user.ToDTO()).ToList();
        }
    }
}

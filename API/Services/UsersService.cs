using API.Data;
using API.Models;
using API.Repos;

namespace API.Services
{
    public interface IUsersService
    {
        public Task<List<UserDTO>> GetAllUsers(string currentUserId, int itemsToSkip, int itemsToTake);
        public Task<List<UserDTO>> SearchUsers(string query, string currentUserId, int intemsToSkip, int itemsToTake);
        public Task<UserDTO?> GetUserByUnameAsync(string uname);
        public Task<UserDTO?> GetUserByEmailAsync(string email);
        public Task<bool> UpdateBioAsync(AppUser currentUser, string newBio);
    }
    public class UsersService(IUsersRepo usersRepo) : IUsersService
    {
        public async Task<bool> UpdateBioAsync(AppUser currentUser, string newBio)
        {
            return await usersRepo.UpdateBioAsync(currentUser, newBio);
        }

        public async Task<UserDTO?> GetUserByUnameAsync(string uname)
        {
            var user = await usersRepo.GetUserByUnameAsync(uname);
            if (user == null) return null;
            return user.ToDTO();
        }

        public async Task<UserDTO?> GetUserByEmailAsync(string email)
        {
            var user = await usersRepo.GetUserByEmailAsync(email);
            if (user == null) return null;
            return user.ToDTO();
        }

        public async Task<List<UserDTO>> GetAllUsers(string currentUserId, int itemsToSkip, int itemsToTake)
        {

            var users = await usersRepo.GetAllAsync(currentUserId, itemsToSkip, itemsToTake);
            return users.Select(user => user.ToDTO()).ToList();
        }

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

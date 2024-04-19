using API.Data;
using API.Models;
using API.Repos.UsersRepo;

namespace API.Services
{
    public interface IUsersService
    {

        public Task<List<UserDTO>> GetAllUsers(string currentUserId, int itemsToSkip, int itemsToTake);
        public Task<List<UserDTO>> SearchUsers(string query, string currentUserId, int intemsToSkip, int itemsToTake);
        public Task<AppUser?> GetUserByUnameAsync(string uname);
    }
    public class UsersService(
        IUsersRepo usersRepo,
        IWebHostEnvironment hostingEnvironment,
        AppDbContext dbContext) : IUsersService
    {

        public async Task<AppUser?> GetUserByUnameAsync(string uname)
        {
            return await usersRepo.GetUserByUnameAsync(uname);
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

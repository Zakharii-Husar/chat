using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace API.Repos.UsersRepo
{
    public interface IUsersRepo
    {
        public Task<List<AppUser>> GetUsersAsync(int itemsToSkip, int itemsToTake);
        public Task<List<AppUser>> FindUsersAsync(string query);

        public Task<AppUser?> GetUserByEmailAsync(string email);
        public Task<AppUser?> GetUserByUnameAsync(string uname);
        public Task<AppUser?> GetUserByIdAsync(string uId);
        public Task<AppUser?> CreateUserAsync(AppUser appUser, string password);
        public Task<bool> CheckEmailExistsAsync(string email);
        public Task<bool> CheckUnameExistsAsync(string uname);
        public Task<string> GetAvatarNameByUnameAsync(string uname);
        public Task<bool> UpdateAvatarNameAsync(string uname, string newName);


    }
    public partial class UsersRepo(UserManager<AppUser> userManager) : IUsersRepo
    {
        public async Task<List<AppUser>> GetUsersAsync(int itemsToSkip, int itemsToTake)
        {

            return await userManager.Users
                .Skip(itemsToSkip)
                .Take(itemsToTake)
                .ToListAsync();
        }
    }
}

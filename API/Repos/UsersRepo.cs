using API.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Repos
{
    public interface IUsersRepo
    {
        public Task<List<AppUser>> GetAllAsync(string currentUserId, int itemsToSkip, int itemsToTake);
        public Task<List<AppUser>> GetSearchedAsync(string currentUserId, string searchQuery, int itemsToSkip = 0, int itemsToTake = 5);
        public Task<AppUser?> GetUserByEmailAsync(string email);
        public Task<AppUser?> GetUserByUnameAsync(string uname);
        public Task<AppUser?> GetUserByIdAsync(string uId);
        public Task<AppUser?> CreateUserAsync(AppUser appUser, string password);
        public Task<bool> UpdateAvatarNameAsync(AppUser currentUser, string newName);
    }
    public partial class UsersRepo(UserManager<AppUser> userManager) : IUsersRepo
    {
        public async Task<AppUser?> GetUserByIdAsync(string uId)
        {
            return await userManager.FindByIdAsync(uId);
        }

        public async Task<AppUser?> GetUserByUnameAsync(string uname)
        {
            return await userManager.FindByNameAsync(uname);
        }

        public async Task<AppUser?> GetUserByEmailAsync(string email)
        {
            return await userManager.FindByNameAsync(email);
        }
        public async Task<AppUser?> CreateUserAsync(AppUser appUser, string password)
        {

            var result = await userManager.CreateAsync(appUser, password);

            if (result.Succeeded) return appUser;
            return null;
        }

        public async Task<bool> UpdateAvatarNameAsync(AppUser currentUser, string newName)
        {
            currentUser.AvatarName = newName;
            var result = await userManager.UpdateAsync(currentUser);
            return result.Succeeded;
        }

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

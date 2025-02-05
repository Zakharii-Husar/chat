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
        public Task<bool> UpdateBioAsync(AppUser currentUser, string newBio);
        public Task<bool> UpdateLastSeenAsync(AppUser currentUser);
    }
    public partial class UsersRepo(UserManager<AppUser> userManager, AppDbContext dbContext) : IUsersRepo
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
            return await userManager.FindByEmailAsync(email);
        }
        public async Task<AppUser?> CreateUserAsync(AppUser appUser, string password)
        {
            appUser.LastVisit = DateTime.UtcNow;
            var result = await userManager.CreateAsync(appUser, password);
            if (!result.Succeeded) return null;
            return appUser;
        }

        public async Task<bool> UpdateAvatarNameAsync(AppUser currentUser, string newName)
        {
            currentUser.AvatarName = newName;
            var result = await userManager.UpdateAsync(currentUser);
            return result.Succeeded;
        }

        public async Task<bool> UpdateBioAsync(AppUser currentUser, string newBio)
        {
            currentUser.Bio = newBio;
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
                .Skip(itemsToSkip)
                .Take(itemsToTake)
                .ToListAsync();
        }

        public async Task<bool> UpdateLastSeenAsync(AppUser currentUser)
        {
            currentUser.LastVisit = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Utc);
            dbContext.Users.Update(currentUser);
            return await dbContext.SaveChangesAsync() > 0;
        }
    }

}

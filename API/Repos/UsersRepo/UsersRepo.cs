using API.Data;
using Microsoft.AspNetCore.Identity;

namespace API.Repos.UsersRepo
{
    public interface IUsersRepo
    {
        public Task<List<AppUser>> GetAllAsync(string currentUserId, int itemsToSkip, int itemsToTake);
        public Task<List<AppUser>> FindUsersAsync(string query);
        public Task<AppUser?> GetUserByEmailAsync(string email);
        public Task<AppUser?> GetUserByUnameAsync(string uname);
        public Task<AppUser?> GetUserByIdAsync(string uId);
        public Task<AppUser?> CreateUserAsync(AppUser appUser, string password);
        public Task<bool> UpdateAvatarNameAsync(AppUser currentUser, string newName);


    }
    public partial class UsersRepo(UserManager<AppUser> userManager, AppDbContext dbContext) : IUsersRepo;
}

using API.Data;
using API.Models;
using API.Repos.UsersRepo;

namespace API.Services.UsersService
{
    public interface IUsersService
    {
        public string GenerateContentType(string iconName);
        public bool ValidateAvatarFile(IFormFile avatar);
        public bool RemoveAvatar(string previousAvatarName);
        public Task<string?> SaveAvatarAsync(IFormFile? avatar, AppUser currentUser);
        public FileContentModel? GetAvatarByNameAsync(string fileName);
        public Task<List<UserDTO>> GetAllUsers(string currentUserId, int itemsToSkip, int itemsToTake);
        public Task<List<UserDTO>> SearchUsers(string query, string currentUserId, int intemsToSkip, int itemsToTake);

        //public Task<AppUser?> GetUserByIdAsync(string id);
        public Task<AppUser?> GetUserByUnameAsync(string uname);
    }
    public partial class UsersService(
        IUsersRepo usersRepo,
        IWebHostEnvironment hostingEnvironment,
        AppDbContext dbContext) : IUsersService
    {
        //public async Task<AppUser?> GetUserByIdAsync(string id)
        //{
        //    return await usersRepo.GetUserByIdAsync(id);
        //}

        public async Task<AppUser?> GetUserByUnameAsync(string uname)
        {
            return await usersRepo.GetUserByUnameAsync(uname);
        }
    }
}

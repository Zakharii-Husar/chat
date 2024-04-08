using API.Data;
using API.Models;
using API.Repos.UsersRepo;

namespace API.Services.UsersService
{
    public interface IUsersService
    {
        public UserDTO ConvertUserToDTO(AppUser appUser);
        public string GenerateContentType(string iconName);
        public bool ValidateAvatarFile(IFormFile avatar);
        public bool RemoveAvatar(string previousAvatarName);
        public Task<string?> SaveAvatarAsync(IFormFile? avatar, AppUser currentUser);
        public FileContentModel? GetAvatarByNameAsync(string fileName);
        public Task<List<UserDTO>> GetAllUsers(string currentUserId, int itemsToSkip, int itemsToTake);
        public Task<List<UserDTO>> SearchUsers(string query, string currentUserId, int intemsToSkip, int itemsToTake);
    }
    public partial class UsersService(
        IUsersRepo usersRepo,
        IWebHostEnvironment hostingEnvironment,
        AppDbContext dbContext) : IUsersService;
}

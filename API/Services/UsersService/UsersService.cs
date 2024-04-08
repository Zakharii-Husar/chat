using API.Data;
using API.Models;
using API.Repos.UsersRepo;

namespace API.Services.UsersService
{
    public interface IUsersService
    {
        public string GenerateContentType(string iconName);
        public UserDTO ConvertUserToDTO(AppUser appUser);
        public FileContentModel? GetAvatarByNameAsync(string fileName);
        public Task<List<UserDTO>> GetAllUsers(string currentUserId, int itemsToSkip, int itemsToTake);
    }
    public partial class UsersService(
        IUsersRepo usersRepo,
        IWebHostEnvironment hostingEnvironment) : IUsersService;
}

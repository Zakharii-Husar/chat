using API.Data;
using API.Models;
using API.Repos.UsersRepo;

namespace API.Services.UsersService
{
    public interface IUsersService
    {
        public UserDTO ConvertUserToDTO(AppUser appUser);
        public Task<List<UserDTO>> GetAllUsers(string currentUserId, int itemsToSkip, int itemsToTake);
    }
    public partial class UsersService(IUsersRepo usersRepo) : IUsersService;
}

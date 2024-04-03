using API.Data;
using API.Models;

namespace API.Repos.UsersRepo
{
    public interface IUsersRepo
    {
        public Task<List<UserDetailsResponseDTO>> GetUsersAsync(int paginationOffset, int paginationStep);
        public Task<List<UserDetailsResponseDTO>> FindUsersAsync(string query);
        public Task<UserDetailsResponseDTO> GetDetailsByUnameAsync(string uname);
        public Task<UserDetailsResponseDTO> GetDetailsByIdAsync(string uId);
        public Task<bool> CreateUserAsync(AppUser appUser);
        public Task<bool> CheckEmailExistsAsync(string email);
        public Task<bool> CheckUnameExistsAsync(string uname);

        public Task<string> GetAvatarNameByUnameAsync(string uname);
        public Task<bool> UpdateAvatarNameAsync(string avaterName);


    }
    public class UsersRepo
    {
    }
}

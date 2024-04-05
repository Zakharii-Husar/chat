using API.Data;

namespace API.Repos.UsersRepo
{
    public partial class UsersRepo
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
    }
}

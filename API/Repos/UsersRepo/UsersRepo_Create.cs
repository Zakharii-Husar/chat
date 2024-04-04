using API.Data;

namespace API.Repos.UsersRepo
{
    public partial class UsersRepo
    {
        public async Task<AppUser?> CreateUserAsync(AppUser appUser, string password)
        {

            var result = await userManager.CreateAsync(appUser, password);

            if (result.Succeeded) return appUser;
            return null;
        }
    }
}

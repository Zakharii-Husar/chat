using API.Data;
using API.Models;

namespace API.Services.AuthService
{
    public partial class AuthService
    {
        public async Task<UserDTO?> SignInWithPassword(SignInReqModel model)
        {
            var appUser = await usersRepo.GetUserByUnameAsync(model.UsernameOrEmail)
           ?? await usersRepo.GetUserByEmailAsync(model.UsernameOrEmail);
            if (appUser == null) return null;

            var result = await signInManager.PasswordSignInAsync(appUser, model.Password, false, false);
            if (!result.Succeeded) return null;

            return appUser.ToDTO();

        }
    }
}

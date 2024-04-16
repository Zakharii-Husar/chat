using API.Data;
using API.Models;

namespace API.Services.AuthService
{
    public partial class AuthService
    {
        public async Task<UserDTO?> SignUpWithPassword(SignUpReqModel model)
        {
            var appUser = new AppUser
            {
                UserName = model.UserName,
                Email = model.Email,
                FullName = model.FullName
            };

            var registeredUser = await usersRepo.CreateUserAsync(appUser, model.Password);
            if (registeredUser == null) return null;
            await signInManager.SignInAsync(registeredUser, isPersistent: true);

            return appUser.ToDTO();
        }
    }
}

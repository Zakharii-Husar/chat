using API.Data;
using API.Models;
using API.Repos;
using API.Repos.UsersRepo;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace API.Services
{
    public interface IAuthService
    {
        public Task<UserDTO?> SignUpWithPassword(SignUpReqModel model);
        public Task<UserDTO?> SignInWithPassword(SignInReqModel model);
        public Task<UserDTO?> SignInWithCookies(ClaimsPrincipal user);
    }
    public class AuthService(
        IUsersRepo usersRepo,
        SignInManager<AppUser> signInManager,
        UserManager<AppUser> userManager) : IAuthService
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

        public async Task<UserDTO?> SignInWithPassword(SignInReqModel model)
        {
            var appUser = await usersRepo.GetUserByUnameAsync(model.UsernameOrEmail)
           ?? await usersRepo.GetUserByEmailAsync(model.UsernameOrEmail);
            if (appUser == null) return null;

            var result = await signInManager.PasswordSignInAsync(appUser, model.Password, false, false);
            if (!result.Succeeded) return null;

            return appUser.ToDTO();

        }

        public async Task<UserDTO?> SignInWithCookies(ClaimsPrincipal user)
        {

            if (!user.Identity?.IsAuthenticated ?? false) return null;
            var appUser = await userManager.GetUserAsync(user);
            if (appUser == null) return null;
            return appUser.ToDTO();

        }
    }
}

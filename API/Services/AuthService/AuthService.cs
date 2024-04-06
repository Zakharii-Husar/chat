using API.Data;
using API.Models;
using API.Repos.UsersRepo;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace API.Services.AuthService
{
    public interface IAuthService
    {
        public Task<UserDTO?> SignUpWithPassword(SignUpReqModel model);
        public Task<UserDTO?> SignInWithPassword(SignInReqModel model);
        public Task<UserDTO?> SignInWithCookies(ClaimsPrincipal user);
    }
    public partial class AuthService(
        UsersRepo usersRepo,
        SignInManager<AppUser> signInManager,
        UserManager<AppUser> userManager) : IAuthService
    { }
}

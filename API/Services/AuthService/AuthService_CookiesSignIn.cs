using API.Data;
using API.Models;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace API.Services.AuthService
{
    public partial class AuthService
    {
        public async Task<UserDTO?> SignInWithCookies(ClaimsPrincipal user)
        {

            if (!user.Identity?.IsAuthenticated ?? false) return null;
            var appUser = await userManager.GetUserAsync(user);
            if (appUser == null) return null;
            return appUser.ToDTO();

        }
    }
}

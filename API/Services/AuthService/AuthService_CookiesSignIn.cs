using API.Models;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace API.Services.AuthService
{
    public partial class AuthService
    {
        public async Task<UserDetailsResponseDTO?> SignInWithCookies(ClaimsPrincipal user)
        {

            if (!user.Identity?.IsAuthenticated ?? false) return null;
            var appUser = await userManager.GetUserAsync(user);
            if (appUser == null) return null;
            return new UserDetailsResponseDTO
            {
                Id = appUser.Id,
                UserName = appUser.UserName,
                Email = appUser.Email,
                FullName = appUser.FullName,
                AvatarName = appUser.AvatarName,
                Bio = appUser.Bio
            };

        }
    }
}

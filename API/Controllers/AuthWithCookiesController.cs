using API.Data;
using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
// ...

namespace API.Controllers
{
    [ApiController]
    [Route("chat-api/[controller]")]
    public class AuthWithCookiesController(UserManager<AppUser> userManager) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> CheckAuthorization()
        {
            var isAuth = User.Identity?.IsAuthenticated ?? false;

            if (!isAuth) return Ok(false);
            var user = await userManager.GetUserAsync(User);

            if (user != null)
            {
                return Ok(new UserDetailsResponseDTO()
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    Email = user.Email,
                    FullName = user.FullName,
                    AvatarLink = user.AvatarName,
                    Bio = user.Bio
                });
            }

            return Ok(false);
        }

    }
}


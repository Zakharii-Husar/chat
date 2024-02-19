using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
// ...

namespace API.Controllers.Auth
{
    [ApiController]
    [Route("chat-api/[controller]")]
    public class AuthWithCookiesController(UserManager<AppUser> userManager) : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager = userManager;

        [HttpGet]
        public async Task<IActionResult> CheckAuthorization()
        {
            bool isAuth = User.Identity?.IsAuthenticated ?? false;

            if (isAuth)
            {
                var user = await _userManager.GetUserAsync(User);

                if (user != null)
                {
                    return Ok(new
                    {
                        id = user.Id,
                        nickname = user.UserName,
                        email = user.Email,
                        fullName = user.FullName
                    });
                }
            }

            return Unauthorized();
        }
    }
}


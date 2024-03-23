using API.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
// ...

namespace API.Controllers.Auth
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
                return Ok(new
                {
                    id = user.Id,
                    nickname = user.UserName,
                    email = user.Email,
                    fullName = user.FullName
                });
            }

            return Ok(false);
        }

    }
}


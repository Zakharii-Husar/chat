using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SignInController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager) : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager = userManager;
        private readonly SignInManager<AppUser> _signInManager = signInManager;

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] SignIn model)
        {
            var user = await _userManager.FindByNameAsync(model.UsernameOrEmail)
                       ?? await _userManager.FindByEmailAsync(model.UsernameOrEmail);

            if (user == null)
            {
                return BadRequest("Invalid username or email.");
            }

            var result = await _signInManager.PasswordSignInAsync(user, model.Password, false, false);

            if (result.Succeeded)
            {
                var response = new
                {
                    user.Id,
                    user.UserName,
                    user.Email,
                    user.FullName
                };

                return Ok(response);
            }
            else
            {
                return BadRequest("Invalid password.");
            }
        }
    }
}
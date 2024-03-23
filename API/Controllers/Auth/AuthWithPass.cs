using API.Data;
using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Auth
{
    [Route("chat-api/[controller]")]
    [ApiController]
    public class AuthWithPassController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager) : ControllerBase
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
            else
            {
                return BadRequest("Invalid password.");
            }
        }
    }
}
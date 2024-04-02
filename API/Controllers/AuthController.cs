using Microsoft.AspNetCore.Mvc;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Identity;
using API.Data;

namespace API.Controllers
{
    [ApiController]
    [Route("chat-api/[controller]")]
    public class AuthController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager) : ControllerBase
    {

        [HttpPost("SignUp/WithPass")]
        public async Task<IActionResult> SignUpWithPassword([FromBody] SignUpReqModel model)
        {
            if (!ModelState.IsValid) return BadRequest("Invalid input");
            var newUser = new AppUser
            {
                UserName = model.UserName,
                Email = model.Email,
                FullName = model.FullName
            };

            var result = await userManager.CreateAsync(newUser, model.Password!);

            if (!result.Succeeded) return StatusCode(500, "Server error. Failed to sign up.");
            await signInManager.SignInAsync(newUser, isPersistent: true);

            return Ok(new UserDetailsResponseDTO
            {
                Id = newUser.Id,
                UserName = newUser.UserName,
                Email = newUser.Email,
                FullName = newUser.FullName,
                AvatarName = newUser.AvatarName,
                Bio = newUser.Bio,
                LastVisit = newUser.LastVisit
            });
        }

        [HttpPost("SignIn/WithPass")]
        public async Task<IActionResult> SignInWithPassword([FromBody] SignInReqModel model)
        {
            if (!ModelState.IsValid) return BadRequest("Input data is invalid");

            var user = await userManager.FindByNameAsync(model.UsernameOrEmail)
           ?? await userManager.FindByEmailAsync(model.UsernameOrEmail);

            if (user == null) return BadRequest("Invalid username or email.");

            var result = await signInManager.PasswordSignInAsync(user, model.Password, false, false);

            if (result.Succeeded)
            {
                return Ok(new UserDetailsResponseDTO()
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    Email = user.Email,
                    FullName = user.FullName,
                    AvatarName = user.AvatarName,
                    Bio = user.Bio
                });
            }
            else
            {
                return BadRequest("Invalid password.");
            }
        }

        [HttpGet("SignIn/WithCookies")]
        public async Task<IActionResult> SignInWithCookies()
        {
            var isAuth = User.Identity?.IsAuthenticated ?? false;

            if (!isAuth) return Ok(false);
            var user = await userManager.GetUserAsync(User);
            if (user == null) return Ok(false);

            return Ok(new UserDetailsResponseDTO()
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                FullName = user.FullName,
                AvatarName = user.AvatarName,
                Bio = user.Bio
            });

        }
    }

}


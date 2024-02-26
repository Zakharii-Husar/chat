using Microsoft.AspNetCore.Mvc;
using API.Models;
using Microsoft.AspNetCore.Identity;
using API.Models.DB;

namespace API.Controllers.Auth
{
    [ApiController]
    [Route("chat-api/[controller]")]
    public class RegisterWithPassController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager) : ControllerBase
    {

        private readonly UserManager<AppUser> _userManager = userManager;
        private readonly SignInManager<AppUser> _signInManager = signInManager;

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] AppUser model)
        {
            var user = new AppUser { UserName = model.UserName, Email = model.Email, FullName = model.FullName };
            if (model.PasswordHash!.Length < 8 || model.PasswordHash.Length > 30)
            {
                return BadRequest("Password must be between 8 and 30 characters.");
            }
            var result = await _userManager.CreateAsync(user, model.PasswordHash!);

            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, isPersistent: true);

                var response = new
                {
                    user.Id,
                    user.UserName,
                    user.Email,
                    user.FullName

                };

                return Ok(response);
            }
            return BadRequest(new { result.Errors });
        }

    }

}

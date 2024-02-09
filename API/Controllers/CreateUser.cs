using Microsoft.AspNetCore.Mvc;
using API.Models;
using API.Data;
using Microsoft.AspNetCore.Identity;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CreateUserController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager) : ControllerBase
    {

        private readonly UserManager<AppUser> _userManager = userManager;
        private readonly SignInManager<AppUser> _signInManager = signInManager;

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] AppUser model)
        {
            var user = new AppUser { UserName = model.UserName, Email = model.Email, FullName = model.FullName };

            var result = await _userManager.CreateAsync(user, model.PasswordHash);

            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, isPersistent: false);

                return Ok(new { Message = "Registration successful" });
            }

            return BadRequest(new { result.Errors });
        }

    }

}

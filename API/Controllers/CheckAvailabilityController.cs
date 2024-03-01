using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    [Route("chat-api/[controller]")]
    [ApiController]
    public class CheckAvailabilityController(UserManager<AppUser> userManager) : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager = userManager;

        [HttpGet("IsEmailTaken/{email}")]
        public async Task<IActionResult> CheckEmailAvailability(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            return Ok(user != null);
        }

        [HttpGet("IsUsernameTaken/{userName}")]
        public async Task<IActionResult> CheckUserNameAvailability(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);

            return Ok(user != null);
        }

    }
}
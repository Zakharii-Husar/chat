using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    [Route("chat-api/[controller]")]
    [ApiController]
    public class CheckAvailabilityController(UserManager<AppUser> userManager) : ControllerBase
    {
        [HttpGet("IsEmailTaken/{email}")]
        public async Task<IActionResult> CheckEmailAvailability(string email)
        {
            var user = await userManager.FindByEmailAsync(email);

            return Ok(user != null);
        }

        [HttpGet("IsUsernameTaken/{userName}")]
        public async Task<IActionResult> CheckUserNameAvailability(string userName)
        {
            var user = await userManager.FindByNameAsync(userName);

            return Ok(user != null);
        }

    }
}
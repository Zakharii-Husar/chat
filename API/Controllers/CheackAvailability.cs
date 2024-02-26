using API.Models.DB;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    [Route("chat-api/[controller]")]
    [ApiController]
    public class CheckAvailabilityController(UserManager<AppUser> userManager) : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager = userManager;

        [HttpGet("email/{email}")]
        public async Task<IActionResult> CheckEmailAvailability(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user != null)
            {
                return Ok(true);
            }
            else
            {
                return Ok(false);
            }
        }

        [HttpGet("UserName/{UserName}")]
        public async Task<IActionResult> CheckUserNameAvailability(string UserName)
        {
            var user = await _userManager.FindByNameAsync(UserName);

            if (user != null)
            {
                return Ok(true);
            }
            else
            {
                return Ok(false);
            }
        }

    }
}
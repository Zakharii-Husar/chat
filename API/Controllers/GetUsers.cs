using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GetUsers(UserManager<AppUser> userManager) : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager = userManager;

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userManager.Users.ToListAsync();
            return Ok(users);
        }
    }
}

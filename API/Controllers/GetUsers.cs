using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace API.Controllers
{
    [Route("chat-api/[controller]")]
    [ApiController]
    [Authorize]
    public class GetUsers(UserManager<AppUser> userManager) : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager = userManager;

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userManager.Users
    .Select(user => new
    {
        id = user.Id,
        nickname = user.UserName 
    })
    .ToListAsync();
            return Ok(users);
        }
    }
}

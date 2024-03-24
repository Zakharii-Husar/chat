using API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace API.Controllers
{
    [Route("chat-api/[controller]")]
    [ApiController]
    [Authorize]
    public class GetUsersController(UserManager<AppUser> userManager) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var currentUser = await userManager.GetUserAsync(User);
            var currentUserId = currentUser?.Id;

            var users = await userManager.Users
    .Select(user => new
    {
        id = user.Id,
        nickname = user.UserName,
        email = user.Email,
        fullName = user.FullName
    })
    .Where(user => user.id != currentUserId)
    .ToListAsync();
            return Ok(users);
        }
    }
}

using API.Data;
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
    public class GetUsersController(UserManager<AppUser> userManager) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var currentUser = await userManager.GetUserAsync(User);
            var currentUserId = currentUser?.Id;

            var users = await userManager.Users
    .Select(user => new UserDetailsResponseDTO()
    {
        Id = user.Id,
        UserName = user.UserName,
        Email = user.Email,
        FullName = user.FullName,
        AvatarName = user.AvatarName,
        Bio = user.Bio
    })

    .Where(user => user.Id != currentUserId)
    .ToListAsync();
            return Ok(users);
        }
    }
}

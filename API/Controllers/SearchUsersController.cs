using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using System.Net;

namespace API.Controllers
{
    [Authorize]
    [Route("chat-api/[controller]")]
    [ApiController]

    public class SearchUsersController(AppDbContext dbContext, UserManager<AppUser> userManager) : ControllerBase
    {
        [HttpGet("{searchPhrase}")]
        public async Task<IActionResult> Get(string searchPhrase)
        {
            var currentUser = await userManager.GetUserAsync(User);
            var currentUserId = currentUser?.Id;
            var filteredUsers = await dbContext.Users
                    .Select(user => new
                    {
                        id = user.Id,
                        nickname = user.UserName,
                        email = user.Email,
                        fullName = user.FullName
                    })
                .Where(user =>
                        user.nickname.Contains(searchPhrase) ||
                        user.fullName.Contains(searchPhrase)
                        )
                .Where(user => user.id != currentUserId)
                .ToListAsync();

            return Ok(filteredUsers != null ? filteredUsers : new List<object>());

        }

    }
}

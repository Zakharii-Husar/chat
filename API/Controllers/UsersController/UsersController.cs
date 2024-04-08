using API.Data;
using API.Services.UsersService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.UsersController
{
    [Route("chat-api/[controller]")]
    [ApiController]
    [Authorize]
    public partial class UsersController(
        UserManager<AppUser> userManager,
        IUsersService usersService,
        IWebHostEnvironment hostingEnvironment) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAllUsers([FromQuery] int itemsToSkip = 0, [FromQuery] int itemsToTake = 10)
        {
            var currentUser = await userManager.GetUserAsync(User);
            if (currentUser == null) return Unauthorized();
            var users = await usersService.GetAllUsers(currentUser.Id, itemsToSkip, itemsToTake);
            return Ok(users);
        }
    }
}

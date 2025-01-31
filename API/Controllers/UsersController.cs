using API.Data;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("chat-api/[controller]")]
    public partial class UsersController(
        UserManager<AppUser> userManager,
        IUsersService usersService,
        IAvatarService avatarService) : ControllerBase
    {
        [HttpGet("IsTaken/{Type}/{Value}")]
        public async Task<IActionResult> CheckAvailability(string Value, string Type)
        {
            try
            {
                switch (Type.ToLower())
                {
                    case "email":
                        var userByEmail = await usersService.GetUserByEmailAsync(Value);
                        return Ok(userByEmail != null);
                    case "username":
                        var userByName = await usersService.GetUserByUnameAsync(Value);
                        return Ok(userByName != null);
                    default:
                        return BadRequest("Invalid Type parameter. Please use 'email' or 'username'.");
                }
            }
            catch (Exception ex)
            {
                // Log the error here if you have logging configured
                return Ok(true); // Consider the email/username taken if we encounter an error
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers(int itemsToSkip = 0, int itemsToTake = 5)
        {
            var currentUser = await userManager.GetUserAsync(User);
            if (currentUser == null) return Unauthorized();
            var users = await usersService.GetAllUsers(currentUser.Id, itemsToSkip, itemsToTake);
            return Ok(users);
        }

        [Authorize]
        [HttpGet("Avatar/{FileName}")]
        public IActionResult Get(string FileName)
        {
            var file = avatarService.GetAvatarByNameAsync(FileName);
            if (file == null) return NotFound();
            return File(file.FileContent, file.ContentType);
        }

        [HttpGet("{UserName}")]
        public async Task<ActionResult> GetUserDetails(string UserName)
        {
            var user = await usersService.GetUserByUnameAsync(UserName);
            if (user == null) return NotFound();
            return Ok(user);

        }

        [HttpGet("Search")]
        public async Task<IActionResult> Get(string SearchPhrase, int itemsToSkip = 0, int itemsToTake = 10)
        {
            var currentUser = await userManager.GetUserAsync(User);
            var currentUserId = currentUser?.Id;
            var filteredUsers = await usersService.SearchUsers(SearchPhrase, currentUserId, itemsToSkip, itemsToTake);

            return Ok(filteredUsers);

        }

        [HttpPost("UploadAvatar")]
        public async Task<IActionResult> Post(IFormFile? avatar)
        {
            var currentUser = await userManager.GetUserAsync(User);
            if (currentUser == null) return Unauthorized();
            var result = await avatarService.SaveAvatarAsync(avatar, currentUser);
            if (result == null) return StatusCode(500);
            return Ok(result);
        }

        [HttpPost("UpdateBio")]
        public async Task<IActionResult> Post([FromBody] string newBio)
        {
            var currentUser = await userManager.GetUserAsync(User);
            if (currentUser == null) return Unauthorized();
            var result = await usersService.UpdateBioAsync(currentUser, newBio);
            if (result == false) return StatusCode(500);
            return Ok();
        }
    }
}

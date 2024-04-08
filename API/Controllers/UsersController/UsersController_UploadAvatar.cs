using Microsoft.AspNetCore.Mvc;
using API.Services;
using API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace API.Controllers.UsersController
{
    public partial class UsersController
    {

        [HttpPost("UploadAvatar")]
        public async Task<IActionResult> Post(IFormFile? avatar)
        {
            var currentUser = await userManager.GetUserAsync(User);
            if (currentUser == null) return Unauthorized();
            var result = await usersService.SaveAvatarAsync(avatar, currentUser);
            if (result == null) return StatusCode(500);
            return Ok(result);
        }
    }
}
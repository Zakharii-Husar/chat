using Microsoft.AspNetCore.Mvc;
using API.Services;
using API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace API.Controllers
{
    [Authorize]
    [Route("chat-api/[controller]")]
    [ApiController]
    public class UploadAvatarController : ControllerBase
    {
        private readonly IImageUploadService _imageUploadService;
        private readonly UserManager<AppUser> _userManager;

        public UploadAvatarController(
            IImageUploadService imageUploadService,
            UserManager<AppUser> userManager)
        {
            _imageUploadService = imageUploadService;
            _userManager = userManager;
        }

        [HttpPost]
        public async Task<IActionResult> Post(IFormFile? avatar)
        {
            try
            {
                if (avatar == null || avatar.Length == 0)
                {
                    return BadRequest("No avatar uploaded.");
                }

                var avatarName = await _imageUploadService.SaveAvatarAsync(avatar);

                var userId = _userManager.GetUserId(User)!;
                var user = await _userManager.FindByIdAsync(userId);

                await _imageUploadService.RmPreviousAvatar(user!.AvatarName);
                user!.AvatarName = avatarName;
                var result = await _userManager.UpdateAsync(user!);
                if (!result.Succeeded) return BadRequest();
                return Ok(avatarName);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
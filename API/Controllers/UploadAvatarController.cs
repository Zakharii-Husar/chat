using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using System;
using System.IO;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("chat-api/[controller]")]
    [ApiController]
    public class UploadAvatarController : ControllerBase
    {
        private readonly IWebHostEnvironment _hostingEnvironment;

        public UploadAvatarController(IWebHostEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpPost]
        public async Task<IActionResult> Post(IFormFile avatar)
        {
            try
            {
                // Check if an avatar was uploaded
                if (avatar == null || avatar.Length == 0)
                {
                    return BadRequest("No avatar uploaded.");
                }

                // Get the path to the folder where you want to save the avatar
                string uploadsFolder = Path.Combine(_hostingEnvironment.ContentRootPath, "Avatars");

                // Create the folder if it doesn't exist
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                // Generate a unique avatar name (you can use GUID or other techniques)
                string avatarName = Guid.NewGuid().ToString() + Path.GetExtension(avatar.FileName);
                string avatarPath = Path.Combine(uploadsFolder, avatarName);

                // Save the avatar
                using (var stream = new FileStream(avatarPath, FileMode.Create))
                {
                    await avatar.CopyToAsync(stream);
                }

                return Ok("File uploaded successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}

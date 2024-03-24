using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Threading.Tasks;
using API.Services;

namespace API.Controllers
{
    [Route("chat-api/[controller]")]
    [ApiController]
    public class UploadAvatarController(IImageUploadService imageUploadService) : ControllerBase
    {


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

                var fileName = await imageUploadService.SaveAvatarAsync(avatar);

                return Ok($"File '{fileName}' uploaded successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}


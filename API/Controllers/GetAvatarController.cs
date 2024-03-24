using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("chat-api/[controller]")]
    [ApiController]
    public class GetAvatarController(IWebHostEnvironment hostingEnvironment) : ControllerBase
    {
        [HttpGet("{fileName}")]
        public IActionResult Get(string fileName)
        {
            try
            {
                string avatarsFolder = Path.Combine(hostingEnvironment.ContentRootPath, "Avatars");

                string filePath = Path.Combine(avatarsFolder, fileName);

                if (System.IO.File.Exists(filePath))
                {
                    byte[] fileBytes = System.IO.File.ReadAllBytes(filePath);

                    string contentType = "image/png";

                    return File(fileBytes, contentType);
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}

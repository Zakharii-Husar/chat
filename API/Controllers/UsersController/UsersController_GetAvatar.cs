using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.UsersController
{
    public partial class UsersController
    {
        [HttpGet("{fileName}")]
        public IActionResult Get(string fileName)
        {
            try
            {
                // Get the path to the folder containing the avatars
                string avatarsFolder = Path.Combine(hostingEnvironment.ContentRootPath, "Avatars");

                // Combine the folder path with the requested file name
                string filePath = Path.Combine(avatarsFolder, fileName);

                // Check if the file exists
                if (System.IO.File.Exists(filePath))
                {
                    // Read the file contents
                    byte[] fileBytes = System.IO.File.ReadAllBytes(filePath);


                    // Return the file as a byte array with the appropriate content type
                    return File(fileBytes, contentType);
                }
                else
                {
                    // Return a 404 Not Found response if the file does not exist
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                // Return a 500 Internal Server Error response if an exception occurs
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}

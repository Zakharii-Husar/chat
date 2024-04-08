using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.UsersController
{
    public partial class UsersController
    {
        [Authorize]
        [HttpGet("Avatar/{fileName}")]
        public IActionResult Get(string fileName)
        {
            var file = usersService.GetAvatarByNameAsync(fileName);
            if (file == null) return NotFound();
            return File(file.FileContent, file.ContentType);
        }

    }
}

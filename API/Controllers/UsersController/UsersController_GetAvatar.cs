using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.UsersController
{
    public partial class UsersController
    {
        [Authorize]
        [HttpGet("Avatar/{FileName}")]
        public IActionResult Get(string FileName)
        {
            var file = usersService.GetAvatarByNameAsync(FileName);
            if (file == null) return NotFound();
            return File(file.FileContent, file.ContentType);
        }

    }
}

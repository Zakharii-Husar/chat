using Microsoft.AspNetCore.Mvc;
using API.Models;
using API.Data;
using Microsoft.AspNetCore.Identity;

namespace API.Controllers
{
    [ApiController]
    [Route("chat-api/[controller]")]
    public class GetUserDetailsController(UserManager<AppUser> userManager) : ControllerBase
    {

        [HttpGet]
        public async Task<ActionResult<UserDetailsResponseDTO>> GetUserDetails([FromQuery] string userName)
        {
            var user = await userManager.FindByNameAsync(userName);

            if (user == null)
            {
                return NotFound();
            }

            var userDetails = new UserDetailsResponseDTO
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                FullName = user.FullName,
                AvatarName = user.AvatarName,
                Bio = user.Bio,
                LastVisit = user.LastVisit,
            };

            return userDetails;
        }
    }
}


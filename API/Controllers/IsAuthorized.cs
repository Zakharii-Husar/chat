using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace API.Controllers
{
    [Route("chat-api/[controller]")]
    [ApiController]
    public class IsAuthorizedController( ) : ControllerBase
    {

        [HttpGet]
        public IActionResult CheckAuthorization()
        {
            bool isAuth = User.Identity?.IsAuthenticated ?? false;
            return Ok(isAuth);
        }
    }
}
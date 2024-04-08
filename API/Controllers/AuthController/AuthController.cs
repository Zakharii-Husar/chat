using Microsoft.AspNetCore.Mvc;
using API.Models;
using API.Services.AuthService;

namespace API.Controllers
{
    [ApiController]
    [Route("chat-api/[controller]")]
    public class AuthController(IAuthService authService) : ControllerBase
    {

        [HttpPost("SignUp/WithPass")]
        public async Task<IActionResult> SignUpWithPassword([FromBody] SignUpReqModel model)
        {
            if (!ModelState.IsValid) return BadRequest("Invalid input");
            var result = await authService.SignUpWithPassword(model);
            if (result == null) return StatusCode(500, "Error during creation of a user.");
            return Ok(result);
        }

        [HttpPost("SignIn/WithPass")]
        public async Task<IActionResult> SignInWithPassword([FromBody] SignInReqModel model)
        {
            if (!ModelState.IsValid) return BadRequest("Input data is invalid");
            var user = await authService.SignInWithPassword(model);
            if (user == null) return Ok(null);
            return Ok(user);
        }

        [HttpGet("SignIn/WithCookies")]
        public async Task<IActionResult> SignInWithCookies()
        {
            var userDetailsDto = await authService.SignInWithCookies(User);
            if (userDetailsDto == null) return Ok(false);
            return Ok(userDetailsDto);
        }
    }

}


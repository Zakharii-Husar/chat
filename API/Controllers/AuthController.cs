using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("chat-api/[controller]")]
    public class AuthController : ControllerBase
    {
        [HttpPost("SignUp/WithPass")]
        public IActionResult SignUpWithPassword([FromBody] SignUpRequest signUpRequest)
        {
            return Ok(new { message = "User signed up successfully." });
        }

        [HttpPost("SignIn/WithPass")]
        public IActionResult SignInWithPassword([FromBody] SignInRequest signInRequest)
        {
            return Ok(new { message = "User signed in successfully." });
        }

        [HttpPost("SignIn/WithCookies")]
        public IActionResult SignInWithCookies()
        {
            return Ok(new { message = "User signed in with cookies successfully." });
        }
    }

    public class SignUpRequest
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        // Add additional properties as needed
    }

    public class SignInRequest
    {
        public string UsernameOrEmail { get; set; }
        public string Password { get; set; }
        // Add additional properties as needed
    }
}


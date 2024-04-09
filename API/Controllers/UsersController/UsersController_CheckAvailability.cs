using API.Data;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers.UsersController
{
    public partial class UsersController
    {
        [HttpGet("IsTaken/{Type}/{Value}")]
        public async Task<IActionResult> CheckAvailability(string Value, string Type)
        {
            switch (Type.ToLower())
            {
                case "email":
                    var userByEmail = await userManager.FindByEmailAsync(Value);
                    return Ok(userByEmail != null);
                case "username":
                    var userByName = await userManager.FindByNameAsync(Value);
                    return Ok(userByName != null);
                default:
                    return BadRequest("Invalid Type parameter. Please use 'email' or 'username'.");
            }
        }


    }
}
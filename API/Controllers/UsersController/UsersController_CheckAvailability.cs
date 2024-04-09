using API.Data;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers.UsersController
{
    public partial class UsersController
    {
        [HttpGet("IsTaken")]
        public async Task<IActionResult> CheckAvailability(string value, string type)
        {
            switch (type.ToLower())
            {
                case "email":
                    var userByEmail = await userManager.FindByEmailAsync(value);
                    return Ok(userByEmail != null);
                case "username":
                    var userByName = await userManager.FindByNameAsync(value);
                    return Ok(userByName != null);
                default:
                    return BadRequest("Invalid type parameter. Please use 'email' or 'username'.");
            }
        }


    }
}
using Microsoft.AspNetCore.Mvc;
using API.Models;
using API.Data;
using Microsoft.AspNetCore.Identity;

namespace API.Controllers.UsersController
{
    public partial class UsersController
    {

        [HttpGet("{UserName}")]
        public async Task<ActionResult> GetUserDetails(string UserName)
        {
            var user = await userManager.FindByNameAsync(UserName);
            return Ok(user);

        }
    }
}


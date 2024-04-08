﻿using Microsoft.AspNetCore.Mvc;
using API.Models;
using API.Data;
using Microsoft.AspNetCore.Identity;

namespace API.Controllers.UsersController
{
    public partial class UsersController
    {

        [HttpGet("{userName}")]
        public async Task<ActionResult> GetUserDetails(string userName)
        {
            var user = await userManager.FindByNameAsync(userName);
            return Ok(user);

        }
    }
}

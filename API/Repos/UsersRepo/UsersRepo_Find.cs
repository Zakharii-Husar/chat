using API.Data;
using API.Models;
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace API.Repos.UsersRepo
{
    public partial class UsersRepo
    {
        public async Task<List<AppUser>> FindUsersAsync(string query)
        {
            var usersByEmail = await userManager.FindByEmailAsync(query);
            var usersByUserName = await userManager.FindByNameAsync(query);

            var users = new List<AppUser>();

            if (usersByEmail != null)
            {
                users.Add(usersByEmail);
            }

            if (usersByUserName != null)
            {
                users.Add(usersByUserName);
            }

            return users;
        }
    }
}
using API.Data;
using API.Models;
using System;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Identity;

namespace API.Repos.UsersRepo
{
    public partial class UsersRepo
    {
        public async Task<AppUser?> GetUserByIdAsync(string uId)
        {
            return await userManager.FindByIdAsync(uId);
        }

        public async Task<AppUser?> GetUserByUnameAsync(string uname)
        {
            return await userManager.FindByNameAsync(uname);
        }
    }
}

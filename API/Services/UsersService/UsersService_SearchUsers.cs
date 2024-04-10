﻿using API.Models;

namespace API.Services.UsersService
{
    public partial class UsersService
    {
        public async Task<List<UserDTO>> SearchUsers(
            string query,
            string currentUserId,
            int intemsToSkip,
            int itemsToTake)
        {
            var users = await usersRepo.GetSearchedAsync(currentUserId, query, intemsToSkip, itemsToTake);
            return users.Select(user => ConvertUserToDTO(user)).ToList();
        }
    }
}
﻿using API.Data;
using API.Models;

namespace API.Services.UsersService
{
    public interface IChatsService
    {
        public UserDTO ConvertUserToDTO(AppUser appUser);
    }
    public class UsersService
    {
        public UserDTO ConvertUserToDTO(AppUser appUser)
        {
            return new UserDTO
            {
                Id = appUser.Id,
                UserName = appUser.UserName,
                Email = appUser.Email,
                FullName = appUser.FullName,
                AvatarName = appUser.AvatarName,
                Bio = appUser.Bio,
                LastVisit = appUser.LastVisit
            };
        }
    }
}

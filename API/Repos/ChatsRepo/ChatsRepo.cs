using API.Data;
using API.Models;
using API.Services.UsersService;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Repos.ChatsRepo
{
    public interface IChatsRepo
    {
        public Task<List<int>> GetUserChatsIdsAsync(string userId, int itemsToSkip, int itemsToTake);
        public Task<string?> GetChatNameByIdAsync(int chatId);
        public Task<List<UserDTO>> GetChatMembersByIdAsync(int chatId);
        //public Task<Chat> GetChatByIdAsync(int chatId);
        //public Task<int> GetIdByUNameAsync(string username);
        //public Task<bool> CreateChatAsync(Chat newChat);
        //public Task<bool> CreateGroupAsync(Chat newGroup);
        //public Task<bool> RenameGroupAsync(Chat chat);
        //public Task<bool> AddGroupMemberAsync(ChatMember member);
        //public Task<bool> RmGroupMemberAsync(ChatMember member);



    }

    public partial class ChatsRepo(AppDbContext dbContext, UsersService usersService) : IChatsRepo
    {

    }
}

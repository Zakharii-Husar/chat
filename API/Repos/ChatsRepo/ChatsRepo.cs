using API.Data;
using API.Models;
using API.Services.UsersService;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Repos.ChatsRepo
{
    public interface IChatsRepo
    {
        public Task<Chat?> GetChatById(int Id);
        public Task<string?> RenameChatAsync(RenameChatRequest request);
        public Task<bool> AddChatMemberAsync(ChatMember member);
        public Task<bool> RmChatMemberAsync(ChatMember memberToRemove)
        public Task<int?> CreateChatAsync(Chat chat);
        public Task<int?> GetPrivateChatIdAsync(string uname1, string uname2);
        public Task<ChatMember?> GetChatMemberAsync(int chatId, string userId);
        public Task<List<AppUser>> GetAllMembersAsync(int chatId);
        public Task<List<int>> GetUserChatsIdsAsync(string userId, int itemsToSkip, int itemsToTake);
        public Task<string?> GetChatNameByIdAsync(int chatId);



    }

    public partial class ChatsRepo(AppDbContext dbContext, UsersService usersService) : IChatsRepo;
}

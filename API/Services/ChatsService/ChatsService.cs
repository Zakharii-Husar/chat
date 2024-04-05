using API.Models;
using API.Data;
using API.Repos.ChatsRepo;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace API.Services.MessagesService
{
    public interface IChatsService
    {
        public Task<List<MessageDTO>> GetChatsOverview(string userId, int paginationOffset, int paginationStep);
        public Task<List<string>> GetMembersIdsAsync(int id);

        public Task<bool> CheckMembershipAsync(int chatId, string userId);

        public Task<bool> CheckRoleAsync(int chatId, string userId);
    }
    public partial class ChatsService(AppDbContext dbContext, ChatsRepo chatsRepo) : IChatsService
    {
    }
}
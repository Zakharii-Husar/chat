using API.Models;
using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace API.Services.MessagesService
{
    public interface IChatsService
    {
        public Task<List<string>> GetMembersIdsAsync(int id);

        public Task<bool> CheckMembershipAsync(int chatId, string userId);

        public Task<bool> CheckRoleAsync(int chatId, string userId);
    }
    public partial class ChatsService(AppDbContext dbContext) : IChatsService
    {
        private readonly AppDbContext _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
    }
}
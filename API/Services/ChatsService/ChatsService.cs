using API.Models;
using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace API.Services.MessagesService
{
    public interface IChatsService
    {
        public Task<List<string>> GetMembersIdsAsync(int Id);
    }
    public partial class ChatsService(AppDbContext dbContext) : IChatsService
    {
        private readonly AppDbContext _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
    }
}
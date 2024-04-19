using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repos.ChatsRepo
{
    public interface IChatsRepo
    {
        public Task<int?> CreateChatAsync(Chat chat);
        public Task<Chat?> GetChatById(int Id);
        public Task<int?> GetPrivateChatIdAsync(string uname1, string uname2);
        public Task<string?> RenameChatAsync(int chatId, string newName);
        public Task<string?> GetChatNameByIdAsync(int chatId);
        public Task<List<int>> GetUserChatsIdsAsync(string userId, int itemsToSkip, int itemsToTake);



    }

    public partial class ChatsRepo(AppDbContext dbContext) : IChatsRepo
    {

    };
}

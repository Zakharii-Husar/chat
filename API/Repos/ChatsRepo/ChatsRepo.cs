using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repos.ChatsRepo
{
    public interface IChatsRepo
    {
        public Task<List<int>> GetUserChatsIdsAsync(string userId);
        //public Task<Chat> GetChatByIdAsync(int chatId);
        //public Task<int> GetIdByUNameAsync(string username);
        //public Task<bool> CreateChatAsync(Chat newChat);
        //public Task<bool> CreateGroupAsync(Chat newGroup);
        //public Task<bool> RenameGroupAsync(Chat chat);
        //public Task<bool> AddGroupMemberAsync(ChatMember member);
        //public Task<bool> RmGroupMemberAsync(ChatMember member);



    }

    public partial class ChatsRepo(AppDbContext dbContext) : IChatsRepo
    {
        public async Task<List<int>> GetUserChatsIdsAsync(string userId)
        {
            return await dbContext.ChatMembers
                .Where(cm => cm.MemberId == userId)
                .Select(cm => cm.ChatId)
                .ToListAsync();
        }
    }
}

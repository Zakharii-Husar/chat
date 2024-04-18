using API.Data;
using API.Models;

namespace API.Repos.ChatsRepo
{
    public interface IChatsRepo
    {
        public Task<Chat?> GetChatById(int Id);
        public Task<string?> RenameChatAsync(int chatId, string newName);
        public Task<bool> AddChatMemberAsync(ChatMember member);
        public Task<bool> RmChatMemberAsync(ChatMember memberToRemove);
        public Task<int?> CreateChatAsync(Chat chat);
        public Task<int?> GetPrivateChatIdAsync(string uname1, string uname2);

        public Task<ChatMember?> GetMemberByMsgIdAsync(int chatId, string userId);
        public Task<ChatMember?> GetMemberByChatIdAsync(int chatId, string userId);
        public Task<ChatMember?> GetMemberByUnameAsync(int chatId, string username);
        public Task<List<AppUser>> GetAllMembersAsync(int chatId);
        public Task<List<int>> GetUserChatsIdsAsync(string userId, int itemsToSkip, int itemsToTake);
        public Task<string?> GetChatNameByIdAsync(int chatId);



    }

    public partial class ChatsRepo(AppDbContext dbContext) : IChatsRepo
    {

    };
}

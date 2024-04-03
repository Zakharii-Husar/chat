using API.Data;
using API.Models;

namespace API.Repos.ChatsRepo
{
    public interface IChatsRepo
    {
        public Task<List<MessageDTO>> GetChatsOverviewAsync(int paginationOffset, int paginationStep);
        public Task<List<MessageDTO>> GetChatByIdAsync(int chatId, int paginationOffset, int paginationStep);
        public Task<int> GetIdByUNameAsync(string username);
        public Task<bool> CreateChatAsync(Chat newChat);
        public Task<bool> CreateGroupAsync(Chat newGroup);
        public Task<bool> RenameGroupAsync(Chat chat);
        public Task<bool> AddGroupMemberAsync(ChatMember member);
        public Task<bool> RmGroupMemberAsync(ChatMember member);



    }

    public partial class ChatsRepo
    {

    }
}

using API.Models;
using API.Data;
using API.Repos.ChatsRepo;
using API.Repos.MessagesRepo;
using API.Services.UsersService;

namespace API.Services.ChatsService
{
    public interface IChatsService
    {
        public Task<List<MessageDTO>> GetChatsOverviewAsync(string userId, int itemsToSkip, int itemsToTake);

        public Task<ChatDTO?> GetChatAsync(string userId, int chatId, int itemsToSkip, int itemsToTake);
        public Task<List<string>> GetMembersIdsAsync(int chatId);

        public Task<bool> CheckMembershipAsync(int chatId, string userId);

        public Task<bool> CheckRoleAsync(int chatId, string userId);

        public MessageDTO? ConvertMessageToDTO(Message? message);
        public Task<MessageDTO> InsertMessageAsync(SendMessageModel messageModel, string senderId);
        public Task<bool> AddLikeAsync(int messageId, string currentUserId);
        public Task<bool> RmLikeAsync(int messageId, string currentUserId);
    }
    public partial class ChatsService(
        AppDbContext dbContext,
        IUsersService usersService,
        IChatsRepo chatsRepo,
        IMessagesRepo messagesRepo) : IChatsService
    {

    }
}
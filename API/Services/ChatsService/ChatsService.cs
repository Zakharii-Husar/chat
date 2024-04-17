using API.Models;
using API.Data;
using API.Repos.ChatsRepo;
using API.Repos.MessagesRepo;
using API.Services.UsersService;
using API.Repos.UsersRepo;
using Microsoft.AspNetCore.SignalR;
using API.Hubs;

namespace API.Services.ChatsService
{
    public interface IChatsService
    {
        public Task<bool> SendMsgAsync(int chatId, SendMessageModel model, string currentUserId);
        public Task<bool> CheckMembershipByChatIdAsync(int chatId, string userId);
        public Task<bool> CheckMembershipByMsgIdAsync(int messageId, string userId);
        public Task<bool> MarkChatAsReadAsync(int chatId, AppUser currentUser);
        public Task<bool> RmChatMemberAsync(int chatId, string candidatUname, AppUser currentUser);
        public Task<bool> AddChatMemberAsync(int chatId, string candidatUname, AppUser currentUser);
        public Task<bool> RenameChatAsync(int chatId, string newName, AppUser currentUser);
        public Task<int?> GetPrivateChatIdAsync(string uname1, string uname2);
        public Task<int?> CreatePrivateChatAsync(string uname1, string uname2);
        public Task<int?> CreateGroupChatAsync(NewChatModel chatModel, AppUser currentUser);
        public Task<List<MessageDTO>> GetChatsOverviewAsync(string userId, int itemsToSkip, int itemsToTake);

        public Task<ChatDTO?> GetChatDTOAsync(string userId, int chatId, int itemsToSkip, int itemsToTake);
        public Task<List<string>> GetMembersIdsAsync(int chatId);

        public Task<bool> CheckRoleAsync(int chatId, string userId);
        public Task<bool> AddLikeAsync(int messageId, string currentUserId);
        public Task<bool> RmLikeAsync(int messageId, string currentUserId);
        public Task<bool> MarkMsgAsDelAsync(int messageId, string currentUserId);
        public Task WSBroadcastMessageAsync(Message newMessage);
    }
    public partial class ChatsService(
        AppDbContext dbContext,
        IUsersRepo usersRepo,
        IUsersService usersService,
        IChatsRepo chatsRepo,
        IMessagesRepo messagesRepo,
        IWsConManService wsConManService,
        IHubContext<MainHub> hub) : IChatsService
    {

    }
}
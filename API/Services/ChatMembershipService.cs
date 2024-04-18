using API.Models;
using API.Data;
using API.Repos.ChatsRepo;
using API.Repos.MessagesRepo;
using API.Services.UsersService;
using API.Repos.UsersRepo;
using Microsoft.AspNetCore.SignalR;
using API.Hubs;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public interface IChatMembershipService
    {

        public Task<string?> RmChatMemberAsync(int chatId, string candidatUname, AppUser currentUser);
        public Task<bool> AddChatMemberAsync(int chatId, string candidatUname, AppUser currentUser);
        public Task<List<string>> GetMembersIdsAsync(int chatId);
        public Task<bool> CheckRoleAsync(int chatId, string userId);
        public Task<ChatMember?> GetMemberByUnameAsync(int chatId, string username);
        public Task<ChatMember?> GetMemberByChatIdAsync(int chatId, string userId);
        public Task<ChatMember?> GetMemberByMsgIdAsync(int messageId, string userId);


    }
    public partial class ChatMembershipService(
        AppDbContext dbContext,
        IUsersRepo usersRepo,
        IChatsRepo chatsRepo,
        IMessagesRepo messagesRepo) : IChatMembershipService
    {
        public async Task<List<string>> GetMembersIdsAsync(int chatId)
        {
            return await dbContext.ChatMembers
                 .Where(member => member.ChatId == chatId)
                 .Select(member => member.MemberId)
                 .ToListAsync();
        }
        public async Task<bool> CheckRoleAsync(int chatId, string userId)
        {
            var member = await chatsRepo.GetMemberByChatIdAsync(chatId, userId);
            if (member == null) return false;
            return member.IsCreator;
        }

        public async Task<ChatMember?> GetMemberByUnameAsync(int chatId, string username)
        {
            return await chatsRepo.GetMemberByUnameAsync(chatId, username);
        }

        public async Task<ChatMember?> GetMemberByMsgIdAsync(int messageId, string userId)
        {
            return await chatsRepo.GetMemberByMsgIdAsync(messageId, userId);
        }

        public async Task<ChatMember?> GetMemberByChatIdAsync(int chatId, string userId)
        {
            return await chatsRepo.GetMemberByChatIdAsync(chatId, userId);
        }

        public async Task<bool> AddChatMemberAsync(int chatId, string candidatUname, AppUser currentUser)
        {
            var candidat = await usersRepo.GetUserByUnameAsync(candidatUname);
            bool authToAdd = await CheckRoleAsync(chatId, currentUser.Id);
            if (!authToAdd) return false;
            if (candidat == null) return false;
            var isAlreadyAdded = await chatsRepo.GetChatMemberAsync(chatId, candidat.Id);
            if (isAlreadyAdded != null) return false;

            var member = new ChatMember(candidat.Id, chatId);
            await chatsRepo.AddChatMemberAsync(member);

            var notification = new Message
            {
                ChatId = chatId,
                Content = $"{currentUser.UserName} added {candidat.UserName} to chat.",
                RepliedTo = null,
                SenderId = currentUser.Id!
            };

            await messagesRepo.InsertAsync(notification);
            return true;
        }

        public async Task<string?> RmChatMemberAsync(int chatId, string userToRmUname, AppUser currentUser)
        {
            var memberToRm = await chatsRepo.GetMemberByUnameAsync(chatId, userToRmUname);
            if (memberToRm == null || memberToRm.LeftChat != null) return null;
            bool result = await chatsRepo.RmChatMemberAsync(memberToRm);
            if (!result) return null;

            bool isLeaving = currentUser.UserName == userToRmUname;
            var removedMsg = $"{currentUser?.UserName} removed {userToRmUname} from chat.";
            var leftMsg = $"{currentUser?.UserName} left chat.";
            var notification = isLeaving ? leftMsg : removedMsg;
            return notification;
        }

    }
}
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

        public Task<bool> RmChatMemberAsync(int chatId, string candidatUname, AppUser currentUser);
        public Task<bool> AddChatMemberAsync(int chatId, string candidatUname, AppUser currentUser);
        public Task<List<string>> GetMembersIdsAsync(int chatId);
        public Task<bool> CheckRoleAsync(int chatId, string userId);
        public Task<bool> CheckMembershipByChatIdAsync(int chatId, string userId);
        public Task<bool> CheckMembershipByMsgIdAsync(int messageId, string userId);

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
            return await dbContext.ChatMembers
                 .Where(member => member.ChatId == chatId)
                 .Where(member => member.MemberId == userId)
                 .Where(member => member.IsCreator == true)
                 .Where(member => member.LeftChat != null)
                 .AnyAsync();
        }

        public async Task<bool> CheckMembershipByMsgIdAsync(int messageId, string userId)
        {
            return await dbContext.Messages
                .Where(m => m.MessageId == messageId)
                .SelectMany(m => m.Chat.ChatMembers)
                .AnyAsync(member => member.MemberId == userId && member.LeftChat == null);
        }

        public async Task<bool> CheckMembershipByChatIdAsync(int chatId, string userId)
        {
            return await dbContext.ChatMembers
                .Where(m => m.ChatId == chatId && m.MemberId == userId && m.LeftChat == null)
                .AnyAsync();
        }

        public async Task<bool> AddChatMemberAsync(int chatId, string candidatUname, AppUser currentUser)
        {
            var candidat = await usersRepo.GetUserByUnameAsync(candidatUname);
            bool authToAdd = await CheckRoleAsync(chatId, currentUser.Id);
            if (!authToAdd) return false;
            if (candidat == null) return false;
            var isAlreadyAdded = await chatsRepo.GetChatMemberAsync(chatId, candidat.Id);
            if (isAlreadyAdded != null) return false;

            var member = new ChatMember()
            {
                ChatId = chatId,
                MemberId = candidat.Id,
            };
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

        public async Task<bool> RmChatMemberAsync(int chatId, string userToRmUname, AppUser currentUser)
        {
            var userToRm = await usersRepo.GetUserByUnameAsync(userToRmUname);
            bool authToRm = await CheckRoleAsync(chatId, currentUser.Id);
            bool isLeaving = currentUser.Id == userToRm?.Id;
            if (!authToRm && !isLeaving) return false;
            var memberToRm = await chatsRepo.GetChatMemberAsync(chatId, userToRm.Id);
            if (memberToRm == null || memberToRm.LeftChat != null) return false;
            bool result = await chatsRepo.RmChatMemberAsync(memberToRm);
            if (!result) return false;

            var removedMsg = $"{currentUser?.UserName} removed {memberToRm.Member.UserName} from chat.";
            var leftMsg = $"{currentUser?.UserName} left chat.";
            var rightMsg = isLeaving ? leftMsg : removedMsg;

            var notification = new Message
            {
                ChatId = chatId,
                Content = rightMsg,
                RepliedTo = null,
                SenderId = currentUser.Id
            };

            await messagesRepo.InsertAsync(notification);
            return true;
        }

    }
}
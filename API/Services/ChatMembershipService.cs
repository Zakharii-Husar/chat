using API.Models;
using API.Data;
using API.Repos.MessagesRepo;
using API.Repos.UsersRepo;
using Microsoft.EntityFrameworkCore;
using API.Repos;

namespace API.Services
{
    public interface IChatMembershipService
    {

        public Task<string?> RmChatMemberAsync(int chatId, string candidatUname, AppUser currentUser);
        public Task<string?> AddChatMemberAsync(int chatId, string candidatUname, AppUser currentUser);
        public Task<List<string>> GetMembersIdsAsync(int chatId);
        public Task<bool> CheckRoleAsync(int chatId, string userId);
        public Task<ChatMember?> GetMemberByUnameAsync(int chatId, string username);
        public Task<ChatMember?> GetMemberByChatIdAsync(int chatId, string userId);
        public Task<ChatMember?> GetMemberByMsgIdAsync(int messageId, string userId);


    }
    public partial class ChatMembershipService(
        AppDbContext dbContext,
        IUsersRepo usersRepo,
        IChatMembersRepo chatMembersRepo) : IChatMembershipService
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
            var member = await chatMembersRepo.GetMemberByChatIdAsync(chatId, userId);
            if (member == null) return false;
            return member.IsCreator;
        }

        public async Task<ChatMember?> GetMemberByUnameAsync(int chatId, string username)
        {
            return await chatMembersRepo.GetMemberByUnameAsync(chatId, username);
        }

        public async Task<ChatMember?> GetMemberByMsgIdAsync(int messageId, string userId)
        {
            return await chatMembersRepo.GetMemberByMsgIdAsync(messageId, userId);
        }

        public async Task<ChatMember?> GetMemberByChatIdAsync(int chatId, string userId)
        {
            return await chatMembersRepo.GetMemberByChatIdAsync(chatId, userId);
        }

        public async Task<string?> AddChatMemberAsync(int chatId, string candidatUname, AppUser currentUser)
        {
            var candidat = await usersRepo.GetUserByUnameAsync(candidatUname);
            if (candidat == null) return null;
            var member = new ChatMember(candidat.Id, chatId);
            var result = await chatMembersRepo.AddChatMemberAsync(member);
            if (!result) return null;
            return $"{currentUser.UserName} added {candidat.UserName} to chat.";
        }

        public async Task<string?> RmChatMemberAsync(int chatId, string userToRmUname, AppUser currentUser)
        {
            var memberToRm = await chatMembersRepo.GetMemberByUnameAsync(chatId, userToRmUname);
            if (memberToRm == null || memberToRm.LeftChat != null) return null;
            bool result = await chatMembersRepo.RmChatMemberAsync(memberToRm);
            if (!result) return null;

            bool isLeaving = currentUser.UserName == userToRmUname;
            var removedMsg = $"{currentUser?.UserName} removed {userToRmUname} from chat.";
            var leftMsg = $"{currentUser?.UserName} left chat.";
            var notification = isLeaving ? leftMsg : removedMsg;
            return notification;
        }

    }
}
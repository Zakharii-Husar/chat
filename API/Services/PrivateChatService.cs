using API.Data;
using API.Repos;

namespace API.Services
{
    public interface IPrivateChatService
    {
        public Task<int?> GetPrivateChatIdAsync(string uname1, string uname2);
        public Task<int?> CreatePrivateChatAsync(string uname1, string uname2);
    }
    public class PrivateChatService(IChatsRepo chatsRepo, IUsersRepo usersRepo) : IPrivateChatService
    {
        public async Task<int?> GetPrivateChatIdAsync(string uname1, string uname2)
        {
            return await chatsRepo.GetPrivateChatIdAsync(uname1, uname2);
        }

        public async Task<int?> CreatePrivateChatAsync(string uname1, string uname2)
        {
            Chat newChat = new();
            var newChatId = await chatsRepo.CreateChatAsync(newChat);
            if (newChatId == null) return null;
            var user1 = await usersRepo.GetUserByUnameAsync(uname1);
            var user2 = await usersRepo.GetUserByUnameAsync(uname2);
            if (user1 == null || user2 == null) return null;
            await chatsRepo.AddChatMemberAsync(user1.ToChatMember(newChat.ChatId));
            await chatsRepo.AddChatMemberAsync(user2.ToChatMember(newChat.ChatId));
            return newChatId;
        }
    }
}

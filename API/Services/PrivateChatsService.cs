using API.Data;
using API.Repos.ChatsRepo;
using API.Repos.UsersRepo;

namespace API.Services
{
    public interface IPrivateChatsService
    {
        public Task<int?> GetPrivateChatIdAsync(string uname1, string uname2);
        public Task<int?> CreatePrivateChatAsync(string uname1, string uname2);
    }
    public class PrivateChatsService(ChatsRepo chatsRepo, UsersRepo usersRepo) : IPrivateChatsService
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
            await chatsRepo.AddChatMemberAsync(user1.ToChatMember(newChat.ChatId));
            await chatsRepo.AddChatMemberAsync(user2.ToChatMember(newChat.ChatId));
            return newChatId;
        }
    }
}

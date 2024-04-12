using API.Data;

namespace API.Services.ChatsService
{
    public partial class ChatsService
    {
        public async Task<int?> CreatePrivateChatAsync(string uname1, string uname2)
        {
            var existibgChat = await GetPrivateChatIdAsync(uname1, uname2);
            if (existibgChat != null) return existibgChat;

            var newChat = new Chat
            {
                ChatName = null,
                IsGroupChat = false
            };

            var newChatId = await chatsRepo.CreateChatAsync(newChat);
            if (newChatId == null) return null;
            var user1 = await usersRepo.GetUserByUnameAsync(uname1);
            var user2 = await usersRepo.GetUserByUnameAsync(uname2);
            var member1 = new ChatMember()
            {
                ChatId = newChat.ChatId,
                MemberId = user1!.Id,
                IsCreator = false
            };
            var member2 = new ChatMember()
            {
                ChatId = newChat.ChatId,
                MemberId = user2!.Id,
                IsCreator = false
            };
            await chatsRepo.AddChatMemberAsync(member1);
            await chatsRepo.AddChatMemberAsync(member2);
            return newChatId;
        }
    }
}

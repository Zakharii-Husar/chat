using API.Data;

namespace API.Repos.ChatsRepo
{
    public partial class ChatsRepo
    {
        public async Task<int?> CreatePrivateChatAsync()
        {
            var newChat = new Chat
            {
                ChatName = null,
                IsGroupChat = false
            };

            dbContext.Chats.Add(newChat);
            await dbContext.SaveChangesAsync();

            return newChat.ChatId;
        }
    }
}

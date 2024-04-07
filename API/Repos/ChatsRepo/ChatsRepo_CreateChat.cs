using API.Data;

namespace API.Repos.ChatsRepo
{
    public partial class ChatsRepo
    {
        public async Task<int?> CreateChatAsync(Chat chat)
        {
            dbContext.Chats.Add(chat);
            await dbContext.SaveChangesAsync();

            return chat.ChatId;
        }
    }
}

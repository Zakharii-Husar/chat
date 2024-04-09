using API.Data;
using API.Models;
namespace API.Repos.ChatsRepo
{
    public partial class ChatsRepo
    {
        public async Task<string?> RenameChatAsync(int chatId, string newName)
        {
            var chatToUpdate = await GetChatById(chatId);
            if (chatToUpdate == null) return null;

            chatToUpdate.ChatName = newName;
            await dbContext.SaveChangesAsync();
            return newName;
        }
    }
}

using API.Data;
using API.Models;
namespace API.Repos.ChatsRepo
{
    public partial class ChatsRepo
    {
        public async Task<string?> RenameChatAsync(RenameChatRequest request)
        {
            var chatToUpdate = await GetChatById(request.ChatId);
            if (chatToUpdate == null) return null;

            chatToUpdate.ChatName = request.NewChatName;
            await dbContext.SaveChangesAsync();
            return request.NewChatName;
        }
    }
}

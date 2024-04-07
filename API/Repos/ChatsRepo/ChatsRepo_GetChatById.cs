using Microsoft.EntityFrameworkCore;
using API.Data;

namespace API.Repos.ChatsRepo
{
    public partial class ChatsRepo
    {
        public async Task<Chat?> GetChatById(int Id)
        {
            return await dbContext.Chats
                .Where(chat => chat.ChatId == Id)
                .FirstOrDefaultAsync();
        }
    }
}

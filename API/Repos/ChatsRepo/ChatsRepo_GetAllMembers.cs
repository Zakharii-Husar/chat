using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Repos.ChatsRepo
{
    public partial class ChatsRepo
    {
        public async Task<List<AppUser>> GetAllMembers(int chatId)
        {
            return await dbContext.ChatMembers
                .Where(member => member.ChatId == chatId)
                .Select(member => member.Member)
                .ToListAsync();
        }
    }
}

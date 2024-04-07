using API.Models;
using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Services.ChatsService
{
    public partial class ChatsService
    {
        public async Task<bool> CheckRoleAsync(int chatId, string userId)
        {
            return await dbContext.ChatMembers
                 .Where(member => member.ChatId == chatId)
                 .Where(member => member.MemberId == userId)
                 .Where(member => member.IsCreator == true)
                 .Where(member => member.LeftChat != null)
                 .AnyAsync();
        }
    }
}
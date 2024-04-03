using API.Models;
using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Services.MessagesService
{
    public partial class ChatsService
    {
        public async Task<bool> CheckRoleAsync(int ChatId, string UserId)
        {
            return await dbContext.ChatMembers
                 .Where(member => member.ChatId == ChatId)
                 .Where(member => member.MemberId == UserId)
                 .Where(member => member.IsCreator == true)
                 .Where(member => member.LeftChat != null)
                 .AnyAsync();
        }
    }
}
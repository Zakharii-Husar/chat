using API.Models;
using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace API.Services.ChatsService
{
    public partial class ChatsService
    {
        public async Task<List<string>> GetMembersIdsAsync(int chatId)
        {
            return await dbContext.ChatMembers
                 .Where(member => member.ChatId == chatId)
                 .Select(member => member.MemberId)
                 .ToListAsync();
        }
    }
}
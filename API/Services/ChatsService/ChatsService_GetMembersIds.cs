using API.Models;
using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace API.Services.MessagesService
{
    public partial class ChatsService
    {
        public async Task<List<string>> GetMembersIdsAsync(int Id)
        {
            return await dbContext.ChatMembers
                 .Where(member => member.ChatId == Id)
                 .Select(member => member.MemberId)
                 .ToListAsync();
        }
    }
}
using API.Models;
using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace API.Services.MessagesService
{
    public partial class ChatsService
    {
        public async Task<bool> CheckMembershipAsync(int messageId, string userId)
        {
            var chatId = await _dbContext.Messages
                .Where(m => m.MessageId == messageId)
                .Select(m => m.ChatId)
                .FirstOrDefaultAsync();

            if (chatId == default)
            {
                return false;
            }

            return await _dbContext.ChatMembers
                .AnyAsync(member => member.ChatId == chatId &&
                                    member.MemberId == userId &&
                                    member.LeftChat != null);
        }
    }
}

using API.Models;
using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace API.Services.MessagesService
{
    public partial class MessagesService
    {
        public async Task<bool> RmLike(int messageId, string currentUserId)
        {
            var chatId = await dbContext.Messages
                .Where(message => message.MessageId == messageId)
                .Select(message => message.ChatId)
                .FirstOrDefaultAsync();

            var isAuthorizedToLike = await dbContext.ChatMembers
                .AnyAsync(
                member => member.MemberId == currentUserId
                && member.ChatId == chatId
                && member.LeftChat == null);

            if (!isAuthorizedToLike) return false;

            var existingLike = await dbContext.Likes
                .FirstOrDefaultAsync(like => like.MessageId == messageId && like.UserId == currentUserId);

            if (existingLike != null) return true;

            var newLike = new Like
            {
                MessageId = messageId,
                UserId = currentUserId!
            };


            dbContext.Likes.Add(newLike);
            await dbContext.SaveChangesAsync();
            return true;
        }
    }
}

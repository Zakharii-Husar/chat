using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace API.Repos
{

    public partial class MessagesRepo : IMessagesRepo
    {
        public async Task<bool> LikeExistsAsync(int messageId, string userId)
        {
            return await dbContext.Likes
             .Where(like => like.UserId == userId)
             .Where(like => like.MessageId == messageId)
             .AnyAsync();
        }

        public async Task<bool> AddLikeAsync(int messageId, string userId)
        {
            var newLike = new Like
            {
                MessageId = messageId,
                UserId = userId
            };


            dbContext.Likes.Add(newLike);
            var rowsAffected =
                await dbContext.SaveChangesAsync();

            return rowsAffected > 0;
        }

        public async Task<bool> RmLikeAsync(int messageId)
        {

            var like = await dbContext.Likes
                .FirstOrDefaultAsync(like => like.MessageId == messageId);

            dbContext.Likes.Remove(like!);
            var rowsAffected =
                await dbContext.SaveChangesAsync();
            return rowsAffected > 0;
        }


    }
}


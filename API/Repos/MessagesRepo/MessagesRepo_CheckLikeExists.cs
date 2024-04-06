using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Repos.MessagesRepo
{

    public partial class MessagesRepo
    {
        public async Task<bool> LikeExistsAsync(int messageId, string userId)
        {
            return await dbContext.Likes
             .Where(like => like.UserId == userId)
             .Where(like => like.MessageId == messageId)
             .AnyAsync();
        }

    }
}


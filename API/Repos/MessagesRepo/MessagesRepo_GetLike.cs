using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Repos.MessagesRepo
{

    public partial class MessagesRepo
    {
        public async Task<Like?> GetLikeAsync(int messageId, string userId)
        {
            return await dbContext.Likes
                .FirstOrDefaultAsync(like => like.MessageId == messageId && like.UserId == userId);
        }

    }
}


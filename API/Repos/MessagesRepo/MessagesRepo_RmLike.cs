using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Repos.MessagesRepo
{

    public partial class MessagesRepo
    {
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
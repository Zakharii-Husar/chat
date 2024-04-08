using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Repos.MessagesRepo
{

    public partial class MessagesRepo
    {
        public async Task<bool> RmLikeAsync(Like like)
        {
            dbContext.Likes.Remove(like);
            var rowsAffected =
                await dbContext.SaveChangesAsync();
            return rowsAffected > 0;
        }


    }
}
using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Repos.MessagesRepo
{

    public partial class MessagesRepo
    {

        public async Task<bool> AddLikeAsync(Like newLike)
        {
            dbContext.Likes.Add(newLike);
            var rowsAffected =
                await dbContext.SaveChangesAsync();

            return rowsAffected > 0;
        }


    }
}
using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Repos.MessagesRepo
{
    public partial class MessagesRepo
    {
        public async Task<bool> MarkAsReadAsync(ReadReceipt newReceipt)
        {
            dbContext.ReadReceipts.Add(newReceipt);
            var rowsAffected =
                await dbContext.SaveChangesAsync();

            return rowsAffected > 0;
        }
    }
}

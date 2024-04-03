using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace API.Repos
{
    public interface IMessagesRepo
    {
        public Task<Message?> GetByIdAsync(int messageId);
        public Task<bool> InsertAsync(Message message);
        public Task<bool> DeleteAsync(int id);
        public Task<bool> LikeExistsAsync(int messageId, string userId);
        public Task<bool> AddLikeAsync(int messageId, string userId);
        public Task<bool> RmLikeAsync(int messageId);
        public Task<bool> MarkAsReadAsync(int messageId, string userId);

    }
    public partial class MessagesRepo(AppDbContext dbContext) : IMessagesRepo
    {
        public async Task<Message?> GetByIdAsync(int messageId)
        {
            return await dbContext.Messages
                .Where(m => m.MessageId == messageId)
                .FirstOrDefaultAsync();
        }

        public async Task<bool> InsertAsync(Message message)
        {
            await dbContext.Messages.AddAsync(message);
            var rowsAffected =
                await dbContext.SaveChangesAsync();
            return rowsAffected > 0;
        }
        public async Task<bool> DeleteAsync(int id)
        {
            var message = await dbContext.Messages.FindAsync(id);
            dbContext.Messages.Remove(message!);

            var rowsAffected =
             await dbContext.SaveChangesAsync();
            return rowsAffected > 0;
        }

        public async Task<bool> MarkAsReadAsync(int messageId, string userId)
        {
            var newReceipt = new ReadReceipt()
            {
                MessageId = messageId,
                UserId = userId
            };
            dbContext.ReadReceipts.Add(newReceipt);
            var rowsAffected =
                await dbContext.SaveChangesAsync();

            return rowsAffected > 0;
        }

    }
}


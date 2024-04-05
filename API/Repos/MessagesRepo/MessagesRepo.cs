using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace API.Repos
{
    public interface IMessagesRepo
    {
        public Task<Message?> GetLastMessageAsync(int chatId, string userId);
        public Task<Message?> GetMessageByIdAsync(int messageId);
        public Task<bool> InsertAsync(Message message);
        public Task<bool> DeleteAsync(int id);
        public Task<bool> LikeExistsAsync(int messageId, string userId);
        public Task<bool> AddLikeAsync(Like newLike);
        public Task<bool> RmLikeAsync(int messageId);
        public Task<bool> MarkAsReadAsync(ReadReceipt newReceipt);

    }
    public partial class MessagesRepo(AppDbContext dbContext) : IMessagesRepo
    {
        public async Task<Message?> GetLastMessageAsync(int chatId, string userId)
        {
            DateTime? leftChat = await dbContext.ChatMembers
                 .Where(chat => chat.ChatId == chatId && chat.MemberId == userId)
                 .Select(cm => cm.LeftChat)
                 .FirstOrDefaultAsync();

            if (leftChat == null) return await dbContext.Messages
                    .Where(m => m.ChatId == chatId)
                    .FirstOrDefaultAsync();

            return await dbContext.Messages
                .Where(m => m.ChatId == chatId)
                .Where(chat => chat.SentAt < leftChat)
                .FirstOrDefaultAsync();
        }
        public async Task<Message?> GetMessageByIdAsync(int messageId)
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

        public async Task<bool> MarkAsReadAsync(ReadReceipt newReceipt)
        {
            dbContext.ReadReceipts.Add(newReceipt);
            var rowsAffected =
                await dbContext.SaveChangesAsync();

            return rowsAffected > 0;
        }

    }
}


using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace API.Repos
{
    public interface IMessagesRepo
    {
        public Task<bool> MarkAsDeletedAsync(Message message);
        public Task<List<Message>> GetUnreadMessagesAsync(int chatId, string userId);
        public Task<ReadReceipt?> GetReadReceiptAsync(int messageId, string userId);
        public Task<List<Message>> GetMessagesByChatMemberAsync(ChatMember member, int paginationOffset, int paginationStep);
        public Task<Message?> GetMessageByIdAsync(int messageId);
        public Task<Message?> InsertAsync(Message message);
        public Task<Like?> GetLikeAsync(int messageId, string userId);
        public Task<bool> AddLikeAsync(Like newLike);
        public Task<bool> RmLikeAsync(Like newLike);
        public Task<bool> MarkAsReadAsync(ReadReceipt newReceipt);
        public Task<List<Message?>> GetLastMessagesAsync(string userId, int itemsToSkip, int itemsToTake);

    }
    public partial class MessagesRepo(AppDbContext dbContext) : IMessagesRepo
    {
        public async Task<Message?> InsertAsync(Message message)
        {
            await dbContext.Messages.AddAsync(message);
            await dbContext.SaveChangesAsync();
            return message;
        }

        public async Task<bool> MarkAsDeletedAsync(Message message)
        {
            message.IsDeleted = true;
            dbContext.Messages.Update(message);
            int rowsAffected = await dbContext.SaveChangesAsync();
            return rowsAffected > 0;
        }

        public async Task<bool> MarkAsReadAsync(ReadReceipt newReceipt)
        {
            dbContext.ReadReceipts.Add(newReceipt);
            var rowsAffected =
                await dbContext.SaveChangesAsync();

            return rowsAffected > 0;
        }
        public async Task<bool> AddLikeAsync(Like newLike)
        {
            dbContext.Likes.Add(newLike);
            var rowsAffected =
                await dbContext.SaveChangesAsync();

            return rowsAffected > 0;
        }

        public async Task<bool> RmLikeAsync(Like like)
        {
            dbContext.Likes.Remove(like);
            var rowsAffected =
                await dbContext.SaveChangesAsync();
            return rowsAffected > 0;
        }

        public async Task<Like?> GetLikeAsync(int messageId, string userId)
        {
            return await dbContext.Likes
                .FirstOrDefaultAsync(like => like.MessageId == messageId && like.UserId == userId);
        }

        public async Task<Message?> GetMessageByIdAsync(int messageId)
        {
            return await dbContext.Messages
                .Where(m => m.MessageId == messageId)
                .Include(m => m.Chat)
                .ThenInclude(c => c.ChatMembers)
                .FirstOrDefaultAsync();
        }

        public async Task<ReadReceipt?> GetReadReceiptAsync(int messageId, string userId)
        {
            return await dbContext.ReadReceipts
                .Where(r => r.MessageId == messageId && r.UserId == userId)
                .FirstOrDefaultAsync();
        }

        public async Task<List<Message>> GetUnreadMessagesAsync(int chatId, string userId)
        {
            return await dbContext.Messages
                .Where(m => m.ChatId == chatId)
                .Where(m => !m.ReadReceipts.Any(rr => rr.UserId == userId))
                .Select(m => m)
                .ToListAsync();
        }

        public async Task<List<Message?>> GetLastMessagesAsync(string userId, int itemsToSkip, int itemsToTake)
        {
            return dbContext.Messages
                .Where(m => m.Chat.ChatMembers.Select(cm => cm.MemberId).Contains(userId))
                .GroupBy(m => m.ChatId)
                .Select(g => g.OrderByDescending(m => m.SentAt).FirstOrDefault())
                .AsEnumerable()
                .OrderByDescending(m => m.SentAt)
                .Skip(itemsToSkip)
                .Take(itemsToTake)
                .ToList();
        }

        public async Task<List<Message>> GetMessagesByChatMemberAsync(
                                                     ChatMember member,
                                                     int itemsToSkip,
                                                     int itemsToTake)
        {

            var messagesQuery = dbContext.Messages
                .Where(message => message.ChatId == member.ChatId)
                .Where(message => message.SentAt > member.EnteredChat);
            if (member.LeftChat != null)
            {
                messagesQuery = messagesQuery
                    .Where(message => message.SentAt < member.LeftChat);
            }
            messagesQuery = messagesQuery.OrderByDescending(message => message.SentAt);

            var messagesTotal = await messagesQuery.CountAsync();
            var messagesLeft = messagesTotal - itemsToSkip;
            var messagesToTake = messagesLeft < itemsToTake ? messagesLeft : itemsToTake;
            if (messagesToTake < 1) return [];

            return await messagesQuery
                .Select(m => m)
                .Include(m => m.ReadReceipts)
                .ThenInclude(rr => rr.User)
                .Include(m => m.Likes)
                .ThenInclude(like => like.User)
                .Skip(itemsToSkip)
                .Take(messagesToTake)
                .ToListAsync();


        }
    }
}


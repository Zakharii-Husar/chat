using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace API.Repos.MessagesRepo
{
    public interface IMessagesRepo
    {
        public Task<List<int>> GetNewMessagesIds(int chatId, string userId);
        public Task<ReadReceipt?> GetReadReceiptAsync(int messageId, string userId);
        public Task<List<Message>> GetMessagesByChatMember(ChatMember member, int paginationOffset, int paginationStep);
        public Task<Message?> GetLastMessageAsync(int chatId, string userId);
        public Task<Message?> GetMessageByIdAsync(int messageId);
        public Task<Message?> InsertAsync(Message message);
        public Task<bool> LikeExistsAsync(int messageId, string userId);
        public Task<bool> AddLikeAsync(Like newLike);
        public Task<bool> RmLikeAsync(int messageId);
        public Task<bool> MarkAsReadAsync(ReadReceipt newReceipt);

    }
    public partial class MessagesRepo(AppDbContext dbContext) : IMessagesRepo;
}


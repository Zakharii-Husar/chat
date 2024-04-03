using API.Models;
using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace API.Services.MessagesService
{
    public interface IMessagesService
    {
        public MessageDTO ConvertToDTO(Message message);
        public Task<MessageDTO> InsertAsync(SendMessageModel messageModel, string senderId);
        public Task<bool> AddLike(int messageId, string currentUserId);
        public Task<bool> RmLike(int messageId, string currentUserId);
    }
    public partial class MessagesService(AppDbContext dbContext) : IMessagesService
    {
        private readonly AppDbContext _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));

        public MessageDTO ConvertToDTO(Message message)
        {
            if (message == null) return null;

            var messageDTO = new MessageDTO
            {
                MessageId = message.MessageId,
                SenderId = message.SenderId,
                SenderUserName = message.Sender?.UserName,
                SenderAvatarName = message.Sender?.AvatarName,
                ChatId = message.ChatId,
                ChatName = message.Chat?.ChatName,
                Content = message.Content,
                SentAt = message.SentAt,
                Likes = message.Likes?.Select(like => like.User?.UserName).ToList()
            };

            return messageDTO;
        }

    }


}

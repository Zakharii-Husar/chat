using API.Data;
using API.Models;
using API.Repos;

namespace API.Services
{
    public interface IMessageService
    {
        public Task<Message?> GetMsgByIdAsync(int msgId);
        public Task<Message?> SendMsgAsync(int chatId, SendMessageModel model, string currentUserId);
        public Task<bool> AddLikeAsync(int messageId, string currentUserId);
        public Task<bool> RmLikeAsync(int messageId, string currentUserId);
        public Task<bool> MarkMsgAsDelAsync(Message msg);
    }
    public class MessageService(IMessagesRepo messagesRepo, IUsersRepo usersRepo) : IMessageService
    {
        public async Task<Message?> GetMsgByIdAsync(int msgId)
        {
            return await messagesRepo.GetMessageByIdAsync(msgId);
        }

        public async Task<Message?> SendMsgAsync(
                                   int chatId,
                                   SendMessageModel model,
                                   string currentUserId)
        {

            var newMessage = new Message(chatId, currentUserId, model.Content, model.RepliedTo);

            var result = await messagesRepo.InsertAsync(newMessage);
            return result;
        }

        public async Task<bool> AddLikeAsync(int messageId, string currentUserId)
        {
            var existingLike = await messagesRepo.GetLikeAsync(messageId, currentUserId);
            if (existingLike != null) return true;

            var message = await messagesRepo.GetMessageByIdAsync(messageId);
            var user = await usersRepo.GetUserByIdAsync(currentUserId);
            
            if (message == null || user == null) return false;

            var newLike = new Like(messageId, currentUserId)
            {
                Message = message,
                User = user
            };

            return await messagesRepo.AddLikeAsync(newLike);
        }

        public async Task<bool> RmLikeAsync(int messageId, string currentUserId)
        {


            var existingLike = await messagesRepo.GetLikeAsync(messageId, currentUserId);
            if (existingLike == null) return true;

            return await messagesRepo.RmLikeAsync(existingLike);
        }

        public async Task<bool> MarkMsgAsDelAsync(Message msg)
        {

            if (msg.IsDeleted) return true;
            return await messagesRepo.MarkAsDeletedAsync(msg);
        }
    }
}

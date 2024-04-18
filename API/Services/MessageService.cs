using API.Data;
using API.Models;
using API.Repos.MessagesRepo;

namespace API.Services
{
    public interface IMessageService
    {
        public Task<bool> SendMsgAsync(int chatId, SendMessageModel model, string currentUserId);
        public Task<bool> AddLikeAsync(int messageId, string currentUserId);
        public Task<bool> RmLikeAsync(int messageId, string currentUserId);
        public Task<bool> MarkMsgAsDelAsync(int messageId, string currentUserId);
    }
    public class MessageService : IMessageService
    {
        public async Task<bool> SendMsgAsync(
                                   int chatId,
                                   SendMessageModel model,
                                   string currentUserId)
        {
            bool isMember = await CheckMembershipByChatIdAsync(chatId, currentUserId);
            if (!isMember) return false;

            var newMessage = new Message
            {
                ChatId = chatId,
                Content = model.Content,
                RepliedTo = model.RepliedTo ?? null,
                SenderId = currentUserId
            };
            var result = await messagesRepo.InsertAsync(newMessage);
            if (result == null) return false;
            await WSBroadcastMessageAsync(result);
            return true;
        }

        public async Task<bool> AddLikeAsync(int messageId, string currentUserId)
        {

            var isAuthorizedToLike = await CheckMembershipByMsgIdAsync(messageId, currentUserId);
            if (!isAuthorizedToLike) return false;

            var existingLike = await messagesRepo.GetLikeAsync(messageId, currentUserId);
            if (existingLike != null) return true;

            var newLike = new Like
            {
                MessageId = messageId,
                UserId = currentUserId!
            };

            return await messagesRepo.AddLikeAsync(newLike);
        }

        public async Task<bool> RmLikeAsync(int messageId, string currentUserId)
        {


            var existingLike = await messagesRepo.GetLikeAsync(messageId, currentUserId);
            if (existingLike == null) return true;

            return await messagesRepo.RmLikeAsync(existingLike);
        }

        public async Task<bool> MarkMsgAsDelAsync(int messageId, string currentUserId)
        {
            var msgToRm = await messagesRepo.GetMessageByIdAsync(messageId);
            if (msgToRm == null || msgToRm.SenderId != currentUserId) return false;
            return await messagesRepo.MarkAsDeletedAsync(msgToRm);
        }
    }
}

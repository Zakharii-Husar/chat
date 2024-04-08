using API.Data;
using API.Models;

namespace API.Services.ChatsService
{
    public partial class ChatsService
    {
        public async Task<bool> SendMsgAsync(SendMessageModel model, string currentUserId)
        {
            bool isMember = await CheckMembershipByChatIdAsync(model.ChatId, currentUserId);
            if (!isMember) return false;

            var newMessage = new Message
            {
                ChatId = model.ChatId,
                Content = model.Content,
                RepliedTo = model.RepliedTo ?? null,
                SenderId = currentUserId
            };
            await messagesRepo.InsertAsync(newMessage);
            //await conmanService.BroadcastMessage(insertedMessage, participantsIds);
            return true;
        }
    }
}

using API.Data;
using API.Models;

namespace API.Services.ChatsService
{
    public partial class ChatsService
    {
        public async Task<bool> SendMsgAsync(int chatId, SendMessageModel model, string currentUserId)
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
            Console.WriteLine(result.Content);
            return true;
        }
    }
}

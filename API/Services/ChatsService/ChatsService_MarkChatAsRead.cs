using API.Data;

namespace API.Services.ChatsService
{
    public partial class ChatsService
    {
        public async Task<bool> MarkChatAsReadAsync(int chatId, AppUser currentUser)
        {
            var newMessages = await messagesRepo.GetUnreadMessagesAsync(chatId, currentUser.Id);

            foreach (var message in newMessages)
            {
                var existingReceipt = await messagesRepo.GetReadReceiptAsync(message.MessageId, currentUser.Id);
                if (message.SenderId == currentUser.Id || existingReceipt != null) continue;

                var receipt = new ReadReceipt()
                {
                    MessageId = message.MessageId,
                    UserId = currentUser.Id,
                };

                await messagesRepo.MarkAsReadAsync(receipt);
                await WSMarkAsReadAsync(chatId, currentUser);
            }
            return true;
        }
    }
}

using API.Data;

namespace API.Services.ChatsService
{
    public partial class ChatsService
    {
        public async Task<bool> MarkChatAsReadAsync(int chatId, AppUser currentUser)
        {
            var newMessages = await messagesRepo.GetNewMessagesIds(chatId, currentUser.Id);

            foreach (var messageId in newMessages)
            {
                var existingReceipt = await messagesRepo.GetReadReceiptAsync(messageId, currentUser.Id);
                if (existingReceipt != null) continue;

                var receipt = new ReadReceipt()
                {
                    MessageId = messageId,
                    UserId = currentUser.Id,
                };

                await messagesRepo.MarkAsReadAsync(receipt);
            }
            return true;
        }
    }
}

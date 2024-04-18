using API.Data;
using API.Models;
using API.Repos.ChatsRepo;
using API.Repos.MessagesRepo;

namespace API.Services
{
    public interface IAllChatsService
    {
        public Task<Message?> SendNotificationAsync(int chatId, string content, string senderId);
        public Task<bool> MarkChatAsReadAsync(int chatId, AppUser currentUser);
        public Task<List<MessageDTO>> GetChatsOverviewAsync(string userId, int itemsToSkip, int itemsToTake);
        public Task<ChatDTO?> GetChatDTOAsync(string userId, int chatId, int itemsToSkip, int itemsToTake);
    }
    public class AllChatsService(MessagesRepo messagesRepo) : IAllChatsService
    {
        public async Task<Message?> SendNotificationAsync(int chatId, string senderId, string content)
        {
            var msg = new Message();
            var notification = msg.MakeNotification(chatId, senderId, content);
            var inserted = await messagesRepo.InsertAsync(notification);
            if (inserted == null) return null;
            return msg;
        }
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

        public async Task<List<MessageDTO>> GetChatsOverviewAsync(string userId, int itemsToSkip, int itemsToTake)
        {

            var chatsIds = await chatsRepo.GetUserChatsIdsAsync(userId, itemsToSkip, itemsToTake);
            var lastMessages = new List<MessageDTO>();

            if (chatsIds.Count < 1) return lastMessages;
            foreach (var chatId in chatsIds)
            {
                var msg = await messagesRepo.GetLastMessageAsync(chatId, userId);
                if (msg != null) lastMessages.Add(msg.ToDTO());
            }

            return lastMessages;
        }

        public async Task<ChatDTO?> GetChatDTOAsync(string userId, int chatId, int itemsToSkip, int itemsToTake)
        {
            var chatName = await chatsRepo.GetChatNameByIdAsync(chatId);
            var currentMember = await chatsRepo.GetChatMemberAsync(chatId, userId);
            if (currentMember == null) return null;
            var members = await chatsRepo.GetAllMembersAsync(chatId);
            var convertedMembers = members.Select(member => member.ToDTO()).ToList();
            var messages = await messagesRepo.GetMessagesByChatMemberAsync(currentMember, itemsToSkip, itemsToTake);
            var convertedMessages = messages.Select(msg => msg.ToDTO()).ToList();


            return new ChatDTO
            {
                ChatId = chatId,
                ChatName = chatName,
                Members = convertedMembers,
                Messages = convertedMessages,
                PaginationOffset = itemsToSkip + itemsToTake,
                HasMoreMessages = messages.Count >= itemsToTake,
            };
        }

        public async Task<bool> MarkMsgAsDelAsync(int messageId, string currentUserId)
        {
            var msgToRm = await messagesRepo.GetMessageByIdAsync(messageId);
            if (msgToRm == null || msgToRm.SenderId != currentUserId) return false;
            return await messagesRepo.MarkAsDeletedAsync(msgToRm);
        }

    }
}

using API.Data;
using API.Models;
using API.Repos;

namespace API.Services
{
    public interface IAllChatsService
    {
        public Task<Message?> SendNotificationAsync(int chatId, string senderId, string content);
        public Task<bool> MarkChatAsReadAsync(int chatId, AppUser currentUser);
        public Task<List<MessageDTO>> GetChatsOverviewAsync(string userId, int itemsToSkip, int itemsToTake);
        public Task<ChatDTO?> GetChatByIdAsync(string userId, int chatId, int itemsToSkip, int itemsToTake);
    }
    public class AllChatsService(IMessagesRepo messagesRepo, IChatsRepo chatsRepo, IChatMembersRepo chatMembersRepo) : IAllChatsService
    {
        public async Task<Message?> SendNotificationAsync(int chatId, string senderId, string content)
        {
            var notification = new Message(chatId, senderId, content, null, true);
            var inserted = await messagesRepo.InsertAsync(notification);
            if (inserted == null) return null;
            return notification;
        }
        public async Task<bool> MarkChatAsReadAsync(int chatId, AppUser currentUser)
        {
            var newMessages = await messagesRepo.GetUnreadMessagesAsync(chatId, currentUser.Id);

            foreach (var message in newMessages)
            {
                var existingReceipt = await messagesRepo.GetReadReceiptAsync(message.MessageId, currentUser.Id);
                if (message.SenderId == currentUser.Id || existingReceipt != null) continue;

                var receipt = new ReadReceipt(message.MessageId, currentUser.Id);

                await messagesRepo.MarkAsReadAsync(receipt);
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

        public async Task<ChatDTO?> GetChatByIdAsync(string userId, int chatId, int itemsToSkip, int itemsToTake)
        {
            var chatName = await chatsRepo.GetChatNameByIdAsync(chatId);
            var currentMember = await chatMembersRepo.GetMemberByChatIdAsync(chatId, userId);
            var members = await chatMembersRepo.GetAllMembersAsync(chatId);
            var convertedMembers = members.Select(member => member.ToDTO()).ToList();
            var messages = await messagesRepo.GetMessagesByChatMemberAsync(currentMember, itemsToSkip, itemsToTake);
            var convertedMessages = messages.Select(msg => msg.ToDTO()).ToList();
            var chatAdmin = await chatMembersRepo.GetAdminByChatIdAsync(chatId);


            return new ChatDTO
            {
                ChatId = chatId,
                AdminId = chatAdmin?.MemberId ?? null,
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

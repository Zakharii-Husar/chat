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
    public class AllChatsService(
        IMessagesRepo messagesRepo, 
        IChatsRepo chatsRepo, 
        IChatMembersRepo chatMembersRepo,
        IUsersRepo usersRepo) : IAllChatsService
    {
        public async Task<Message?> SendNotificationAsync(int chatId, string senderId, string content)
        {
            var chat = await chatsRepo.GetChatById(chatId);
            var sender = await usersRepo.GetUserByIdAsync(senderId);
            
            if (chat == null || sender == null) return null;
            
            var notification = new Message(chatId, senderId, content, null, true)
            {
                Chat = chat,
                Sender = sender
            };
            
            var inserted = await messagesRepo.InsertAsync(notification);
            if (inserted == null) return null;
            
            // Return the message with navigation properties loaded
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

            var lastMessages = await messagesRepo.GetLastMessagesAsync(userId, itemsToSkip, itemsToTake);

            if (lastMessages.Count() < 1) return [];

            return lastMessages.Select(m => m!.ToDTO(userId)).ToList();
        }

        public async Task<ChatDTO?> GetChatByIdAsync(string userId, int chatId, int itemsToSkip, int itemsToTake)
        {
            var chatName = await chatsRepo.GetChatNameByIdAsync(chatId);
            var currentMember = await chatMembersRepo.GetMemberByChatIdAsync(chatId, userId);
            var members = await chatMembersRepo.GetAllMembersAsync(chatId, false);
            
            // Get online status for each member through WSService
            var convertedMembers = members.Select(member => 
            {
                var dto = member.ToDTO();
                return dto;
            }).ToList();

            if (currentMember == null) return null;
            var messages = await messagesRepo.GetMessagesByChatMemberAsync(currentMember, itemsToSkip, itemsToTake);
            var convertedMessages = messages.Select(msg => msg.ToDTO(userId)).ToList();
            var chatAdmin = await chatMembersRepo.GetAdminByChatIdAsync(chatId);
            var chat = await chatsRepo.GetChatById(chatId);

            return new ChatDTO
            {
                ChatId = chatId,
                AdminId = chatAdmin?.MemberId ?? null,
                ChatName = chatName,
                IsGroupChat = chat.IsGroupChat,
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

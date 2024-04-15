using API.Models;

namespace API.Services.ChatsService
{
    public partial class ChatsService
    {
        public async Task<ChatDTO?> GetChatDTOAsync(string userId, int chatId, int itemsToSkip, int itemsToTake)
        {
            var chatName = await chatsRepo.GetChatNameByIdAsync(chatId);
            var currentMember = await chatsRepo.GetChatMemberAsync(chatId, userId);
            if (currentMember == null) return null;
            var members = await chatsRepo.GetAllMembersAsync(chatId);
            var convertedMembers = members.Select(usersService.ConvertUserToDTO).ToList();
            var messages = await messagesRepo.GetMessagesByChatMemberAsync(currentMember, itemsToSkip, itemsToTake);
            var convertedMessages = messages.Select(ConvertMessageToDTO).ToList();


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
    }
}

using API.Data;
using API.Models;
using API.Repos;
using API.Repos.ChatsRepo;
using Microsoft.AspNetCore.Identity;

namespace API.Services.ChatsService
{
    public partial class ChatsService
    {
        public async Task<List<MessageDTO>> GetChatsOverviewAsync(string userId, int itemsToSkip, int itemsToTake)
        {

            var chatsIds = await chatsRepo.GetUserChatsIdsAsync(userId, itemsToSkip, itemsToTake);
            var lastMessages = new List<MessageDTO>();

            if (chatsIds.Count < 1) return lastMessages;
            foreach (var chatId in chatsIds)
            {
                var msg = await messagesRepo.GetLastMessageAsync(chatId, userId);
                if (msg != null) lastMessages.Add(ConvertMessageToDTO(msg));
            }

            return lastMessages;
        }
    }
}

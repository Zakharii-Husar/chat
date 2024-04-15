using API.Data;
using API.Models;
using Microsoft.AspNetCore.SignalR;


namespace API.Services.ChatsService
{
    public partial class ChatsService
    {
        public async Task WSMarkAsReadAsync(int chatId, AppUser user)
        {
            var recipientsIds = await GetMembersIdsAsync(chatId);
            foreach (var recipientId in recipientsIds)
            {
                var connectionId = wsConManService.GetConnectionId(recipientId);
                if (connectionId == null || user.Id == recipientId)
                {
                    continue;
                }
                await hub.Clients.Client(connectionId).SendAsync("MarkChatAsRead", new
                {
                    chatId,
                    user.UserName
                });
            }
        }
    }
}

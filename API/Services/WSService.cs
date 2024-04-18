using API.Data;
using API.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace API.Services
{

    public interface IWSService
    {
        public Task BroadcastMessageAsync(Message newMessage);
        public Task MarkAsReadAsync(int chatId, AppUser user);
    }
    public class WSService(IHubContext<MainHub> hub, IWsConManService wsConManService) : IWSService
    {
        public async Task BroadcastMessageAsync(Message newMessage)
        {
            var recipients = await GetMembersIdsAsync(newMessage.ChatId);
            foreach (var recipient in recipients)
            {
                var connectionId = wsConManService.GetConnectionId(recipient);
                if (connectionId == null)
                {
                    continue;
                }
                await hub.Clients.Client(connectionId).SendAsync("ReceiveNewMessage", newMessage.ToDTO());
            }
        }

        public async Task MarkAsReadAsync(int chatId, AppUser user)
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

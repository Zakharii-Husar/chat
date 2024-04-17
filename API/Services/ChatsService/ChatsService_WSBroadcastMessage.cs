using API.Data;
using API.Models;
using Microsoft.AspNetCore.SignalR;


namespace API.Services.ChatsService
{
    public partial class ChatsService
    {
        public async Task WSBroadcastMessageAsync(Message newMessage)
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
    }
}

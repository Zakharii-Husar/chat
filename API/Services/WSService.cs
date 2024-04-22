using API.Data;
using API.Hubs;
using API.Repos;
using Microsoft.AspNetCore.SignalR;
namespace API.Services
{

    public interface IWSService
    {
        public Task BroadcastMessageAsync(Message newMessage);
        public Task UpdateMessageAsync(Message newMessage);
        public Task MarkAsReadAsync(int chatId, AppUser user);
        public Task<List<string>> GetConnectionsByChatIdAsync(int chatId);
    }
    public class WSService(IHubContext<MainHub> hub, IWsConManService wsConManService, IChatMembersRepo chatMembersRepo) : IWSService
    {
        public async Task BroadcastMessageAsync(Message newMessage)
        {
            var recipients = await GetConnectionsByChatIdAsync(newMessage.ChatId);

            await hub.Clients.Clients(recipients).SendAsync("ReceiveNewMessage", newMessage.ToDTO());

        }

        public async Task UpdateMessageAsync(Message newMessage)
        {
            var recipients = await GetConnectionsByChatIdAsync(newMessage.ChatId);

            await hub.Clients.Clients(recipients).SendAsync("UpdateMessage", newMessage.ToDTO());

        }

        public async Task MarkAsReadAsync(int chatId, AppUser user)
        {
            var recipients = await GetConnectionsByChatIdAsync(chatId);
            await hub.Clients.Clients(recipients).SendAsync("MarkChatAsRead", new
            {
                chatId,
                username = user.ToDTO()
            });

        }

        public async Task<List<string>> GetConnectionsByChatIdAsync(int chatId)
        {
            var recipientsIds = await chatMembersRepo.GetMembersIdsAsync(chatId);
            var connections = new List<string>();
            foreach (var recipient in recipientsIds)
            {
                var connectionId = wsConManService.GetConnectionId(recipient);
                if (connectionId == null) continue;
                connections.Add(connectionId);
            }
            return connections;
        }
    }
}

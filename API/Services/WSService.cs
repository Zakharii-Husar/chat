using API.Data;
using API.Hubs;
using API.Repos;
using Microsoft.AspNetCore.SignalR;
namespace API.Services
{

    public interface IWSService
    {
        public Task BroadcastMessageAsync(Message newMessage, string currentUserId);
        public Task UpdateMessageAsync(Message newMessage, string currentUserId);
        public Task MarkAsReadAsync(int chatId, AppUser user);
        public Task<List<string>> GetConnectionsByChatIdAsync(int chatId);
        public bool IsUserOnline(string identityId);
    }
    public class WSService(IHubContext<MainHub> hub, IWsConManService wsConManService, IChatMembersRepo chatMembersRepo) : IWSService
    {
        public async Task BroadcastMessageAsync(Message newMessage, string currentUserId)
        {
            try 
            {
                var recipients = await GetConnectionsByChatIdAsync(newMessage.ChatId);
                var dto = newMessage.ToDTO(currentUserId);
                await hub.Clients.Clients(recipients).SendAsync("ReceiveNewMessage", dto);
            }
            catch
            {
                Console.WriteLine($"Broadcasting failed for message {newMessage.MessageId}. Message state: {Newtonsoft.Json.JsonConvert.SerializeObject(newMessage)}");
                throw;
            }
        }

        public async Task UpdateMessageAsync(Message newMessage, string currentUserId)
        {
            var recipients = await GetConnectionsByChatIdAsync(newMessage.ChatId);

            await hub.Clients.Clients(recipients).SendAsync("UpdateMessage", newMessage.ToDTO(currentUserId));

        }

        public async Task MarkAsReadAsync(int chatId, AppUser user)
        {
            var recipients = await GetConnectionsByChatIdAsync(chatId);
            await hub.Clients.Clients(recipients).SendAsync("MarkChatAsRead", new
            {
                chatId,
                user = user.ToDTO()
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

        public bool IsUserOnline(string identityId)
        {
            var connectionId = wsConManService.GetConnectionId(identityId);
            return connectionId != null;
        }
    }
}

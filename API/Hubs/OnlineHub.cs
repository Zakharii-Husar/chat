using Microsoft.AspNetCore.SignalR;

namespace API.Hubs
{
    public class OnlineHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}
using Microsoft.AspNetCore.SignalR;

namespace API.Hubs
{
    public class OnlineHub : Hub
    {
        public async Task SendMessage(string message)
        {
            await Clients.All.SendAsync("isOnline", message);
        }
    }
}
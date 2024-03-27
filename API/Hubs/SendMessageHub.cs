using API.Data;
using Microsoft.AspNetCore.SignalR;
using API.Models;


namespace API.Hubs
{
    public class SendMessageHub : Hub
    {

        //private readonly ILogger<JoinHub> _logger;

        //public JoinHub(ILogger<JoinHub> logger)
        //{
        //    _logger = logger;
        //}
        public async Task JoinChat(int groupId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupId.ToString());

        }

        public async Task ReceiveMessage(Message message)
        {
            await Clients.All.SendAsync("ReceiveMessage", message);
        }
    }
}

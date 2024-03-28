using API.Data;
using Microsoft.AspNetCore.SignalR;
using API.Models;


namespace API.Hubs
{
    public class MainHub : Hub
    {
        public async Task JoinChat(int groupId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupId.ToString());

        }

        public async Task LeaveChat(int groupId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupId.ToString());
        }


        public async Task ReceiveMessage(Message message)
        {
            await Clients.All.SendAsync("ReceiveMessage", message);
        }
    }
}

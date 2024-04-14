using Microsoft.AspNetCore.SignalR;

namespace API.Hubs
{
    public partial class MainHub
    {
        private async Task BroadcastTypingStatus(int groupId)
        {
            // Broadcast the list of typing users for the group to all participants(or empty list if no one is typing).
            await Clients
                .Group(groupId.ToString())
                .SendAsync("TypingUsers", _typingUsersByGroup
                .ContainsKey(groupId) ? _typingUsersByGroup[groupId] : []);
        }
    }
}

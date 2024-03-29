using API.Data;
using Microsoft.AspNetCore.SignalR;
using API.Models;
using System.Collections.Generic;
using System.Linq;

namespace API.Hubs
{
    public class MainHub : Hub
    {
        private readonly Dictionary<int, List<string>> _typingUsersByGroup = new Dictionary<int, List<string>>();

        public async Task JoinChat(int groupId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupId.ToString());

            // Create a new entry in the dictionary for the group if it doesn't exist
            if (!_typingUsersByGroup.ContainsKey(groupId))
            {
                _typingUsersByGroup[groupId] = new List<string>();
            }
        }

        public async Task LeaveChat(int groupId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupId.ToString());

            // Remove the entry from the dictionary if the group no longer has any users typing
            if (_typingUsersByGroup.ContainsKey(groupId) && _typingUsersByGroup[groupId].Count == 0)
            {
                _typingUsersByGroup.Remove(groupId);
            }
        }

        public async Task StartTyping(int groupId, string username)
        {
            // Add the user to the list of typing users for the group if not already present
            if (!_typingUsersByGroup.ContainsKey(groupId))
            {
                _typingUsersByGroup[groupId] = new List<string>();
            }

            if (!_typingUsersByGroup[groupId].Contains(username))
            {
                _typingUsersByGroup[groupId].Add(username);
            }

            await BroadcastTypingStatus(groupId);
        }

        public async Task StopTyping(int groupId, string username)
        {
            // Remove the user from the list of typing users for the group
            if (_typingUsersByGroup.ContainsKey(groupId))
            {
                _typingUsersByGroup[groupId].Remove(username);

                // Remove the entry from the dictionary if the group no longer has any users typing
                if (_typingUsersByGroup[groupId].Count == 0)
                {
                    _typingUsersByGroup.Remove(groupId);
                }
            }

            await BroadcastTypingStatus(groupId);
        }

        private async Task BroadcastTypingStatus(int groupId)
        {
            // Broadcast the list of typing users for the group to all clients
            await Clients.Group(groupId.ToString()).SendAsync("TypingUsers", _typingUsersByGroup.ContainsKey(groupId) ? _typingUsersByGroup[groupId] : new List<string>());
        }
    }
}


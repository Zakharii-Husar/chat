using API.Data;
using Microsoft.AspNetCore.SignalR;
using API.Models;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using API.Services;

namespace API.Hubs
{
    public class MainHub(IWSConManService conmanService) : Hub
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
            // Broadcast the list of typing users for the group to all participants(or empty list if no one is typing).
            await Clients.Group(groupId.ToString()).SendAsync("TypingUsers", _typingUsersByGroup.ContainsKey(groupId) ? _typingUsersByGroup[groupId] : new List<string>());
        }

        public async Task Connect()
        {
            var identityId = Context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var connectionId = Context.ConnectionId;

            await conmanService.AddConnectionAsync(identityId, connectionId);

            await Groups.AddToGroupAsync(Context.ConnectionId, "online");
        }

        public async Task Disconnect()
        {
            var identityId = Context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var connectionId = Context.ConnectionId;

            await conmanService.RemoveConnectionAsync(connectionId);

            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "online");

        }
    }
}


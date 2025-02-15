﻿using Microsoft.AspNetCore.SignalR;
using API.Services;
using API.Repos;
using System.Security.Claims;


namespace API.Hubs
{
    public partial class MainHub(IWsConManService wsConmanService, IUsersRepo usersRepo, IWSService wsService) : Hub
    {
        private readonly Dictionary<int, List<string>> _typingUsersByGroup = [];

        public async Task Connect()
        {
            var identityId = Context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var connectionId = Context.ConnectionId;

            await wsConmanService.AddConnectionAsync(identityId, connectionId);
            await Groups.AddToGroupAsync(Context.ConnectionId, "online");
        }

        public async Task Disconnect()
        {
            var connectionId = Context.ConnectionId;

            await wsConmanService.RemoveConnectionAsync(connectionId);

            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "online");

        }

        public async Task JoinChat(int groupId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupId.ToString());

            // Create a new entry in the dictionary for the group if it doesn't exist
            if (!_typingUsersByGroup.ContainsKey(groupId))
            {
                _typingUsersByGroup[groupId] = [];
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

        private async Task BroadcastTypingStatus(int groupId)
        {
            await Clients
                .Group(groupId.ToString())
                .SendAsync("TypingUsers", groupId, _typingUsersByGroup
                .ContainsKey(groupId) ? _typingUsersByGroup[groupId] : []);
        }

        public async Task StartTyping(int groupId, string username)
        {
            if (!_typingUsersByGroup.ContainsKey(groupId))
            {
                _typingUsersByGroup[groupId] = [];
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

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            var connectionId = Context.ConnectionId;
            var userId = Context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await usersRepo.GetUserByIdAsync(userId);
            
            if (user != null)
            {
                await wsService.HandleDisconnectAsync(connectionId, user);
            }
            
            await Groups.RemoveFromGroupAsync(connectionId, "online");
            await base.OnDisconnectedAsync(exception);
        }

    }

}


﻿using API.Data;
using API.Hubs;
using API.Repos;
using Microsoft.AspNetCore.SignalR;
using API.Models;
namespace API.Services
{

    public interface IWSService
    {
        public Task BroadcastMessageAsync(Message newMessage, string currentUserId);

        public Task BroadcastSysMessageAsync(Message newMessage, string currentUserId, string msgType, SysMessagePayload msgPayload);
        public Task UpdateMessageAsync(Message newMessage, string currentUserId);
        public Task MarkAsReadAsync(int chatId, AppUser user);
        public Task<List<string>> GetConnectionsByChatIdAsync(int chatId);
        public bool IsUserOnline(string identityId);
        public Task HandleDisconnectAsync(string connectionId, AppUser user);
    }
    public class WSService : IWSService
    {
        private readonly IHubContext<MainHub> hub;
        private readonly IWsConManService wsConManService;
        private readonly IChatMembersRepo chatMembersRepo;
        private readonly IUsersRepo usersRepo;

        public WSService(
            IHubContext<MainHub> hub,
            IWsConManService wsConManService,
            IChatMembersRepo chatMembersRepo,
            IUsersRepo usersRepo)
        {
            this.hub = hub;
            this.wsConManService = wsConManService;
            this.chatMembersRepo = chatMembersRepo;
            this.usersRepo = usersRepo;
        }

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

        public async Task BroadcastSysMessageAsync(Message newMessage, string currentUserId, string msgType, SysMessagePayload msgPayload)
        {
            var recipients = await GetConnectionsByChatIdAsync(newMessage.ChatId);
            var dto = newMessage.ToSysMsgDTO(currentUserId, msgType, msgPayload);
            await hub.Clients.Clients(recipients).SendAsync("ReceiveNewMessage", dto);
        }

        public async Task UpdateMessageAsync(Message newMessage, string currentUserId)
        {
            var recipients = await GetConnectionsByChatIdAsync(newMessage.ChatId);
            var dto = newMessage.ToDTO(currentUserId);
            await hub.Clients.Clients(recipients).SendAsync("UpdateMessage", dto);
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

        public async Task HandleDisconnectAsync(string connectionId, AppUser user)
        {
            try 
            {
                await wsConManService.RemoveConnectionAsync(connectionId);
                await usersRepo.UpdateLastSeenAsync(user);
            }
            catch (Exception ex)
            {
                // Log the error but don't rethrow since this is disconnect handling
                Console.WriteLine($"Error handling disconnect for user {user.UserName}: {ex.Message}");
            }
        }
    }
}

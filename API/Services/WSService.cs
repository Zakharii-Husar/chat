﻿using API.Data;
using API.Hubs;
using API.Repos;
using Microsoft.AspNetCore.SignalR;
namespace API.Services
{

    public interface IWSService
    {
        public Task BroadcastMessageAsync(Message newMessage);
        public Task UpdateMessageAsync(Message newMessage);
        public Task MarkAsReadAsync(int chatId, AppUser user);
    }
    public class WSService(IHubContext<MainHub> hub, IWsConManService wsConManService, IChatMembersRepo chatMembersRepo) : IWSService
    {
        public async Task BroadcastMessageAsync(Message newMessage)
        {
            var recipients = await chatMembersRepo.GetMembersIdsAsync(newMessage.ChatId);
            foreach (var recipient in recipients)
            {
                var connectionId = wsConManService.GetConnectionId(recipient);
                if (connectionId == null)
                {
                    continue;
                }
                await hub.Clients.Client(connectionId).SendAsync("ReceiveNewMessage", newMessage.ToDTO());
            }
        }

        public async Task UpdateMessageAsync(Message newMessage)
        {
            var recipients = await chatMembersRepo.GetMembersIdsAsync(newMessage.ChatId);
            foreach (var recipient in recipients)
            {
                var connectionId = wsConManService.GetConnectionId(recipient);
                if (connectionId == null)
                {
                    continue;
                }
                await hub.Clients.Client(connectionId).SendAsync("UpdateMessage", newMessage.ToDTO());
            }
        }

        public async Task MarkAsReadAsync(int chatId, AppUser user)
        {
            var recipients = await chatMembersRepo.GetMembersIdsAsync(chatId);
            foreach (var recipientId in recipients)
            {
                var connectionId = wsConManService.GetConnectionId(recipientId);
                if (connectionId == null || user.Id == recipientId)
                {
                    continue;
                }
                await hub.Clients.Client(connectionId).SendAsync("MarkChatAsRead", new
                {
                    chatId,
                    user.UserName
                });
            }
        }
    }
}
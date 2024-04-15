using API.Data;
using API.Hubs;
using API.Models;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;

namespace API.Services.ChatsService
{
    public partial class ChatsService
    {
        public async Task<bool> SendMsgAsync(
            int chatId,
            SendMessageModel model,
            string currentUserId)
        {
            bool isMember = await CheckMembershipByChatIdAsync(chatId, currentUserId);
            if (!isMember) return false;

            var newMessage = new Message
            {
                ChatId = chatId,
                Content = model.Content,
                RepliedTo = model.RepliedTo ?? null,
                SenderId = currentUserId
            };
            var result = await messagesRepo.InsertAsync(newMessage);
            if (result == null) return false;
            await WSBroadcastMessageAsync(result);
            wsConManService.PrintConnections();
            return true;
        }
    }
}

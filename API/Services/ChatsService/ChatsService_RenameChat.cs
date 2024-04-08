﻿using API.Data;
using API.Models;

namespace API.Services.ChatsService
{
    public partial class ChatsService
    {
        public async Task<bool> RenameChatAsync(RenameChatRequest payload, AppUser currentUser)
        {
            var member = await chatsRepo.GetChatMemberAsync(payload.ChatId, currentUser.Id);
            if (member == null) return false;
            var result = await chatsRepo.RenameChatAsync(payload);
            if (result == null) return false;

            var newMessage = new Message
            {
                ChatId = payload.ChatId,
                Content = currentUser.UserName + " renamed chat to " + payload.NewChatName,
                RepliedTo = null,
                SenderId = currentUser.Id!,
                IsAutogenerated = true
            };
            var inserted = await messagesRepo.InsertAsync(newMessage);
            if (inserted == null) return false;
            return true;
        }
    }
}
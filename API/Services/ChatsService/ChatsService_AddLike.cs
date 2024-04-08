using API.Models;
using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace API.Services.ChatsService
{
    public partial class ChatsService
    {
        public async Task<bool> AddLikeAsync(int messageId, string currentUserId)
        {

            var isAuthorizedToLike = await CheckMembershipByMsgIdAsync(messageId, currentUserId);
            if (!isAuthorizedToLike) return false;

            var existingLike = await messagesRepo.GetLikeAsync(messageId, currentUserId);
            if (existingLike != null) return true;

            var newLike = new Like
            {
                MessageId = messageId,
                UserId = currentUserId!
            };

            return await messagesRepo.AddLikeAsync(newLike);
        }
    }
}
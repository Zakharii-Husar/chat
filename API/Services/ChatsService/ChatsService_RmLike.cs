using API.Models;
using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace API.Services.ChatsService
{
    public partial class ChatsService
    {
        public async Task<bool> RmLikeAsync(int messageId, string currentUserId)
        {


            var existingLike = await messagesRepo.GetLikeAsync(messageId, currentUserId);
            if (existingLike == null) return true;

            return await messagesRepo.RmLikeAsync(existingLike);
        }
    }
}

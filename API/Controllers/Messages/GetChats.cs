﻿using API.Data;
using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers.Messages
{
    [Route("chat-api/[controller]")]
    [ApiController]
    public class GetChats(AppDbContext dbContext, UserManager<AppUser> userManager) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var currentUser = await userManager.GetUserAsync(User);
            var currentUserId = currentUser?.Id;
            var allChatsIds = await dbContext.ChatMembers
                .Where(cm => cm.MemberId == currentUserId)
                .Select(chat => chat.ChatId)
                .Distinct()
                .ToListAsync();

            var latestMessages = await dbContext.Messages
                .Include(m => m.Chat)
                .Include(m => m.Likes)
                .Where(m => allChatsIds.Contains(m.ChatId))
                .GroupBy(m => m.ChatId)
                .Select(g => g.OrderByDescending(m => m.SentAt).FirstOrDefault())
                .ToListAsync();

            var chats = latestMessages
                .Select(m => new MessageDto()
                {
                    MessageId = m.MessageId,
                    SenderId = m.SenderId,
                    SenderUserName = m.Sender?.UserName ?? "Unknown",
                    ChatId = m.ChatId,
                    ChatName = m.Chat?.ChatName ?? m.Sender?.UserName ?? "Unknown",
                    Content = !m.IsDeleted ? m.Content : "Deleted",
                    SentAt = m.SentAt,
                    Likes = m.Likes?.Select(like => like.User?.UserName).ToList() ?? new List<string?>()
                })
                .ToList();

            return Ok(chats);


        }
    }
}
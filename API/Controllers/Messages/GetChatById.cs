﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers.Messages
{
    [Route("chat-api/[controller]")]
    [ApiController]
    public class GetChatById(AppDbContext dbContext, UserManager<AppUser> userManager) : ControllerBase
    {
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Get([FromQuery] int chatId)
        {
            var currentUser = await userManager.GetUserAsync(User);
            var currentUserId = currentUser?.Id;

            var chatName = await dbContext.Chats
                .Where(chat => chat.ChatId == chatId)
                .Select(chat => chat.ChatName)
                .FirstOrDefaultAsync();

            var members = await dbContext.ChatMembers
                .Where(member => member.ChatId == chatId)
                .Where(member => member.LeftChat == null)
                .Select(member => new { member.Member.UserName, member.MemberId })
                .ToListAsync();

            var currentMember = await dbContext.ChatMembers
                .Where(member => member.MemberId == currentUserId && member.ChatId == chatId)
                .Select(member => member)
                .FirstOrDefaultAsync();

            var messagesQuery = dbContext.Messages
                .Where(message => message.ChatId == chatId)
                //making sure user gets only the messages sent after he joined chat
                .Where(message => message.SentAt > currentMember.EnteredChat);

            //making sure user gets only messages sent before he left chat
            if (currentMember?.LeftChat != null)
            {
                messagesQuery = messagesQuery
                    .Where(message => message.SentAt < currentMember.LeftChat);
            }

            var messages = await messagesQuery
                .Select(m => new MessageDto
                {
                    MessageId = m.MessageId,
                    SenderId = m.SenderId,
                    SenderUserName = m.Sender.UserName,
                    ChatId = m.ChatId,
                    ChatName = m.Chat.ChatName,
                    Content = !m.IsDeleted ? m.Content : m.Sender.UserName + " deleted message.",
                    SentAt = m.SentAt,
                    Likes = m.Likes.Select(like => like.User.UserName).ToList()
                })
                .ToListAsync();

            Console.WriteLine(currentMember);
            Console.WriteLine(messages);


            return Ok(new
            {
                id = chatId,
                chatName,
                members,
                messages
            });


        }

    }
}


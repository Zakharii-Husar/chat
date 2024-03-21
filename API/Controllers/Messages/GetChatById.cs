using Microsoft.AspNetCore.Mvc;
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
        public async Task<IActionResult> Get([FromQuery] int chatId, int paginationOffset)
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
                .Select(member => new { member.Member.UserName, member.MemberId, member.IsCreator })
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

            // Sort the messages by Time
            messagesQuery = messagesQuery.OrderByDescending(message => message.SentAt);

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

            // Calculate the number of messages to skip based on paginationOffset
            const int paginationStep = 5;
            var messagesLeft = messages.Count - paginationOffset;
            var messagesToTake = messagesLeft < paginationStep ? messagesLeft : paginationStep;

            var paginatedMessages = messages
                .Skip(paginationOffset)
                .Take(messagesToTake)
                .OrderBy(m => m.SentAt);



            return Ok(new
            {
                chatId,
                chatName,
                members,
                messages = paginatedMessages,
                paginationOffset = paginationOffset + paginationStep,
                hasMoreMessages = messagesLeft > paginationStep
            });


        }

    }
}


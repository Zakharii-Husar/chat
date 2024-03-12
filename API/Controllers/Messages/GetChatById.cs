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
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Get([FromBody] int chatId)
        {
            var currentUser = await userManager.GetUserAsync(User);
            var currentUserId = currentUser?.Id;

            var chatName = await dbContext.Chats
                .Where(chat => chat.ChatId == chatId)
                .Select(chat => chat.ChatName)
                .FirstOrDefaultAsync();

            var membersNames = await dbContext.ChatMembers
                .Where(member => member.ChatId == chatId)
                .Select(member => member.Member.UserName)
                .ToListAsync();


            var messages = await dbContext.Messages
                .Where(message => message.ChatId == chatId)
                .Select(m => new MessageDto()
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

            return Ok(new
            {
                id = chatId,
                chatName,
                membersNicknames = membersNames,
                messages
            });


        }

    }
}


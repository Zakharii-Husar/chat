using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers.Messages
{
    [Authorize]
    [Route("chat-api/[controller]")]
    [ApiController]
    public class SendMessage(AppDbContext dbContext, UserManager<AppUser> userManager) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] SendMessageModel messageModel)
        {
            var currentUser = await userManager.GetUserAsync(User);
            var senderId = currentUser?.Id;
            var isValidChatId = await dbContext.Chats
                .AnyAsync(chat => chat.ChatId == messageModel.ChatId);

            Console.WriteLine("Running \n");

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (currentUser == null)
            {
                return Unauthorized();

            }

            var newMessage = new Message
            {
                ChatId = messageModel.ChatId,
                Content = messageModel.Content,
                RepliedTo = messageModel.RepliedTo ?? null,
                SenderId = senderId!
            };


            dbContext.Messages.Add(newMessage);
            await dbContext.SaveChangesAsync();

            return Ok(newMessage);
        }
    }
}


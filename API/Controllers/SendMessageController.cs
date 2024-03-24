using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    [Route("chat-api/[controller]")]
    [ApiController]
    public class SendMessageController(AppDbContext dbContext, UserManager<AppUser> userManager) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] SendMessageModel messageModel)
        {
            var currentUser = await userManager.GetUserAsync(User);
            var senderId = currentUser?.Id;


            var isValidChatMember = await dbContext.ChatMembers
                .Where(member => member.MemberId == senderId && member.ChatId == messageModel.ChatId)
                .Where(member => member.LeftChat == null)
                .AnyAsync();

            if (!isValidChatMember) return Unauthorized();


            if (!ModelState.IsValid) return BadRequest(ModelState);

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


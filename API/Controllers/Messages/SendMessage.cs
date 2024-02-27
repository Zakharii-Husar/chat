using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Identity;

namespace API.Controllers.Messages
{
    [Route("chat-api/[controller]")]
    [ApiController]
    public class SendMessage(AppDbContext dbContext, UserManager<AppUser> userManager) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] SendMessageModel messageModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var currentUser = await userManager.GetUserAsync(User);
            if (currentUser == null)
            {
                return Unauthorized();
            }

            var senderId = currentUser.Id;

            var newMessage = new Message
            {
                SenderId = senderId,
                //ReceiverId = messageModel.ReceiverId,
                Content = messageModel.Content,
                RepliedTo = messageModel.RepliedTo
            };


            dbContext.Messages.Add(newMessage);
            await dbContext.SaveChangesAsync();

            return Ok(newMessage);
        }
    }
}


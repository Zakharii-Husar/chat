using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Models;
using API.Hubs;
using API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.SignalR;

namespace API.Controllers
{
    [Authorize]
    [Route("chat-api/[controller]")]
    [ApiController]
    public class SendMessageController(
        AppDbContext dbContext,
        UserManager<AppUser> userManager,
        IHubContext<MainHub> hub,
        IWsConManService conmanService)
        : ControllerBase
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

            // conmanService.PrintConnections();

            var allRecipients = await dbContext.ChatMembers
                .Where(member => member.ChatId == messageModel.ChatId)
                .Select(member => member.MemberId)
                .ToListAsync();

            //await conmanService.BroadcastMessage(newMessage, allRecipients);


            return Ok(newMessage);
        }
    }
}


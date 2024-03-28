using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Models;
using API.Hubs;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.SignalR;

namespace API.Controllers
{
    [Authorize]
    [Route("chat-api/[controller]")]
    [ApiController]
    public class SendMessageController : ControllerBase
    {
        private readonly AppDbContext _dbContext;
        private readonly UserManager<AppUser> _userManager;
        private IHubContext<MainHub> _hub;

        public SendMessageController(AppDbContext dbContext, UserManager<AppUser> userManager, IHubContext<MainHub> hub)
        {
            _dbContext = dbContext;
            _userManager = userManager;
            _hub = hub;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] SendMessageModel messageModel)
        {
            var currentUser = await _userManager.GetUserAsync(User);
            var senderId = currentUser?.Id;


            var isValidChatMember = await _dbContext.ChatMembers
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


            _dbContext.Messages.Add(newMessage);
            await _dbContext.SaveChangesAsync();

            await _hub.Clients.Group(messageModel.ChatId.ToString())
                .SendAsync("ReceiveMessage", newMessage);

            //await _hub.Clients.All.SendAsync("ReceiveMessage", newMessage);

            return Ok(newMessage);
        }
    }
}


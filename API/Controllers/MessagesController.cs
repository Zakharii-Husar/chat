using API.Data;
using API.Hubs;
using API.Models;
using API.Services;
using API.Services.MessagesService;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace API.Controllers
{
    [Route("chat-api/[controller]")]
    [ApiController]
    public class MessagesController(
        UserManager<AppUser> userManager,
        IHubContext<MainHub> hub,
        IChatsService chatsService,
        IMessagesService messagesService,
        IWsConManService conmanService) : ControllerBase
    {
        [HttpPost("Send")]
        public async Task<IActionResult> Send([FromBody] SendMessageModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var currentUser = await userManager.GetUserAsync(User);
            var participantsIds = await chatsService.GetMembersIdsAsync(model.ChatId);
            if (!participantsIds.Contains(currentUser!.Id)) return Unauthorized();
            var insertedMessage = await messagesService.InsertAsync(model, currentUser.Id);
            if (insertedMessage == null) return StatusCode(500);
            await conmanService.BroadcastMessage(insertedMessage, participantsIds);
            conmanService.PrintConnections();
            return Ok();
        }

        [HttpPost("{messageId}/AddLike")]
        public async Task<IActionResult> AddLike(int messageId)
        {
            var currentUser = await userManager.GetUserAsync(User);
            if (currentUser == null) return Unauthorized();
            var isMember = await chatsService.CheckMembershipAsync(messageId, currentUser.Id);
            if (!isMember) return Unauthorized();
            var result = await messagesService.AddLike(messageId, currentUser.Id);
            if (!result) return BadRequest();
            return Ok();
        }

        [HttpDelete("{messageId}/RmLike")]
        public async Task<IActionResult> RmLike(int messageId)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var currentUser = await userManager.GetUserAsync(User);
            var participantsIds = await chatsService.GetMembersIdsAsync(model.ChatId);
            if (!participantsIds.Contains(currentUser!.Id)) return Unauthorized();
            var insertedMessage = await messagesService.InsertAsync(model, currentUser.Id);
            if (insertedMessage == null) return StatusCode(500);
            await conmanService.BroadcastMessage(insertedMessage, participantsIds);
            conmanService.PrintConnections();
            return Ok();
        }

        [HttpPatch("{messageId}/MarkAsDeleted")]
        public async Task<IActionResult> MarkAsDeleted(int messageId)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var currentUser = await userManager.GetUserAsync(User);
            var participantsIds = await chatsService.GetMembersIdsAsync(model.ChatId);
            if (!participantsIds.Contains(currentUser!.Id)) return Unauthorized();
            var insertedMessage = await messagesService.InsertAsync(model, currentUser.Id);
            if (insertedMessage == null) return StatusCode(500);
            await conmanService.BroadcastMessage(insertedMessage, participantsIds);
            conmanService.PrintConnections();
            return Ok();
        }
    }
}
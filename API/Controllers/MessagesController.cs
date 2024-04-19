using API.Data;
using API.Hubs;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace API.Controllers
{
    [Route("chat-api/Chats/{ChatId}/[controller]")]
    [ApiController]
    public class MessagesController(
        UserManager<AppUser> userManager,
        IChatMembershipService chatMembershipService,
        IMessageService messageService,
        IWSService WSService) : ControllerBase
    {
        [Authorize]
        [HttpPost("Send")]
        public async Task<IActionResult> Send(int ChatId, [FromBody] SendMessageModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var currentUser = await userManager.GetUserAsync(User);
            var membershipStatus = await chatMembershipService.GetMemberByChatIdAsync(ChatId, currentUser.Id);
            if (membershipStatus == null || membershipStatus.LeftChat != null) return Unauthorized();
            var result = await messageService.SendMsgAsync(ChatId, model, currentUser!.Id);
            if (result == null) return StatusCode(500);
            await WSService.BroadcastMessageAsync(result);
            return Ok();
        }

        [HttpPost("{MessageId}/AddLike")]
        public async Task<IActionResult> AddLike(int MessageId)
        {
            var currentUser = await userManager.GetUserAsync(User);
            var membershipStatus = await chatMembershipService.GetMemberByMsgIdAsync(MessageId, currentUser.Id);
            if (membershipStatus == null || membershipStatus.LeftChat != null) return Unauthorized();
            var result = await messageService.AddLikeAsync(MessageId, currentUser.Id);
            if (!result) return StatusCode(500);
            var modifiedMsg = await messageService.GetMsgByIdAsync(MessageId);
            if (modifiedMsg != null) await WSService.UpdateMessageAsync(modifiedMsg);
            return Ok();
        }

        [HttpDelete("{MessageId}/RmLike")]
        public async Task<IActionResult> RmLike(int MessageId)
        {
            var currentUser = await userManager.GetUserAsync(User);
            var membershipStatus = await chatMembershipService.GetMemberByMsgIdAsync(MessageId, currentUser.Id);
            if (membershipStatus == null || membershipStatus.LeftChat != null) return Unauthorized();
            var result = await messageService.RmLikeAsync(MessageId, currentUser.Id);
            if (!result) return StatusCode(500);
            var modifiedMsg = await messageService.GetMsgByIdAsync(MessageId);
            if (modifiedMsg != null) await WSService.UpdateMessageAsync(modifiedMsg);
            return Ok();
        }

        [Authorize]
        [HttpPatch("{MessageId}/MarkAsDeleted")]
        public async Task<IActionResult> MarkAsDeleted(int MessageId)
        {
            var currentUser = await userManager.GetUserAsync(User);
            var msg = await messageService.GetMsgByIdAsync(MessageId);
            if (msg == null) return BadRequest();
            if (msg.SenderId != currentUser.Id) return Unauthorized();
            var result = await messageService.MarkMsgAsDelAsync(msg);
            if (result) await WSService.UpdateMessageAsync(msg);
            return Ok();
        }
    }
}
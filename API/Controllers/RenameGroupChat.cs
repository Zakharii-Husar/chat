using API.Data;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    [Route("chat-api/[controller]")]
    [ApiController]
    public class RenameGroupChat(AppDbContext dbContext, UserManager<AppUser> userManager) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] RenameChatRequest payload)
        {
            if (!ModelState.IsValid) return BadRequest("Invalid model for creating group chat");

            var currentUserId = (await userManager.GetUserAsync(User)).Id;

            var chatToUpdate = await dbContext.Chats
                .FirstOrDefaultAsync(chat =>
                    chat.ChatId == payload.ChatId &&
                    chat.ChatMembers.Any(member =>
                        member.MemberId == currentUserId &&
                        member.LeftChat == null));

            if (chatToUpdate == null) return Unauthorized("Only valid chat members can change chat name");

            chatToUpdate.ChatName = payload.NewChatName;
            await dbContext.SaveChangesAsync();

            return Ok();

        }
    }
}

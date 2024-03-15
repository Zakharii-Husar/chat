using API.Data;
using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("chat-api/[controller]")]
    [ApiController]
    public class RemoveChatMember(AppDbContext dbContext, UserManager<AppUser> userManager) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] EditMembershipRequest request)
        {
            var currentUser = await userManager.GetUserAsync(User);
            var currentUserId = currentUser?.Id;

            var memberToRemove = await dbContext.ChatMembers
                .Where(member => member.MemberId == request.UserId)
                .Where(member => member.ChatId == request.ChatId)
                .FirstOrDefaultAsync();

            if (memberToRemove == null) return BadRequest("Member doesn't exists.");
            if (memberToRemove.LeftChat != null) return BadRequest("Member already left.");

            var isChatAdmin = await dbContext.ChatMembers
                .Where(member => member.ChatId == request.ChatId)
                .Where(member => member.MemberId == currentUserId)
                .Select(member => member.IsCreator)
                .FirstOrDefaultAsync();

            if (!isChatAdmin && memberToRemove.MemberId != currentUserId)
                return Unauthorized("You can remove only yourself if you're not admin.");

            memberToRemove.LeftChat = DateTime.UtcNow;
            dbContext.ChatMembers.Update(memberToRemove);
            await dbContext.SaveChangesAsync();

            return Ok();

        }
    }
}


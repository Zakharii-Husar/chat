using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddChatMember(AppDbContext dbContext, UserManager<AppUser> userManager) : ControllerBase
    {

        [HttpPost]
        public async Task<IActionResult> Get([FromBody] EditMembershipRequest request)
        {
            var currentUser = await userManager.GetUserAsync(User);
            var currentUserId = currentUser?.Id;

            var userExists = await dbContext.Users
                .AnyAsync(User => User.Id == currentUserId);
            if (!userExists) return BadRequest("Invalid user to insert.");

            var isChatAdmin = await dbContext.ChatMembers
                .Where(member => member.ChatId == request.ChatId)
                .Where(member => member.MemberId == currentUserId)
                .Select(member => member.IsCreator)
                .FirstOrDefaultAsync();

            if (!isChatAdmin) return Unauthorized("Only chat admin can add participants.");

            var memberExists = await dbContext.ChatMembers
                .AnyAsync(member => member.MemberId == request.UserId);
            if (!memberExists) return BadRequest("Member already exists.");


            var member = new ChatMember()
            {
                ChatId = request.ChatId,
                MemberId = request.UserId
            };

            dbContext.ChatMembers.Add(member);
            await dbContext.SaveChangesAsync();
            return Ok(isChatAdmin);
        }
    }
}

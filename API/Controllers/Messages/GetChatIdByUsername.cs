using API.Data;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers.Messages
{
    [Authorize]
    [Route("chat-api/[controller]")]
    [ApiController]

    public class GetChatIdByUsername(AppDbContext dbContext, UserManager<AppUser> userManager) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] string userName)
        {
            var currentUser = await userManager.GetUserAsync(User);
            var recipient = userManager.FindByNameAsync(userName);
            if (recipient.Result == null) return NotFound();

            var chatId = await dbContext.Chats
                .Where(chat => chat.IsGroupChat == false)
                .Where(chat => chat.ChatMembers.Any(cm => cm.MemberId == currentUser!.Id) &&
                               chat.ChatMembers.Any(cm => cm.Member.UserName == userName))
                .Select(chat => chat.ChatId)
                .FirstOrDefaultAsync();
            //chat exists; return id
            if (chatId != 0) return Ok(chatId);

            //chat doesn't exist; create;
            var newChat = new Chat
            {
                ChatName = null,
                IsGroupChat = false
            };

            dbContext.Chats.Add(newChat);
            await dbContext.SaveChangesAsync();

            var newChatId = newChat.ChatId;

            //insert members
            var member1 = new ChatMember()
            {
                ChatId = newChatId,
                MemberId = currentUser!.Id,
                IsCreator = false
            };

            var member2 = new ChatMember()
            {
                ChatId = newChatId,
                MemberId = recipient.Result.Id,
                IsCreator = false
            };


            dbContext.ChatMembers.Add(member1);
            dbContext.ChatMembers.Add(member2);
            await dbContext.SaveChangesAsync();

            return Ok(newChatId);

        }
    }
}

using API.Data;
using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers.Messages
{
    [Route("chat-api/[controller]")]
    [ApiController]
    public class AddChat(AppDbContext dbContext, UserManager<AppUser> userManager) : ControllerBase
    {

        [HttpPost]
        public async Task<IActionResult> Get([FromBody] List<string> participantUserIds)
        {
            List<string> myList =
[
    "c0a993a4-72fa-4327-b836-23e40d5f8426",
    "d5d9c727-6e7b-4805-a8e7-a8282ec16483",
    "e06c412a-7cf4-40aa-8b6a-d2a6613c9fd1"
];


            //VALIDATE PARTICIPANTS ARRAY IDS:
            if (participantUserIds.Count is < 2 or > 30)
            {
                return BadRequest("Invalid participant count. Must be between 2 and 30.");
            }

            foreach (var userId in participantUserIds)
            {
                var user = await userManager.FindByIdAsync(userId);

                if (user == null)
                {
                    return BadRequest($"Invalid user ID: {userId}");
                }
            }



            try
            {
                //CHECK IF CHAT WITH GIVEN USERS EXISTS:

                //query ChatMembers table
                //has to return possible chats ids only
                var matchingChatsIds = await dbContext.ChatMembers
                    .Where(cm => participantUserIds.Contains(cm.MemberId))
                    .GroupBy(cm => cm.ChatId)
                    .Select(chat => chat.Key)
                    .ToListAsync();
                //query Chats table
                //has to find the chat id that all participants have in common or null
                var exactMatch = await dbContext.Chats
                    .Where(c => matchingChatsIds.Contains(c.ChatId))
                    .Where(c => c.ChatMembers.Count() == participantUserIds.Count)
                    .Where(c => c.ChatMembers.All(m => participantUserIds.Contains(m.MemberId)))
                    .Select(c => c.ChatId)
                    .FirstOrDefaultAsync();

                //CREATE A NEW CHAT:

                if (exactMatch != 0) return Ok(exactMatch);

                var newChat = new Chat
                {
                    ChatName = "Example Chat"
                };

                dbContext.Chats.Add(newChat);
                await dbContext.SaveChangesAsync();

                var chatId = newChat.ChatId;
                var userIdentity = User?.Identity?.IsAuthenticated;

                // Insert Participants
                var members = participantUserIds.Select(userId => new ChatMember()
                {
                    ChatId = chatId,
                    MemberId = userId,
                    IsCreator = userIdentity ?? false
                });

                dbContext.ChatMembers.AddRange(members);
                await dbContext.SaveChangesAsync();

                return Ok(chatId);

            }
            catch (Exception e)
            {
                // Log or return the details of the inner exception
                var errorMessage = $"An error occurred: {e.Message}";

                if (e.InnerException != null)
                {
                    errorMessage += $"\nInner Exception: {e.InnerException.Message}";
                }

                return BadRequest(errorMessage);
            }
        }
    }
}
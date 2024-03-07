using API.Data;
using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;


namespace API.Controllers.Messages
{
    [Authorize]
    [Route("chat-api/[controller]")]
    [ApiController]
    public class GetChatIdOrCreate(AppDbContext dbContext, UserManager<AppUser> userManager) : ControllerBase
    {

        [HttpPost]
        public async Task<IActionResult> Get([FromBody] List<string> participantUserIds)
        {
            List<string> myList =
[
    "b5478f7f-7478-4e72-81ea-788916ab2294",
    "dd175fb3-b059-4d4d-90d6-eb9f988ad13b",
    "799b0730-84d4-4e9a-af9d-38c17a817a99"
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

                //CHAT DOESN'T EXIST CREATE A NEW CHAT:

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
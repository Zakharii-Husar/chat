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
        public async Task<IActionResult> Get([FromBody] NewChatModel payload)
        {
            var participantUserIds = payload.ParticipantUserIds;
            var chatName = payload.ChatName;
            switch (participantUserIds.Count)
            {
                //validate participants list ids:
                case < 1 or > 30:
                    return BadRequest("Invalid participant count. Must be between 1 and 30.");
                //validate chat name
                case > 2 when chatName?.Length < 4:
                    return BadRequest("Invalid group chat name.");
            }

            //check sure there are no duplicates
            var participants = participantUserIds.Distinct().ToList();

            //check Ids are valid
            foreach (var userId in participants)
            {
                var user = await userManager.FindByIdAsync(userId);

                if (user == null)
                {
                    return BadRequest($"Invalid user ID: {userId}");
                }
            }

            //adding sender to participants
            var currentUserId = (await userManager.GetUserAsync(User)).Id;
            if (currentUserId != null) participants.Add(currentUserId);



            try
            {
                //CHECK IF CHAT WITH GIVEN USERS EXISTS:

                //query ChatMembers table
                //has to return possible chats ids only
                var matchingChatsIds = await dbContext.ChatMembers
                    .Where(cm => participants.Contains(cm.MemberId))
                    .GroupBy(cm => cm.ChatId)
                    .Select(chat => chat.Key)
                    .ToListAsync();
                //query Chats table
                //has to find the chat id that all participants have in common or null
                var exactMatch = await dbContext.Chats
                    .Where(c => matchingChatsIds.Contains(c.ChatId))
                    .Where(c => c.ChatMembers.Count() == participants.Count)
                    .Where(c => c.ChatMembers.All(m => participants.Contains(m.MemberId)))
                    .Select(c => c.ChatId)
                    .FirstOrDefaultAsync();

                if (exactMatch != 0) return Ok(exactMatch);

                //CHAT DOESN'T EXIST CREATE A NEW CHAT:
                var newChat = new Chat
                {
                    ChatName = participants.Count > 2 ? chatName : null
                };

                dbContext.Chats.Add(newChat);
                await dbContext.SaveChangesAsync();

                var chatId = newChat.ChatId;
                var userIdentity = User?.Identity?.IsAuthenticated;

                // Insert Participants
                var members = participants.Select(userId => new ChatMember()
                {
                    ChatId = chatId,
                    MemberId = userId,
                    IsCreator = userId == currentUserId ? true : false
                });

                dbContext.ChatMembers.AddRange(members);
                await dbContext.SaveChangesAsync();

                var currentUsername = (await userManager.FindByIdAsync(currentUserId!))?.UserName;

                if (participants.Count == 2) return Ok(chatId);

                var newMessage = new Message
                {
                    ChatId = chatId,
                    Content = currentUsername + " created chat.",
                    RepliedTo = null,
                    SenderId = currentUserId!
                };


                dbContext.Messages.Add(newMessage);
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
using API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers.Messages
{
    [Route("chat-api/[controller]")]
    [ApiController]
    public class AddChat(AppDbContext dbContext) : ControllerBase
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


            try
            {
                //QUERY MEMBERS TABLE
                //QUERY MEMBERS TABLE
                //HAS TO RETURN ONLY POSSIBLE CHATS IDS
                var matchingChatsIds = await dbContext.ChatMembers
                    .Where(cm => participantUserIds.Contains(cm.MemberId))
                    .GroupBy(cm => cm.ChatId)
                    .Select(chat => chat.Key)
                    .ToListAsync();

                //QUERY CHATS TABLE
                //HAS TO FIND THE CHAT ID THAT ALL PARTICIPANTS HAVE IN COMMON OR NULL
                var exactMatch = await dbContext.Chats
                    .Where(c => matchingChatsIds.Contains(c.ChatId))
                    .Where(c => c.ChatMembers.Count() == participantUserIds.Count)
                    .Where(c => c.ChatMembers.All(m => participantUserIds.Contains(m.MemberId)))
                    .Select(c => c.ChatId)
                    .FirstOrDefaultAsync();





                return Ok(exactMatch);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}


// Chat doesn't exist, create a new chat
//var chat = new Chat
//{
//    CreatedAt = DateTime.Now
//    // Other chat-related attributes
//};

//dbContext.Chats.Add(chat);
//await dbContext.SaveChangesAsync();

//// Retrieve ChatId
//var chatId = chat.Id;

//// Insert Participants
//var participants = participantUserIds.Select(userId => new Participant
//{
//    MessageId = chatId,
//    UserId = userId,
//    IsCreator = userId == creatorUserId
//});

//dbContext.Participants.AddRange(participants);
//await dbContext.SaveChangesAsync();

//return chatId;
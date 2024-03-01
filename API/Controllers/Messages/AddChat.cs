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
    "19703815-90cd-4de8-8017-f9ec56695e41",
    //"e0083f0d-b1d6-4964-bbc3-e429284e9f59",
    "f965e7f6-7dca-4824-8083-aef165d5330c",
    "sd"
];


            try
            {
                var matchingChatIds = await dbContext.ChatMembers
    .Where(cm => myList.Contains(cm.MemberId))
    .GroupBy(cm => cm.MemberId)
    .Where(group => group.Select(cm => cm.ChatId).Distinct().Count() == 1)
    .Select(group => group.First().ChatId)
    .FirstOrDefaultAsync();

                // If matchingChatIds is null, it means the conditions were not met.
                // Otherwise, it contains the common chat ID.


                if (matchingChatIds != null)
                {
                    return Ok(matchingChatIds);
                }
                else
                {
                    return NotFound();
                }
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
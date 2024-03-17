﻿using API.Data;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Messages
{
    [Authorize]
    [Route("chat-api/[controller]")]
    [ApiController]
    public class CreateGroupChat(AppDbContext dbContext, UserManager<AppUser> userManager) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] NewChatModel payload)
        {
            var participantUserIds = payload.ParticipantUserIds;
            var chatName = payload.ChatName;

            if (!ModelState.IsValid) return BadRequest("Invalid model for creating group chat");


            //adding creator to participants
            var currentUserId = (await userManager.GetUserAsync(User)).Id;
            if (currentUserId != null) participantUserIds.Add(currentUserId);

            //make sure there are no duplicates
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

            //CREATING GROUP CHAT
            try
            {

                var newChat = new Chat
                {
                    ChatName = chatName,
                    IsGroupChat = true
                };

                dbContext.Chats.Add(newChat);
                await dbContext.SaveChangesAsync();

                var newChatId = newChat.ChatId;
                var userIdentity = User?.Identity?.IsAuthenticated;

                // Insert Participants
                var members = participants.Select(userId => new ChatMember()
                {
                    ChatId = newChatId,
                    MemberId = userId,
                    IsCreator = userId == currentUserId ? true : false
                });

                dbContext.ChatMembers.AddRange(members);
                await dbContext.SaveChangesAsync();

                var currentUsername = (await userManager.FindByIdAsync(currentUserId!))?.UserName;

                var newMessage = new Message
                {
                    ChatId = newChatId,
                    Content = currentUsername + " created chat.",
                    RepliedTo = null,
                    SenderId = currentUserId!,
                    IsAutogenerated = true
                };


                dbContext.Messages.Add(newMessage);
                await dbContext.SaveChangesAsync();

                return Ok(newChatId);

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

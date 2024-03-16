﻿using API.Data;
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

            var chatId = await dbContext.Chats
                .Where(chat => chat.IsGroupChat == false)
                .Where(chat => chat.ChatMembers.Any(cm => cm.MemberId == currentUser.Id) &&
                               chat.ChatMembers.Any(cm => cm.Member.UserName == userName))
                .Select(chat => chat.ChatId)
                .FirstOrDefaultAsync();

            return Ok(chatId);
        }
    }
}

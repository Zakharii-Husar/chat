using API.Models;
using API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    [Route("chat-api/[controller]")]
    [ApiController]
    public class AddChatMemberController(UserManager<AppUser> userManager, IAddChatMemberService service) : ControllerBase
    {

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] EditMembershipRequest request)
        {
            var currentUser = await userManager.GetUserAsync(User);

            var isChatCreator = await service.IsAuthorizedToAdd(currentUser!, request.ChatId);
            if (!isChatCreator) return Unauthorized("You're not allowed to add members. Only chat creator can do that.");

            var isValidUser = await service.ValidateNewMember(request.UserId);
            if (!isValidUser) return BadRequest("You are trying to add invalid user to chat.");

            var memberExists = await service.MemberAlreadyExists(request);
            if (memberExists) return BadRequest("User already added to this chat.");

            var memberAdded = await service.AddNewMember(request, currentUser!);
            if (!memberAdded) return StatusCode(500, "An error occurred while processing the request.");

            var notification = await service.GenerateNotification(currentUser, request);

            return Ok(notification);
        }
    }
}

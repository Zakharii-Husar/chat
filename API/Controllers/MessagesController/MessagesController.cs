using API.Data;
using API.Hubs;
using API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace API.Controllers.MessagesController
{
    [Route("chat-api/Chats/{ChatId}/[controller]")]
    [ApiController]
    public partial class MessagesController(
        UserManager<AppUser> userManager,
        IChatsService chatsService) : ControllerBase;
}
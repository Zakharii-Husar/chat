using API.Data;
using API.Hubs;
using API.Models;
using API.Services;
using API.Services.ChatsService;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace API.Controllers.MessagesController
{
    [Route("chat-api/Chats/{ChatId}/[controller]")]
    [ApiController]
    public partial class MessagesController(
        UserManager<AppUser> userManager,
        IHubContext<MainHub> hub,
        IChatsService chatsService,
        IWsConManService conmanService) : ControllerBase;
}
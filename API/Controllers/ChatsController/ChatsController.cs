using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Services.ChatsService;

namespace API.Controllers.ChatsController
{
    [Route("chat-api/[controller]")]
    [ApiController]

    public partial class ChatsController(
        UserManager<AppUser> userManager,
        IChatsService chatsService) : ControllerBase;
}

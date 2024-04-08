using API.Data;
using API.Services.UsersService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.UsersController
{
    [Route("chat-api/[controller]")]
    [ApiController]
    [Authorize]
    public partial class UsersController(
        UserManager<AppUser> userManager,
        IUsersService usersService,
        IWebHostEnvironment hostingEnvironment) : ControllerBase;
}

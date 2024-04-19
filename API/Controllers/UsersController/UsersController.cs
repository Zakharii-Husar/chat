using API.Data;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.UsersController
{
    [ApiController]
    [Route("chat-api/[controller]")]
    public partial class UsersController(
        UserManager<AppUser> userManager,
        IUsersService usersService,
        IWebHostEnvironment hostingEnvironment) : ControllerBase;
}

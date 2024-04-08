using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.UsersController
{
    public partial class UsersController
    {
        [HttpGet]
        public async Task<IActionResult> GetAllUsers(int itemsToSkip = 0, int itemsToTake = 10)
        {
            var currentUser = await userManager.GetUserAsync(User);
            if (currentUser == null) return Unauthorized();
            var users = await usersService.GetAllUsers(currentUser.Id, itemsToSkip, itemsToTake);
            return Ok(users);
        }
    }
}

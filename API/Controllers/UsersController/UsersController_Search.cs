using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers.UsersController
{
    public partial class UsersController
    {
        [HttpGet("Search")]
        public async Task<IActionResult> Get(string SearchPhrase, int itemsToSkip = 0, int itemsToTake = 10)
        {
            var currentUser = await userManager.GetUserAsync(User);
            var currentUserId = currentUser?.Id;
            var filteredUsers = usersService.SearchUsers(SearchPhrase, currentUserId, itemsToSkip, itemsToTake);

            return Ok(filteredUsers != null ? filteredUsers : new List<object>());

        }

    }
}

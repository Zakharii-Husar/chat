using API.Data;

namespace API.Repos.UsersRepo
{
    public partial class UsersRepo
    {
        public async Task<bool> UpdateAvatarNameAsync(AppUser currentUser, string newName)
        {
            currentUser.AvatarName = newName;
            var result = await userManager.UpdateAsync(currentUser);
            return result.Succeeded;
        }
    }
}

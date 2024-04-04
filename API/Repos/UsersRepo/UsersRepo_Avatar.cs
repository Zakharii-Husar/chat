namespace API.Repos.UsersRepo
{
    public partial class UsersRepo
    {
        public async Task<string> GetAvatarNameByUnameAsync(string uname)
        {
            var user = await userManager.FindByNameAsync(uname);
            return user.AvatarName;

        }
        public async Task<bool> UpdateAvatarNameAsync(string uname, string newName)
        {
            var user = await userManager.FindByNameAsync(uname);
            user!.AvatarName = newName;
            var result = await userManager.UpdateAsync(user);
            return result.Succeeded;
        }
    }
}

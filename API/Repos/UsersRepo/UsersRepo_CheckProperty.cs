namespace API.Repos.UsersRepo
{
    public partial class UsersRepo
    {
        public async Task<bool> CheckEmailExistsAsync(string email)
        {
            var user = await userManager.FindByEmailAsync(email);
            return user != null;
        }

        public async Task<bool> CheckUnameExistsAsync(string uname)
        {
            var user = await userManager.FindByEmailAsync(uname);
            return user != null;
        }
    }
}

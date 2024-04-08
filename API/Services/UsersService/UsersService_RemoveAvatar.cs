namespace API.Services.UsersService
{
    public partial class UsersService
    {
        public bool RemoveAvatar(string previousAvatarName)
        {
            if (string.IsNullOrEmpty(previousAvatarName)) return true;

            var uploadsFolder = Path.Combine(hostingEnvironment.ContentRootPath, "Avatars");
            var previousAvatarPath = Path.Combine(uploadsFolder, previousAvatarName);

            if (File.Exists(previousAvatarPath)) File.Delete(previousAvatarPath);
            return true;
        }
    }
}

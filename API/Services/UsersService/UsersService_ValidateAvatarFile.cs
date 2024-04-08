namespace API.Services.UsersService
{
    public partial class UsersService
    {
        public bool ValidateAvatarFile(IFormFile avatar)
        {
            var extension = Path.GetExtension(avatar.FileName);
            string[] supportedExtensions = [".png", ".jpg", ".jpeg", ".gif"];

            if (!supportedExtensions.Contains(extension, StringComparer.OrdinalIgnoreCase)) return false;

            const int maxFileSize = 5 * 1024 * 1024; // 5MB in bytes
            if (avatar.Length > maxFileSize) return false;
            return true;
        }
    }
}

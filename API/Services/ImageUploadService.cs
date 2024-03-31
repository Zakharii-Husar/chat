namespace API.Services
{

    public interface IImageUploadService
    {
        Task<string> SaveAvatarAsync(IFormFile? avatar);
        Task<bool> RmPreviousAvatar(string? previousAvatarName);
    }
    public class ImageUploadService(IWebHostEnvironment hostingEnvironment) : IImageUploadService
    {
        private readonly IWebHostEnvironment _hostingEnvironment = hostingEnvironment ?? throw new ArgumentNullException(nameof(hostingEnvironment));

        public async Task<string> SaveAvatarAsync(IFormFile? avatar)
        {
            if (avatar == null || !IsSupportedFileType(avatar))
            {
                throw new ArgumentException("Unsupported file type. Only PNG, JPEG, and GIF are allowed.");
            }

            // Get the path to the folder where you want to save the avatar
            var uploadsFolder = Path.Combine(_hostingEnvironment.ContentRootPath, "Avatars");

            // Create the folder if it doesn't exist
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var avatarName = Guid.NewGuid().ToString() + Path.GetExtension(avatar.FileName);
            var avatarPath = Path.Combine(uploadsFolder, avatarName);

            await using var stream = new FileStream(avatarPath, FileMode.Create);
            await avatar.CopyToAsync(stream);

            return avatarName;
        }

        private static bool IsSupportedFileType(IFormFile avatar)
        {
            // Check file extension
            var extension = Path.GetExtension(avatar.FileName);
            if (string.IsNullOrEmpty(extension))
            {
                return false;
            }

            string[] supportedExtensions = { ".png", ".jpg", ".jpeg", ".gif" };
            if (!supportedExtensions.Contains(extension, StringComparer.OrdinalIgnoreCase))
            {
                return false;
            }

            // Check file size (5MB limit)
            const int maxFileSize = 5 * 1024 * 1024; // 5MB in bytes
            if (avatar.Length > maxFileSize)
            {
                return false;
            }

            return true;
        }

        public async Task<bool> RmPreviousAvatar(string previousAvatarName)
        {
            if (string.IsNullOrEmpty(previousAvatarName))
            {
                return true; // No previous avatar to remove
            }

            var uploadsFolder = Path.Combine(_hostingEnvironment.ContentRootPath, "Avatars");
            var previousAvatarPath = Path.Combine(uploadsFolder, previousAvatarName);

            if (File.Exists(previousAvatarPath))
            {
                File.Delete(previousAvatarPath);
            }

            return true;
        }
    }
}

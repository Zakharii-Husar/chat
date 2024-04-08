namespace API.Services
{

    public interface IImageUploadService
    {
        public Task<string> SaveAvatarAsync(IFormFile? avatar);
        public bool RmPreviousAvatar(string? previousAvatarName);
    }
    public class ImageUploadService(IWebHostEnvironment hostingEnvironment) : IImageUploadService
    {
        private readonly IWebHostEnvironment _hostingEnvironment = hostingEnvironment ?? throw new ArgumentNullException(nameof(hostingEnvironment));

        public async Task<string> SaveAvatarAsync(IFormFile? avatar)
        {
            bool isValid = ValidateAvatarFile(avatar);
            if (!isValid) return false;

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

        public bool RmPreviousAvatar(string previousAvatarName)
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

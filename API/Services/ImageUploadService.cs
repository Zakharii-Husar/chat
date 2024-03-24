namespace API.Services
{
    public class ImageUploadService(IWebHostEnvironment hostingEnvironment) : IImageUploadService
    {

        public async Task<string> SaveAvatarAsync(IFormFile avatar)
        {
            // Check if an avatar was uploaded
            if (avatar == null || avatar.Length == 0)
            {
                throw new ArgumentException("No avatar uploaded.");
            }

            // Validate file type
            if (!IsSupportedFileType(avatar.FileName))
            {
                throw new ArgumentException("Unsupported file type. Only PNG, JPEG, and GIF are allowed.");
            }

            // Get the path to the folder where you want to save the avatar
            string uploadsFolder = Path.Combine(hostingEnvironment.ContentRootPath, "Avatars");

            // Create the folder if it doesn't exist
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            // Generate a unique avatar name (you can use GUID or other techniques)
            string avatarName = Guid.NewGuid().ToString() + Path.GetExtension(avatar.FileName);
            string avatarPath = Path.Combine(uploadsFolder, avatarName);

            // Save the avatar to disk
            using (var stream = new FileStream(avatarPath, FileMode.Create))
            {
                await avatar.CopyToAsync(stream);
            }

            // Return the file name for further processing if needed
            return avatarName;
        }

        private bool IsSupportedFileType(string fileName)
        {
            string extension = Path.GetExtension(fileName);
            if (string.IsNullOrEmpty(extension))
            {
                return false;
            }

            string[] supportedExtensions = { ".png", ".jpg", ".jpeg", ".gif" };
            return Array.Exists(supportedExtensions, ext => ext.Equals(extension, StringComparison.OrdinalIgnoreCase));
        }
    }



}

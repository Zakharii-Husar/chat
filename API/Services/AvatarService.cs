using API.Data;
using API.Models;
using API.Repos.UsersRepo;

namespace API.Services
{
    public interface IFileService
    {
        public string GenerateContentType(string iconName);
        public bool ValidateAvatarFile(IFormFile avatar);
        public bool RemoveAvatar(string previousAvatarName);
        public Task<string?> SaveAvatarAsync(IFormFile? avatar, AppUser currentUser);
        public FileContentModel? GetAvatarByNameAsync(string fileName);
    }
    public class AvatarService(IWebHostEnvironment hostingEnvironment, UsersRepo usersRepo) : IFileService
    {
        public string GenerateContentType(string iconName)
        {
            string contentType = Path.GetExtension(iconName).ToLowerInvariant() switch
            {
                ".jpg" or ".jpeg" => "image/jpeg",
                ".png" => "image/png",
                ".gif" => "image/gif",
                _ => "application/octet-stream",
            };
            return contentType;
        }

        public bool ValidateAvatarFile(IFormFile avatar)
        {
            var extension = Path.GetExtension(avatar.FileName);
            string[] supportedExtensions = [".png", ".jpg", ".jpeg", ".gif"];

            if (!supportedExtensions.Contains(extension, StringComparer.OrdinalIgnoreCase)) return false;

            const int maxFileSize = 5 * 1024 * 1024; // 5MB in bytes
            if (avatar.Length > maxFileSize) return false;
            return true;
        }

        public bool RemoveAvatar(string previousAvatarName)
        {
            if (string.IsNullOrEmpty(previousAvatarName)) return true;

            var uploadsFolder = Path.Combine(hostingEnvironment.ContentRootPath, "Avatars");
            var previousAvatarPath = Path.Combine(uploadsFolder, previousAvatarName);

            if (File.Exists(previousAvatarPath)) File.Delete(previousAvatarPath);
            return true;
        }

        public async Task<string?> SaveAvatarAsync(IFormFile? avatar, AppUser currentUser)
        {
            if (avatar == null) return null;
            bool isValid = ValidateAvatarFile(avatar);
            if (!isValid) return null;
            bool removed = RemoveAvatar(currentUser.AvatarName!);
            if (!removed) return null;

            var uploadsFolder = Path.Combine(hostingEnvironment.ContentRootPath, "Avatars");
            if (!Directory.Exists(uploadsFolder)) Directory.CreateDirectory(uploadsFolder);
            var newAvatarName = Guid.NewGuid().ToString() + Path.GetExtension(avatar.FileName);
            var avatarPath = Path.Combine(uploadsFolder, newAvatarName);
            bool nameUpdated = await usersRepo.UpdateAvatarNameAsync(currentUser, newAvatarName);
            if (!nameUpdated) return null;
            await using var stream = new FileStream(avatarPath, FileMode.Create);
            await avatar.CopyToAsync(stream);

            return newAvatarName;
        }

        public FileContentModel? GetAvatarByNameAsync(string fileName)
        {
            try
            {
                string avatarsFolder = Path.Combine(hostingEnvironment.ContentRootPath, "Avatars");
                string filePath = Path.Combine(avatarsFolder, fileName);
                if (!System.IO.File.Exists(filePath)) return null;

                string contentType = GenerateContentType(fileName);
                byte[] fileBytes = System.IO.File.ReadAllBytes(filePath);

                return new FileContentModel
                {
                    FileContent = fileBytes,
                    ContentType = contentType
                };

            }
            catch
            {
                return null;
            }
        }
    }
}

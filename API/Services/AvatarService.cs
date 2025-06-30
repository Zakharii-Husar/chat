using API.Data;
using API.Models;
using API.Repos;
using Microsoft.Extensions.Logging;

namespace API.Services
{
    public interface IAvatarService
    {
        public string GenerateContentType(string iconName);
        public bool ValidateAvatarFile(IFormFile avatar);
        public bool RemoveAvatar(string previousAvatarName);
        public Task<string?> SaveAvatarAsync(IFormFile? avatar, AppUser currentUser);
        public FileContentModel? GetAvatarByNameAsync(string fileName);
    }
    public class AvatarService(IWebHostEnvironment hostingEnvironment, IUsersRepo usersRepo, ILogger<AvatarService> logger) : IAvatarService
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
            try
            {
                logger.LogInformation("Starting avatar upload for user: {UserId}", currentUser.Id);
                
                if (avatar == null)
                {
                    logger.LogWarning("Avatar file is null");
                    return null;
                }
                
                bool isValid = ValidateAvatarFile(avatar);
                if (!isValid)
                {
                    logger.LogWarning("Avatar file validation failed for user: {UserId}", currentUser.Id);
                    return null;
                }
                
                bool removed = RemoveAvatar(currentUser.AvatarName!);
                if (!removed)
                {
                    logger.LogWarning("Failed to remove previous avatar for user: {UserId}", currentUser.Id);
                    return null;
                }

                var uploadsFolder = Path.Combine(hostingEnvironment.ContentRootPath, "Avatars");
                logger.LogInformation("Uploads folder path: {UploadsFolder}", uploadsFolder);
                
                if (!Directory.Exists(uploadsFolder))
                {
                    logger.LogInformation("Creating uploads directory: {UploadsFolder}", uploadsFolder);
                    Directory.CreateDirectory(uploadsFolder);
                }
                
                var newAvatarName = Guid.NewGuid().ToString() + Path.GetExtension(avatar.FileName);
                var avatarPath = Path.Combine(uploadsFolder, newAvatarName);
                logger.LogInformation("Avatar path: {AvatarPath}", avatarPath);
                
                bool nameUpdated = await usersRepo.UpdateAvatarNameAsync(currentUser, newAvatarName);
                if (!nameUpdated)
                {
                    logger.LogError("Failed to update avatar name in database for user: {UserId}", currentUser.Id);
                    return null;
                }
                
                logger.LogInformation("Saving avatar file to: {AvatarPath}", avatarPath);
                await using var stream = new FileStream(avatarPath, FileMode.Create);
                await avatar.CopyToAsync(stream);
                logger.LogInformation("Avatar saved successfully for user: {UserId}", currentUser.Id);

                return newAvatarName;
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error saving avatar for user: {UserId}", currentUser.Id);
                return null;
            }
        }

        public FileContentModel? GetAvatarByNameAsync(string fileName)
        {
            try
            {
                string avatarsFolder = Path.Combine(hostingEnvironment.ContentRootPath, "Avatars");
                string filePath = Path.Combine(avatarsFolder, fileName);
                
                logger.LogInformation("Looking for avatar file: {FileName}", fileName);
                logger.LogInformation("Avatars folder path: {AvatarsFolder}", avatarsFolder);
                logger.LogInformation("Full file path: {FilePath}", filePath);
                logger.LogInformation("File exists: {FileExists}", System.IO.File.Exists(filePath));
                
                if (!System.IO.File.Exists(filePath)) return null;

                string contentType = GenerateContentType(fileName);
                byte[] fileBytes = System.IO.File.ReadAllBytes(filePath);
                logger.LogInformation("Successfully read avatar file: {FileName}", fileName);

                return new FileContentModel(fileBytes, contentType);

            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error reading avatar file: {FileName}", fileName);
                return null;
            }
        }
    }
}

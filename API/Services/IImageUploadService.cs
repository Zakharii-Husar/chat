namespace API.Services
{
    public interface IImageUploadService
    {
        Task<string> SaveAvatarAsync(IFormFile? avatar);
        Task<bool> RmPreviousAvatar(string? previousAvatarName);
    }
}

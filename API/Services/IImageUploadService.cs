namespace API.Services
{
    public interface IImageUploadService
    {
        Task<string> SaveAvatarAsync(IFormFile avatar);
    }
}

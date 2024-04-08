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


    }
}

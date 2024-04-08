using API.Models;
namespace API.Services.UsersService
{
    public partial class UsersService
    {
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

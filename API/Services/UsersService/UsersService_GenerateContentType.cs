namespace API.Services.UsersService
{
    public partial class UsersService
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
    }
}

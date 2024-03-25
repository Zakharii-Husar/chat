namespace API.Services
{
    public interface IImageCompressionService
    {
        byte[] CompressImage(byte[] imageData);
    }
}
namespace API.Models
{
    public class FileContentModel(byte[] content, string type)
    {
        public byte[] FileContent { get; set; } = content;
        public string ContentType { get; set; } = type;
    }

}

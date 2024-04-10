namespace API.Models
{
    public class SendMessageModel
    {
        public string Content { get; set; }
        public int? RepliedTo { get; set; } = null;

    }
}

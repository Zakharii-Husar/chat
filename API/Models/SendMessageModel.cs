namespace API.Models
{
    public class SendMessageModel
    {
        public int ChatId { get; set; }
        public string Content { get; set; }
        public int? RepliedTo { get; set; } = null;

    }
}

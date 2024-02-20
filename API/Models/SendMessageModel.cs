namespace API.Models
{
    public class SendMessageModel
    {
        public string ReceiverId { get; set; }
        public string Content { get; set; }
        public int? RepliedTo { get; set; }
    }
}

namespace API.Models
{
    public class NewChatModel
    {
        public List<string> ParticipantUserIds { get; set; }
        public string? ChatName { get; set; }
        public bool IsGroupChat { get; set; } = false;

    }
}

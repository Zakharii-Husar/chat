using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Data
{
    [Table("Chats")]
    public class Chat(string chatName = null, bool isGroupChat = false)
    {
        [Key]
        public int ChatId { get; set; }
        public string? ChatName { get; set; } = chatName;

        public bool IsGroupChat { get; set; } = isGroupChat;

        public virtual ICollection<ChatMember> ChatMembers { get; set; } = [];
    }
}

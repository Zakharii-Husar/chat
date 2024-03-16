using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    [Table("Chats")]
    public class Chat
    {
        [Key]
        public int ChatId { get; set; }
        public string? ChatName { get; set; }

        public bool IsGroupChat { get; set; } = false;

        public ICollection<ChatMember> ChatMembers { get; set; } = new List<ChatMember>();
    }
}

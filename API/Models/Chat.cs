using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    [Table("Chats")]
    public class Chat
    {
        [Key]
        public int ChatId { get; set; }
        public string ChatName { get; set; } = null!;

        public ICollection<ChatMember> ChatMembers { get; set; } = new List<ChatMember>();
    }
}

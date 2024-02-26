using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models.DB
{
    [Table("Chats")]
    public class Chat
    {
        [Key]
        public int ChatId { get; }
        public string ChatName { get; set; } = null!;

    }
}

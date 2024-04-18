using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Data
{
    [Table("ReadReceipts")]
    public class ReadReceipt(int messageId, string userId)
    {
        [Key]
        public int RecordId { get; set; }

        [ForeignKey("Message")]
        [Required]
        public int MessageId { get; set; } = messageId;
        public Message Message { get; set; } = null!;

        [ForeignKey("User")]
        [Required]
        public string UserId { get; set; } = userId;
        public AppUser User { get; set; } = null!;
    }
}

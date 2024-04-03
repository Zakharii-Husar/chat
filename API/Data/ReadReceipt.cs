using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Data
{
    [Table("ReadReceipts")]
    public class ReadReceipt
    {
        [Key]
        public int RecordId { get; set; }

        [ForeignKey("Message")]
        public int MessageId { get; set; }
        public Message Message { get; set; } = null!;

        [ForeignKey("User")]
        public string UserId { get; set; } = null!;
        public AppUser User { get; set; } = null!;
    }
}

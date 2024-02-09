using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    [Table("Messages")]
    public class Message
    {
        [Key]
        public int MessageId { get; set; }

        // Foreign Key to User (Sender)
        [ForeignKey("Sender")]
        public string SenderId { get; set; } = null!;
        public AppUser Sender { get; set; } = null!;

        // Foreign Key to User (Receiver)
        [ForeignKey("Receiver")]
        public string ReceiverId { get; set; } = null!;
        public AppUser Receiver { get; set; } = null!;

        [Column(TypeName = "TEXT")]
        [MaxLength(300)]
        public string Content { get; set; } = null!;

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [DefaultValue("CURRENT_TIMESTAMP")]
        public DateTime SentAt { get; set; } 
    }
}

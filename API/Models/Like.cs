using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{

    [Table("Likes")]
    public class Like
    {
        [Key]
        public int LikeId { get; set; }

        [ForeignKey("Message")]
        public int MessageId { get; set; }
        public Message Message { get; set; } = null!;

        [ForeignKey("User")]
        public string UserId { get; set; } = null!;
        public AppUser User { get; set; } = null!;
    }
}

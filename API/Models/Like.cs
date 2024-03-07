using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{

    [Table("Likes")]
    public class Like
    {
        [Key]
        public int LikeId { get; set; }

        [ForeignKey("Message")][Required] public int MessageId { get; set; }
        public Message Message { get; set; }

        [ForeignKey("User")][Required] public string UserId { get; set; }
        public AppUser User { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Data
{

    [Table("Likes")]
    public class Like(int messageId, string userId)
    {
        [Key]
        public int LikeId { get; set; }

        [ForeignKey("Message")][Required] public int MessageId { get; set; } = messageId;
        public Message Message { get; set; }

        [ForeignKey("User")][Required] public string UserId { get; set; } = userId;
        public AppUser User { get; set; }
    }
}

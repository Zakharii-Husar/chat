using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models.DB
{

    [Table("Likes")]
    public class Like
    {
        [Key]
        public int LikeId { get; }

        [ForeignKey("ChatId")]
        public int ChatId { get; set; }

        [ForeignKey("LikedBy")]
        public string LikedBy { get; set; } = null!;
    }
}

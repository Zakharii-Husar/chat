using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    [Table("ChatMembers")]
    public class ChatMember
    {
        [Key]
        public int RecordId { get; set; }

        [ForeignKey("Member")]
        public string MemberId { get; set; } = null!;
        public AppUser Member { get; set; } = null!;

        [ForeignKey("Chat")]
        public int ChatId { get; set; }
        public Chat Chat { get; set; } = null!;

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime EnteredChat { get; set; }


        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime? LeftChat { get; set; } = null;

        public bool IsGroupChat { get; set; } = false;

        public bool IsCreator { get; set; } = false;
    }
}

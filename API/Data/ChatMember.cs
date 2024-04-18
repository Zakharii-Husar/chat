using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Data
{
    [Table("ChatMembers")]
    public class ChatMember(string memberId, int chatId)
    {
        [Key]
        public int RecordId { get; set; }

        [ForeignKey("Member")]
        [Required]
        public string MemberId { get; set; } = memberId;
        public AppUser Member { get; set; } = null!;

        [ForeignKey("Chat")]
        [Required]
        public int ChatId { get; set; } = chatId;
        public Chat Chat { get; set; } = null!;

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime EnteredChat { get; set; }


        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime? LeftChat { get; set; } = null;

        public bool IsCreator { get; set; } = false;
    }
}

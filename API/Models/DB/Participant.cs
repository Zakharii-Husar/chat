using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models.DB
{
    [Table("Participants")]
    public class Participant
    {
        [Key]
        public int RecordId { get; }
        [ForeignKey("ChatParticipant")]
        public string ChatParticipantId { get; set; } = null!;
        public AppUser ChatParticipant { get; set; } = null!;

        [ForeignKey("Chat")]
        public int ChatId { get; set; }

        public Chat Chat { get; set; } = null!;

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [DefaultValue("CURRENT_TIMESTAMP")]
        public DateTime Joined { get; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime? Left { get; set; } = null;

        public bool IsCreator { get; set; } = false;
    }
}

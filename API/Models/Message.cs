﻿using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    [Table("Messages")]
    public class Message
    {
        [Key]
        public int MessageId { get; set; }

        [MaxLength(450)]
        [ForeignKey("Sender")]
        public string SenderId { get; set; } = null!;
        public AppUser Sender { get; set; } = null!;

        [MaxLength(450)]
        [ForeignKey("Receiver")]
        public string ReceiverId { get; set; } = null!;
        public AppUser Receiver { get; set; } = null!;

        [Column(TypeName = "TEXT")]
        [MaxLength(300)]
        public string Content { get; set; } = null!;

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [DefaultValue("CURRENT_TIMESTAMP")]
        public DateTime SentAt { get; set; }

        public bool IsRead { get; set; } = false;

        public int? RepliedTo { get; set; }
    }
}

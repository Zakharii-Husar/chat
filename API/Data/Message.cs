﻿using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Data
{
    [Table("Messages")]
    public class Message(int chatId, string senderId, string content, int? repliedTo = null, bool isAutogenerated = false)
    {
        [Key]
        public int MessageId { get; set; }

        [MaxLength(450)]
        [ForeignKey("Sender")]
        public string SenderId { get; set; } = senderId;
        public AppUser Sender { get; set; } = null!;

        [ForeignKey("Chat")]
        public int ChatId { get; set; } = chatId;
        public Chat Chat { get; set; } = null!;

        [Column(TypeName = "TEXT")]
        [MaxLength(300)]
        public string Content { get; set; } = content;

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [DefaultValue("CURRENT_TIMESTAMP")]
        public DateTime SentAt { get; set; }

        [ForeignKey("MessageId")]
        public int? RepliedTo { get; set; } = repliedTo;

        public bool IsRead { get; set; } = false;

        public bool IsDeleted { get; set; } = false;

        public bool IsAutogenerated { get; set; } = isAutogenerated;

        public ICollection<ReadReceipt> ReadReceipts { get; set; } = [];
        public ICollection<Like> Likes { get; set; } = [];
    }
}

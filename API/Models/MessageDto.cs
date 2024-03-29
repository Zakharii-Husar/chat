﻿namespace API.Models
{
    public class MessageDto
    {
        public int MessageId { get; set; }
        public string SenderId { get; set; }
        public string SenderUserName { get; set; }

        public string? SenderAvatarName { get; set; }
        public int ChatId { get; set; }
        public string ChatName { get; set; }
        public string Content { get; set; }
        public DateTime SentAt { get; set; }
        public List<string> Likes { get; set; }
    }
}

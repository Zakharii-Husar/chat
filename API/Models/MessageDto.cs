﻿using API.Data;

namespace API.Models
{
    public class MessageDTO
    {
        public int MessageId { get; set; }
        public required string SenderId { get; set; }
        public required string SenderUserName { get; set; }
        public string? SenderAvatarName { get; set; }
        public int ChatId { get; set; }
        public required string ChatName { get; set; }
        public required string Content { get; set; }
        public DateTime SentAt { get; set; }
        public bool IsDeleted { get; set; } = false;
        public bool IsAutogenerated { get; set; } = false;
        public UserDTO? Interlocutor { get; set; }
        public List<UserDTO> Likes { get; set; } = [];
        public List<UserDTO> SeenBy { get; set; } = [];
        public bool SenderIsOnline { get; set; } = false;
        public bool IsGroupChat { get; set; }
    }
}

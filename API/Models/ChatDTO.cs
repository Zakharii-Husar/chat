﻿namespace API.Models
{
    public class ChatDTO
    {
        public int ChatId { get; set; }
        public string? AdminId { get; set; } = null;
        public string? ChatName { get; set; }
        public List<UserDTO?> Members { get; set; }
        public List<MessageDTO?> Messages { get; set; }
        public int PaginationOffset { get; set; }

        public bool HasMoreMessages { get; set; }

    }
}

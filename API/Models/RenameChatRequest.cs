using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class RenameChatRequest
    {
        public int ChatId { get; set; }

        [RegularExpression(@"^[a-zA-Z0-9. \-_]{4,20}$", ErrorMessage = "ChatName must be alphanumeric and can contain dots, dashes, spaces, and low dashes with a length between 4 and 20 characters.")]
        public string NewChatName { get; set; }
    }
}
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class NewChatModel
    {
        [Required(ErrorMessage = "ParticipantUserIds is required.")]
        [MinLength(2, ErrorMessage = "ParticipantUserIds must contain at least 3 elements.")]
        [MaxLength(30, ErrorMessage = "ParticipantUserIds cannot contain more than 30 elements.")]
        public List<string> ParticipantUserIds { get; set; }

        [RegularExpression(@"^[a-zA-Z0-9.\-_]{4,20}$", ErrorMessage = "ChatName must be alphanumeric and can contain dots, dashes, and low dashes with a length between 4 and 20 characters.")]
        public string ChatName { get; set; }
    }
}
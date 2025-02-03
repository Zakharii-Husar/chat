
namespace API.Models
{
    public class SysMessageDTO : MessageDTO
    {
        public string Type { get; set; }
        public SysMessagePayload Payload { get; set; }
    }

    public class SysMessagePayload
    {
        public string? NewChatName { get; set; } = null;
        public UserDTO? Member { get; set; } = null;
    }

}
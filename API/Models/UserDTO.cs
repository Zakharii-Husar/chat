namespace API.Models
{
    public class UserDTO
    {
        public required string Id { get; set; }
        public required string UserName { get; set; }
        public required string Email { get; set; }
        public required string FullName { get; set; }
        public string? AvatarName { get; set; } = null;
        public string? Bio { get; set; } = null;
        public DateTime LastVisit { get; set; }
        public bool IsOnline { get; set; } = false;
    }
}

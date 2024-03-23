namespace API.Models
{
    public class UserDetailsResponseDTO
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public string? AvatarLink { get; set; } = null;
        public string? Bio { get; set; } = null;
    }
}

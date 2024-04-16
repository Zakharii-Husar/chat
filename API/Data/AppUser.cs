using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace API.Data
{
    [Table("Users")]

    public class AppUser : IdentityUser
    {

        public override string? UserName { get; set; }
        public override string? Email { get; set; }
        public override string? PasswordHash { get; set; }
        public string FullName { get; set; } = null!;

        [Column(TypeName = "Date")]
        public DateTime CreatedAt { get; set; }

        public DateTime LastVisit { get; set; }

        [RegularExpression(@"^[a-zA-Z][\w\-#$\._]{3,25}$", ErrorMessage = "Invalid avatar name.")]

        [MaxLength(150)]
        public string? AvatarName { get; set; } = null;

        [MinLength(1)]
        [MaxLength(150)]
        public string? Bio { get; set; } = null;
    }


}

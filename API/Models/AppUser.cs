using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace API.Models
{
    [Table("Users")]

    public class AppUser : IdentityUser
    {
        [Required(ErrorMessage = "User name is required.")]
        [RegularExpression(@"^[^\d]\w{3,12}$", ErrorMessage = "Invalid username.")]
        public override string? UserName { get; set; }

        [Required(ErrorMessage = "Email address is required.")]
        [EmailAddress(ErrorMessage = "Invalid email address.")]
        public override string? Email { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        [DataType(DataType.Password)]

        public override string? PasswordHash { get; set; }

        [Required(ErrorMessage = "Full name is required.")]
        [StringLength(20, MinimumLength = 3, ErrorMessage = "Full name must be between 3 and 20 characters.")]
        [RegularExpression(@"^[a-zA-Z ]+$", ErrorMessage = "Full name can only consist of letters and spaces.")]
        public string FullName { get; set; } = null!;

        [Column(TypeName = "Date")]
        public DateTime CreatedAt { get; set; }

        public DateTime LastVisit { get; set; }
    }

}

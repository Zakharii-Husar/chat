using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class SignUpReqModel
    {
        [Required(ErrorMessage = "User name is required.")]

        [RegularExpression(@"^[a-zA-Z][\w\-#$\._]{3,20}$", ErrorMessage = "Invalid username.")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Email address is required.")]
        [EmailAddress(ErrorMessage = "Invalid email address.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Full name is required.")]
        [StringLength(30, MinimumLength = 3, ErrorMessage = "Full name must be between 3 and 20 characters.")]
        [RegularExpression(@"^[a-zA-Z ]+$", ErrorMessage = "Full name can only consist of letters and spaces.")]
        public string FullName { get; set; }

        [MinLength(8)]
        [MaxLength(30)]
        [Required(ErrorMessage = "Password is required.")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class SignInReqModel
    {

        [MinLength(3)]
        [MaxLength(50)]
        public string UsernameOrEmail { get; set; }

        [MinLength(3)]
        [MaxLength(50)]
        public string Password { get; set; }
    }
}

using API.Data;
using API.Models;

namespace API.Services.AuthService
{
    public partial class AuthService
    {
        public async Task<UserDetailsResponseDTO?> SignUpWithPassword(SignUpReqModel model)
        {
            var newUser = new AppUser
            {
                UserName = model.UserName,
                Email = model.Email,
                FullName = model.FullName
            };

            var registeredUser = await usersRepo.CreateUserAsync(newUser, model.Password);
            if (registeredUser == null) return null;
            await signInManager.SignInAsync(registeredUser, isPersistent: true);

            return new UserDetailsResponseDTO
            {
                Id = registeredUser.Id,
                UserName = registeredUser.UserName,
                Email = registeredUser.Email,
                FullName = registeredUser.FullName,
                AvatarName = registeredUser.AvatarName,
                Bio = registeredUser.Bio,
                LastVisit = registeredUser.LastVisit
            };
        }
    }
}

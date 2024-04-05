using API.Models;

namespace API.Services.AuthService
{
    public partial class AuthService
    {
        public async Task<UserDetailsResponseDTO?> SignInWithPassword(SignInReqModel model)
        {
            var user = await usersRepo.GetUserByUnameAsync(model.UsernameOrEmail)
           ?? await usersRepo.GetUserByEmailAsync(model.UsernameOrEmail);
            if (user == null) return null;

            var result = await signInManager.PasswordSignInAsync(user, model.Password, false, false);
            if (!result.Succeeded) return null;

            return new UserDetailsResponseDTO()
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                FullName = user.FullName,
                AvatarName = user.AvatarName,
                Bio = user.Bio
            };

        }
    }
}

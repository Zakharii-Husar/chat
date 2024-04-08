using API.Data;

namespace API.Services.UsersService
{
    public partial class UsersService
    {
        public async Task<string?> SaveAvatarAsync(IFormFile? avatar, AppUser currentUser)
        {
            if (avatar == null) return null;
            bool isValid = ValidateAvatarFile(avatar);
            if (!isValid) return null;
            bool removed = RemoveAvatar(currentUser.AvatarName!);
            if (!removed) return null;

            var uploadsFolder = Path.Combine(hostingEnvironment.ContentRootPath, "Avatars");
            if (!Directory.Exists(uploadsFolder)) Directory.CreateDirectory(uploadsFolder);
            var newAvatarName = Guid.NewGuid().ToString() + Path.GetExtension(avatar.FileName);
            var avatarPath = Path.Combine(uploadsFolder, newAvatarName);
            bool nameUpdated = await usersRepo.UpdateAvatarNameAsync(currentUser, newAvatarName);
            if (!nameUpdated) return null;
            await using var stream = new FileStream(avatarPath, FileMode.Create);
            await avatar.CopyToAsync(stream);

            return newAvatarName;
        }
    }
}

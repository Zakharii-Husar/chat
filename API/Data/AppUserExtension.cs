using API.Models;
using API.Data;

namespace API.Data
{
    public static class AppUserExtension
    {
        public static UserDTO ToDTO(this AppUser appUser)
        {
            return new UserDTO
            {
                Id = appUser.Id,
                UserName = appUser.UserName!,
                Email = appUser.Email!,
                FullName = appUser.FullName,
                AvatarName = appUser.AvatarName,
                Bio = appUser.Bio,
                LastVisit = appUser.LastVisit
            };
        }

        public static ChatMember ToChatMember(this AppUser appUser, int chatId, bool isCreator = false)
        {
            return new ChatMember
            {
                ChatId = chatId,
                MemberId = appUser.Id,
                IsCreator = isCreator
            };
        }
    }
}

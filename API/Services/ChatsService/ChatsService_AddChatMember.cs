using API.Data;
using API.Models;

namespace API.Services.ChatsService
{
    public partial class ChatsService
    {
        public async Task<bool> AddChatMemberAsync(int chatId, string candidatUname, AppUser currentUser)
        {
            var candidat = await usersRepo.GetUserByUnameAsync(candidatUname);
            bool authToAdd = await CheckRoleAsync(chatId, currentUser.Id);
            if (!authToAdd) return false;
            if (candidat == null) return false;
            var isAlreadyAdded = await chatsRepo.GetChatMemberAsync(chatId, candidat.Id);
            if (isAlreadyAdded != null) return false;

            var member = new ChatMember()
            {
                ChatId = chatId,
                MemberId = candidat.Id,
            };
            await chatsRepo.AddChatMemberAsync(member);

            var notification = new Message
            {
                ChatId = chatId,
                Content = $"{currentUser.UserName} added {candidat.UserName} to chat.",
                RepliedTo = null,
                SenderId = currentUser.Id!
            };

            await messagesRepo.InsertAsync(notification);
            return true;
        }
    }
}

using API.Data;
using API.Models;

namespace API.Services.ChatsService
{
    public partial class ChatsService
    {
        public async Task<bool> AddChatMemberAsync(EditMembershipRequest request, AppUser currentUser)
        {
            bool authToAdd = await CheckRoleAsync(request.ChatId, currentUser.Id);
            if (!authToAdd) return false;
            var candidat = await usersRepo.GetUserByIdAsync(request.UserId);
            if (candidat == null) return false;
            var isAlreadyAdded = await chatsRepo.GetChatMemberAsync(request.ChatId, request.UserId);
            if (isAlreadyAdded != null) return false;

            var member = new ChatMember()
            {
                ChatId = request.ChatId,
                MemberId = request.UserId
            };
            await chatsRepo.AddChatMemberAsync(member);

            var notification = new Message
            {
                ChatId = request.ChatId,
                Content = $"{currentUser.UserName} added {candidat.UserName} to chat.",
                RepliedTo = null,
                SenderId = currentUser.Id!
            };

            await messagesRepo.InsertAsync(notification);
            return true;
        }
    }
}

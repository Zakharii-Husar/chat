using API.Data;
using API.Models;

namespace API.Services.ChatsService
{
    public partial class ChatsService
    {
        public async Task<bool> RmChatMemberAsync(EditMembershipRequest request, AppUser currentUser)
        {
            bool isAdmin = await CheckRoleAsync(request.ChatId, currentUser.Id);
            bool isLeaving = currentUser.Id == request.UserId;
            if (!isAdmin && !isLeaving) return false;
            var memberToRm = await chatsRepo.GetChatMemberAsync(request.ChatId, request.UserId);
            if (memberToRm == null || memberToRm.LeftChat != null) return false;
            bool result = await chatsRepo.RmChatMemberAsync(memberToRm);
            if (!result) return false;

            var removedMsg = $"{currentUser?.UserName} removed {memberToRm.Member.UserName} from chat.";
            var leftMsg = $"{currentUser?.UserName} left chat.";
            var rightMsg = currentUser!.Id == memberToRm.MemberId ? leftMsg : removedMsg;

            var notification = new Message
            {
                ChatId = request.ChatId,
                Content = rightMsg,
                RepliedTo = null,
                SenderId = currentUser.Id
            };

            await messagesRepo.InsertAsync(notification);
            return true;
        }
    }
}

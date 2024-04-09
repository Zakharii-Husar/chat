using API.Data;
using API.Models;

namespace API.Services.ChatsService
{
    public partial class ChatsService
    {
        public async Task<bool> RmChatMemberAsync(int chatId, string userToRmUname, AppUser currentUser)
        {
            var userToRm = await usersRepo.GetUserByUnameAsync(userToRmUname);
            bool authToRm = await CheckRoleAsync(chatId, currentUser.Id);
            bool isLeaving = currentUser.Id == userToRm?.Id;
            if (!authToRm && !isLeaving) return false;
            var memberToRm = await chatsRepo.GetChatMemberAsync(chatId, userToRm.Id);
            if (memberToRm == null || memberToRm.LeftChat != null) return false;
            bool result = await chatsRepo.RmChatMemberAsync(memberToRm);
            if (!result) return false;

            var removedMsg = $"{currentUser?.UserName} removed {memberToRm.Member.UserName} from chat.";
            var leftMsg = $"{currentUser?.UserName} left chat.";
            var rightMsg = isLeaving ? leftMsg : removedMsg;

            var notification = new Message
            {
                ChatId = chatId,
                Content = rightMsg,
                RepliedTo = null,
                SenderId = currentUser.Id
            };

            await messagesRepo.InsertAsync(notification);
            return true;
        }
    }
}

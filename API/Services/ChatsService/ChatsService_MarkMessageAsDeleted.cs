using API.Data;

namespace API.Services.ChatsService
{
    public partial class ChatsService
    {
        public async Task<bool> MarkMsgAsDelAsync(int messageId, string currentUserId)
        {
            var msgToRm = await messagesRepo.GetMessageByIdAsync(messageId);
            if (msgToRm == null || msgToRm.SenderId != currentUserId) return false;
            return await messagesRepo.MarkAsDeletedAsync(msgToRm);
        }
    }
}

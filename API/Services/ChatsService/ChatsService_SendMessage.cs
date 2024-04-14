using API.Data;
using API.Models;

namespace API.Services.ChatsService
{
    public partial class ChatsService
    {
        public async Task<bool> SendMsgAsync(int chatId, SendMessageModel model, string currentUserId)
        {
            bool isMember = await CheckMembershipByChatIdAsync(chatId, currentUserId);
            if (!isMember) return false;

            var newMessage = new Message
            {
                ChatId = chatId,
                Content = model.Content,
                RepliedTo = model.RepliedTo ?? null,
                SenderId = currentUserId
            };
            var result = await messagesRepo.InsertAsync(newMessage);
            var members = await GetMembersIdsAsync(result.ChatId);
            var msgDTO = ConvertMessageToDTO(result);
            Console.WriteLine("Members count: " + members.Count);
            await wsConManService.BroadcastMessage(msgDTO, members);
            wsConManService.PrintConnections();
            return true;
        }
    }
}

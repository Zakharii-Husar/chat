using API.Data;
using API.Models;

namespace API.Services.ChatsService
{
    public partial class ChatsService
    {
        public MessageDTO? ConvertMessageToDTO(Message? message)
        {
            if (message == null) return null;

            var messageDTO = new MessageDTO
            {
                MessageId = message.MessageId,
                SenderId = message.SenderId,
                SenderUserName = message.Sender?.UserName,
                SenderAvatarName = message.Sender?.AvatarName,
                ChatId = message.ChatId,
                ChatName = message.Chat?.ChatName,
                Content = !message.IsDeleted ? message.Content : message.Sender.UserName + " deleted message.",
                SentAt = message.SentAt,
                Likes = message.Likes?.Select(like => like.User?.UserName).ToList(),
                SeenBy = message.ReadReceipts.Select(r => r.User?.UserName).ToList()
            };

            return messageDTO;
        }
    }
}

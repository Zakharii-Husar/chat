using API.Models;

namespace API.Data
{
    public static class MessageExtension
    {
        public static MessageDTO ToDTO(this Message message)
        {
            return new MessageDTO
            {
                MessageId = message.MessageId,
                SenderId = message.SenderId,
                SenderUserName = message.Sender?.UserName,
                SenderAvatarName = message.Sender?.AvatarName,
                ChatId = message.ChatId,
                ChatName = message.Chat?.ChatName,
                Content = !message.IsDeleted ? message.Content : message.Sender.UserName + " deleted message.",
                SentAt = message.SentAt,
                Likes = message.Likes?.Select(like => like.User.ToDTO()).ToList(),
                SeenBy = message?.ReadReceipts?.Select(r => r.User.ToDTO()).ToList()
            };
        }
    }
}

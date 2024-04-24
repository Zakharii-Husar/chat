using API.Models;

namespace API.Data
{
    public static class MessageExtension
    {
        public static MessageDTO ToDTO(this Message message, string currentUserId)
        {
            return new MessageDTO
            {
                MessageId = message.MessageId,
                SenderId = message.SenderId,
                SenderUserName = message?.Sender?.UserName,
                SenderAvatarName = message?.Sender?.AvatarName,
                ChatId = message.ChatId,
                ChatName = message?.Chat?.ChatName,
                Content = !message.IsDeleted ? message?.Content : message?.Sender?.UserName + " deleted message.",
                SentAt = message.SentAt,
                Interlocutor = message.Chat.ChatMembers
                .Where(m => !m.Chat.IsGroupChat && m.MemberId != currentUserId)
                .Select(m => m.Member?.ToDTO())
                .FirstOrDefault(),
                Likes = message.Likes?.Select(like => like.User.ToDTO()).ToList(),
                SeenBy = message?.ReadReceipts?.Select(r => r.User.ToDTO()).ToList()
            };
        }
    }
}

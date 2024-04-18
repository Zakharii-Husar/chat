using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Repos.MessagesRepo
{
    public partial class MessagesRepo
    {
        public async Task<List<Message>> GetMessagesByChatMemberAsync(
            ChatMember member,
            int itemsToSkip,
            int itemsToTake)
        {

            var messagesQuery = dbContext.Messages
                .Where(message => message.ChatId == member.ChatId)
                .Where(message => message.SentAt > member.EnteredChat);
            if (member.LeftChat != null)
            {
                messagesQuery = messagesQuery
                    .Where(message => message.SentAt < member.LeftChat);
            }
            messagesQuery = messagesQuery.OrderByDescending(message => message.SentAt);

            var messagesTotal = await messagesQuery.CountAsync();
            var messagesLeft = messagesTotal - itemsToSkip;
            var messagesToTake = messagesLeft < itemsToTake ? messagesLeft : itemsToTake;
            if (messagesToTake < 1) return [];

            return await messagesQuery
                .Select(m => m)
                .Include(m => m.ReadReceipts)
                .ThenInclude(rr => rr.User)
                .Include(m => m.Likes)
                .ThenInclude(like => like.User)
                .Skip(itemsToSkip)
                .Take(messagesToTake)
                .ToListAsync();


        }
    }
}

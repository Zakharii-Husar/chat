using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repos.MessagesRepo
{
    public partial class MessagesRepo
    {
        public async Task<List<Message>> GetMessagesByChatMember(
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
                .Skip(itemsToSkip)
                .Take(messagesToTake)
                .ToListAsync();


        }
    }
}

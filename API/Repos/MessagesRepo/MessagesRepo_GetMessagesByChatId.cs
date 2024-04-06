using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repos.MessagesRepo
{
    public partial class MessagesRepo
    {
        public async Task<List<Message>> GetMessagesByChatMember(
            ChatMember member,
            int paginationOffset,
            int paginationStep)
        {
`   
            var messagesQuery = dbContext.Messages
                .Where(message => message.ChatId == member.ChatId)
                //making sure user gets only the messages sent after he joined chat
                .Where(message => message.SentAt > member.EnteredChat);

            //making sure user gets only messages sent before he left chat
            if (member.LeftChat != null)
            {
                messagesQuery = messagesQuery
                    .Where(message => message.SentAt < member.LeftChat);
            }

            // Sort the messages by Time
            messagesQuery = messagesQuery.OrderByDescending(message => message.SentAt);


            // Calculate the number of messages to skip based on paginationOffset
            var messagesTotal = await messagesQuery.CountAsync();
            var messagesLeft = messagesTotal - paginationOffset;
            var messagesToTake = messagesLeft < paginationStep ? messagesLeft : paginationStep;
            if (messagesToTake < 1) return [];

            return await messagesQuery
                .Select(m => m)
                .OrderBy(m => m.SentAt)
                .Skip(paginationOffset)
                .Take(messagesToTake)
                .ToListAsync();


        }
    }
}

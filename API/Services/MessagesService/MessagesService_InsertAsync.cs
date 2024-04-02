using API.Models;
using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace API.Services.MessagesService
{
    public partial class MessagesService
    {
        public async Task<MessageDTO> InsertAsync(SendMessageModel model, string senderId)
        {
            var newMessage = new Message
            {
                ChatId = model.ChatId,
                Content = model.Content,
                RepliedTo = model.RepliedTo ?? null,
                SenderId = senderId!
            };

            dbContext.Messages.Add(newMessage);
            int rowsAffected = await dbContext.SaveChangesAsync();
            if (rowsAffected > 0) return this.ConvertToDTO(newMessage);
            return null;
        }
    }
}
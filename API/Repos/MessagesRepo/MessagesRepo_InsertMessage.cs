using API.Data;

namespace API.Repos.MessagesRepo
{
    public partial class MessagesRepo
    {
        public async Task<Message?> InsertAsync(Message message)
        {
            await dbContext.Messages.AddAsync(message);
            await dbContext.SaveChangesAsync();
            return message;
        }
    }
}

using API.Data;
namespace API.Repos.MessagesRepo

{
    public partial class MessagesRepo
    {
        public async Task<bool> MarkAsDeletedAsync(Message message)
        {
            message.IsDeleted = true;
            dbContext.Messages.Update(message);
            int rowsAffected = await dbContext.SaveChangesAsync();
            return rowsAffected > 0;
        }
    }
}

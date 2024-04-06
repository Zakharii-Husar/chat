namespace API.Repos.MessagesRepo
{
    public partial class MessagesRepo
    {
        public async Task<bool> DeleteAsync(int id)
        {
            var message = await dbContext.Messages.FindAsync(id);
            dbContext.Messages.Remove(message!);

            var rowsAffected =
             await dbContext.SaveChangesAsync();
            return rowsAffected > 0;
        }
    }
}

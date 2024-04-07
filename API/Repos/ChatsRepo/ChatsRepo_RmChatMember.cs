using API.Data;
namespace API.Repos.ChatsRepo
{
    public partial class ChatsRepo
    {
        public async Task<bool> RmChatMemberAsync(ChatMember memberToRemove)
        {
            memberToRemove.LeftChat = DateTime.Now;
            dbContext.ChatMembers.Update(memberToRemove);
            var rowsAffected = await dbContext.SaveChangesAsync();
            return rowsAffected > 0;
        }
    }
}

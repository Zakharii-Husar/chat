using API.Data;

namespace API.Repos.ChatsRepo
{
    public partial class ChatsRepo
    {
        public async Task<bool> AddChatMemberAsync(ChatMember member)
        {
            dbContext.ChatMembers.Add(member);
            var rowsAffected = await dbContext.SaveChangesAsync();
            return rowsAffected > 0;
        }
    }
}

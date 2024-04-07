using Microsoft.EntityFrameworkCore;

namespace API.Repos.ChatsRepo
{
    public partial class ChatsRepo
    {
        public async Task<int?> GetPrivateChatIdAsync(string uname1, string uname2)
        {
            return await dbContext.Chats
              .Where(chat => chat.IsGroupChat == false)
              .Where(chat => chat.ChatMembers.Any(cm => cm.MemberId == uname1) &&
                   chat.ChatMembers.Any(cm => cm.Member.UserName == uname2))
              .Select(chat => chat.ChatId)
              .FirstOrDefaultAsync();
        }
    }
}

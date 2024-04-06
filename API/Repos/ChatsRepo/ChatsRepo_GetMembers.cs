using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repos.ChatsRepo
{
    public partial class ChatsRepo
    {
        public async Task<List<UserDTO>> GetChatMembersByIdAsync(int chatId)
        {
            return await dbContext.ChatMembers
               .Where(member => member.ChatId == chatId)
               .Where(member => member.LeftChat == null)
               .Select(member => usersService.ConvertUserToDTO(member.Member))
               .ToListAsync();
        }
    }
}

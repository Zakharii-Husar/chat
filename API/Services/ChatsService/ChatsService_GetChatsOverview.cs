using API.Models;
using API.Repos;
using API.Repos.ChatsRepo;

namespace API.Services.ChatsService
{
    public class ChatsService(IChatsRepo chatsRepo, IMessagesRepo messagesRepo)
    {
        public Task<List<MessageDTO>> GetChatsOverview(string userId, int paginationOffset, int paginationStep)
        {

        }
    }
}

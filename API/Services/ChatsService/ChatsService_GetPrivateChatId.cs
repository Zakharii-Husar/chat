namespace API.Services.ChatsService
{
    public partial class ChatsService
    {
        public async Task<int?> GetPrivateChatIdAsync(string uname1, string uname2)
        {
            return await chatsRepo.GetPrivateChatIdAsync(uname1, uname2);
        }
    }
}

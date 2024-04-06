using API.Data;

namespace API.Services.ChatsService
{
    public partial class ChatsService
    {
        public async Task<int?> CreatePrivateChatAsync(string uname1, string uname2)
        {

            var newChatId = await chatsRepo.CreatePrivateChatAsync();
            if (newChatId == null) return null;
            var member1 = new ChatMember()
            {
                ChatId = (int)newChatId,
                MemberId = uname1,
                IsCreator = false
            };
            var member2 = new ChatMember()
            {
                ChatId = (int)newChatId,
                MemberId = uname2,
                IsCreator = false
            };
            await chatsRepo.AddChatMemberAsync(member1);
            await chatsRepo.AddChatMemberAsync(member2);
            return newChatId;
        }
    }
}

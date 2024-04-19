using API.Data;
using API.Models;
using API.Repos;
using API.Repos.MessagesRepo;
using API.Repos.UsersRepo;
using System.Text.RegularExpressions;

namespace API.Services
{
    public interface IGroupChatService
    {
        public Task<string?> RenameChatAsync(int chatId, string newName, AppUser currentUser);
        public Task<int?> CreateGroupChatAsync(NewChatModel chatModel, AppUser currentUser);
    }

    public class GroupChatService(IChatsRepo chatsRepo, IUsersRepo usersRepo) : IGroupChatService
    {
        private static readonly Regex MyRegex = new Regex(@"^[a-zA-Z0-9. \-_]{4,20}$");
        public async Task<string?> RenameChatAsync(int chatId, string newName, AppUser currentUser)
        {
            if (!MyRegex.IsMatch(newName)) return null;
            var result = await chatsRepo.RenameChatAsync(chatId, newName);
            if (result == null) return null;
            return currentUser.UserName + " renamed chat to " + newName;
        }

        public async Task<int?> CreateGroupChatAsync(NewChatModel chatModel, AppUser currentUser)
        {

            chatModel.ParticipantUserIds.Add(currentUser.Id);
            var participants = chatModel.ParticipantUserIds.Distinct().ToList();
            //Prevent creating chat if at least 1 user ID is not valid
            foreach (var userId in participants)
            {
                var user = await usersRepo.GetUserByIdAsync(userId);

                if (user == null) return null;
            };

            var newChat = new Chat(chatModel.ChatName, true);

            await chatsRepo.CreateChatAsync(newChat);

            var members = participants.Select(userId => new ChatMember(userId, newChat.ChatId, userId == currentUser.Id));

            foreach (var member in members) await chatsRepo.AddChatMemberAsync(member);

            return newChat.ChatId;
        }
    }
}

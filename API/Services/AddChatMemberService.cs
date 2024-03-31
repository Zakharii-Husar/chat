using API.Data;
using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public interface IAddChatMemberService
    {
        public Task<bool> IsAuthorizedToAdd(AppUser currentUser, int chatId);
        public Task<bool> ValidateNewMember(string newMemberId);
        public Task<bool> MemberAlreadyExists(EditMembershipRequest request);
        public Task<bool> AddNewMember(EditMembershipRequest request, AppUser currentUser);
        public Task<Message> GenerateNotification(AppUser currentUser, EditMembershipRequest request);
    }


    public class AddChatMemberService(AppDbContext dbContext, UserManager<AppUser> userManager) : IAddChatMemberService
    {
        public async Task<bool> MemberAlreadyExists(EditMembershipRequest request)
        {
            return await dbContext.ChatMembers
                .AnyAsync(member => member.MemberId == request.UserId && member.ChatId == request.ChatId);
        }
        public async Task<bool> IsAuthorizedToAdd(AppUser currentUser, int chatId)
        {
            return await dbContext.ChatMembers
                .Where(member => member.ChatId == chatId)
                .Where(member => member.MemberId == currentUser.Id)
                .Select(member => member.IsCreator)
                .FirstOrDefaultAsync();

        }
        public async Task<bool> ValidateNewMember(string newMemberId)
        {
            return await dbContext.Users
                .AnyAsync(user => user.Id == newMemberId);
        }
        public async Task<bool> AddNewMember(EditMembershipRequest request, AppUser currentUser)
        {
            try
            {
                var member = new ChatMember()
                {
                    ChatId = request.ChatId,
                    MemberId = request.UserId
                };

                dbContext.ChatMembers.Add(member);
                await dbContext.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
                return false;
            }
        }


        public async Task<Message> GenerateNotification(AppUser currentUser, EditMembershipRequest request)
        {
            var currentUsername = (await userManager.FindByIdAsync(currentUser.Id!))?.UserName;
            var addedUsername = (await userManager.FindByIdAsync(request.UserId))?.UserName;

            var newMessage = new Message
            {
                ChatId = request.ChatId,
                Content = $"{currentUsername} added {addedUsername} to chat.",
                RepliedTo = null,
                SenderId = currentUser.Id!
            };


            dbContext.Messages.Add(newMessage);
            await dbContext.SaveChangesAsync();
            return newMessage;
        }
    }
}

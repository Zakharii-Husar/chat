
namespace API.Hubs
{
    public partial class MainHub
    {

        public async Task JoinChat(int groupId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupId.ToString());

            // Create a new entry in the dictionary for the group if it doesn't exist
            if (!_typingUsersByGroup.ContainsKey(groupId))
            {
                _typingUsersByGroup[groupId] = [];
            }
        }
    }
}

namespace API.Hubs
{
    public partial class MainHub
    {
        public async Task LeaveChat(int groupId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupId.ToString());

            // Remove the entry from the dictionary if the group no longer has any users typing
            if (_typingUsersByGroup.ContainsKey(groupId) && _typingUsersByGroup[groupId].Count == 0)
            {
                _typingUsersByGroup.Remove(groupId);
            }
        }
    }
}

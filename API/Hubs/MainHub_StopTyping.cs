namespace API.Hubs
{
    public partial class MainHub
    {
        public async Task StopTyping(int groupId, string username)
        {
            // Remove the user from the list of typing users for the group
            if (_typingUsersByGroup.ContainsKey(groupId))
            {
                _typingUsersByGroup[groupId].Remove(username);

                // Remove the entry from the dictionary if the group no longer has any users typing
                if (_typingUsersByGroup[groupId].Count == 0)
                {
                    _typingUsersByGroup.Remove(groupId);
                }
            }

            await BroadcastTypingStatus(groupId);
        }
    }
}

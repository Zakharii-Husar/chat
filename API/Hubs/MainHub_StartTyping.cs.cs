namespace API.Hubs
{
    public partial class MainHub
    {
        public async Task StartTyping(int groupId, string username)
        {
            if (!_typingUsersByGroup.ContainsKey(groupId))
            {
                _typingUsersByGroup[groupId] = [];
            }

            if (!_typingUsersByGroup[groupId].Contains(username))
            {
                _typingUsersByGroup[groupId].Add(username);
            }

            await BroadcastTypingStatus(groupId);
        }
    }
}

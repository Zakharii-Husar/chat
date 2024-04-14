namespace API.Hubs
{
    public partial class MainHub
    {
        public async Task Disconnect()
        {
            var connectionId = Context.ConnectionId;

            await wsConmanService.RemoveConnectionAsync(connectionId);

            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "online");

        }
    }
}

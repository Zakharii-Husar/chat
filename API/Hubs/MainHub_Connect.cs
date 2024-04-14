using System.Security.Claims;

namespace API.Hubs
{
    public partial class MainHub
    {
        public async Task Connect()
        {
            var identityId = Context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var connectionId = Context.ConnectionId;

            await wsConmanService.AddConnectionAsync(identityId, connectionId);
            await Groups.AddToGroupAsync(Context.ConnectionId, "online");
        }
    }
}

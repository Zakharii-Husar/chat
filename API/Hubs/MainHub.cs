using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;
using API.Services;

namespace API.Hubs
{
    public partial class MainHub(IWsConManService wsConmanService) : Hub
    {
        private readonly Dictionary<int, List<string>> _typingUsersByGroup = [];

    }
}


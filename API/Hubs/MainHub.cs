using Microsoft.AspNetCore.SignalR;
using API.Services;
using API.Models;


namespace API.Hubs
{
    public partial class MainHub(IWsConManService wsConmanService) : Hub
    {
        private readonly Dictionary<int, List<string>> _typingUsersByGroup = [];

    }
}


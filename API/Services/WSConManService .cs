using System.Collections.Concurrent;
namespace API.Services
{
    public interface IWsConManService
    {
    Task AddConnectionAsync(string identityId, string connectionId);
    Task RemoveConnectionAsync(string connectionId);
    string? GetConnectionId(string identityId);
    void PrintConnections();

    }

    public class WsConManService() : IWsConManService
    {
        private readonly ConcurrentDictionary<string, string> _onlineUsers = [];

public async Task AddConnectionAsync(string identityId, string connectionId)
{
    var existingConnection = _onlineUsers.FirstOrDefault(kvp => kvp.Key == identityId);
    if (existingConnection.Key != null)
    {
        _onlineUsers.TryUpdate(identityId, connectionId, existingConnection.Value);
    }
    else
    {
        _onlineUsers.AddOrUpdate(identityId, connectionId, (_, _) => connectionId);
    }
    await Task.CompletedTask;
}

        public async Task RemoveConnectionAsync(string connectionId)
        {
            var userToRemove = _onlineUsers.FirstOrDefault(x => x.Value == connectionId);
            if (userToRemove.Key != null)
            {
                _onlineUsers.TryRemove(userToRemove.Key, out _);
            }
            await Task.CompletedTask;
        }

        public string? GetConnectionId(string identityId)
        {
            var con = _onlineUsers.TryGetValue(identityId, out string? connectionId) ? connectionId : null;
            return con;
        }

        public void PrintConnections()
        {
            Console.WriteLine("Current Connections:");
            foreach (var kvp in _onlineUsers)
            {
                Console.WriteLine($"Identity ID: {kvp.Key}, Connection ID: {kvp.Value}");
            }
        }


    }
}
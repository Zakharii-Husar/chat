using System.Collections.Concurrent;
using System.Threading.Tasks;

namespace API.Services
{
    public interface IWSConManService
    {
        Task AddConnectionAsync(string identityId, string connectionId);
        Task RemoveConnectionAsync(string connectionId);
        string GetConnectionId(string? connectionId);
    }

    public class WSConManService : IWSConManService
    {
        private readonly ConcurrentDictionary<string, string> _userConnections =
            new ConcurrentDictionary<string, string>();

        public async Task AddConnectionAsync(string identityId, string connectionId)
        {
            _userConnections.AddOrUpdate(connectionId, identityId, (_, _) => identityId);
            await Task.CompletedTask;
        }

        public async Task RemoveConnectionAsync(string connectionId)
        {
            _userConnections.TryRemove(connectionId, out _);
            await Task.CompletedTask;
        }

        public string? GetConnectionId(string identityId)
        {
            return (from kvp in _userConnections where kvp.Value == identityId select kvp.Key).FirstOrDefault();
        }

    }

}
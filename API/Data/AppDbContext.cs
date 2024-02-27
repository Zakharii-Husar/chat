using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using API.Models;
namespace API.Data
{
    public class AppDbContext : IdentityDbContext<AppUser>
    {
        public DbSet<Chat> Chats { get; set; } = null!;
        public DbSet<ChatMember> ChatMembers { get; set; } = null!;
        public DbSet<Message> Messages { get; set; } = null!;
        public DbSet<Like> Likes { get; set; } = null!;
        public DbSet<ReadReceipt> ReadReceipts { get; set; } = null!;

        private string DB_NAME { get; }
        private string DB_USERNAME { get; }
        private string DB_PASSWORD { get; }
        private string DB_SERVER { get; }

        private string ConnectionString { get; }

        public AppDbContext()
        {
            DB_NAME = Environment.GetEnvironmentVariable("DB_NAME") ??
                throw new ArgumentNullException("DB_NAME environment variable is missing.");
            DB_USERNAME = Environment.GetEnvironmentVariable("DB_USERNAME") ??
                throw new ArgumentNullException("DB_USERNAME environment variable is missing.");
            DB_PASSWORD = Environment.GetEnvironmentVariable("DB_PASSWORD") ??
                throw new ArgumentNullException("DB_PASSWORD environment variable is missing.");
            DB_SERVER = Environment.GetEnvironmentVariable("DB_SERVER") ??
                throw new ArgumentNullException("DB_SERVER environment variable is missing.");

            ConnectionString =
                $"Server={DB_SERVER};" +
                $"Database={DB_NAME};" +
                $"User Id={DB_USERNAME};" +
                $"Password={DB_PASSWORD};";
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySQL(ConnectionString);
        }

    }
}


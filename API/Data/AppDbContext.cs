﻿using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Data.Sqlite;

namespace API.Data
{
    public class AppDbContext : IdentityDbContext<AppUser>
    {
        private readonly IConfiguration _configuration;

        public AppDbContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public DbSet<Chat> Chats { get; set; } = null!;
        public DbSet<ChatMember> ChatMembers { get; set; } = null!;
        public DbSet<Message> Messages { get; set; } = null!;
        public DbSet<Like> Likes { get; set; } = null!;
        public DbSet<ReadReceipt> ReadReceipts { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = _configuration.GetConnectionString("DefaultConnection");
            var dbPassword = _configuration["DatabasePassword"] ?? "YourSecurePassword123!";
            
            try
            {
                // Create encrypted SQLite connection
                var connection = new SqliteConnection(connectionString);
                connection.Open();
                
                // Set encryption password
                using (var command = connection.CreateCommand())
                {
                    command.CommandText = $"PRAGMA key = '{dbPassword}';";
                    command.ExecuteNonQuery();
                }
                
                optionsBuilder
                    .UseLazyLoadingProxies()
                    .UseSqlite(connection);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Database Connection Error: {ex.Message}");
                throw;
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //Handling cascading deletes
            modelBuilder.Entity<Like>()
                .HasKey(l => l.LikeId);

            modelBuilder.Entity<Like>()
                .HasOne(l => l.Message)
                .WithMany(m => m.Likes)
                .HasForeignKey(l => l.MessageId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Like>()
                .HasOne(l => l.User)
                .WithMany()
                .HasForeignKey(l => l.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<ReadReceipt>()
                        .HasKey(l => l.RecordId);

            modelBuilder.Entity<ReadReceipt>()
                .HasOne(l => l.Message)
                .WithMany(m => m.ReadReceipts)
                .HasForeignKey(l => l.MessageId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<ReadReceipt>()
                .HasOne(l => l.User)
                .WithMany()
                .HasForeignKey(l => l.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            //GENERATING TIMESTAMP ON INSERTION OF NEW CHAT MEMBER:
            modelBuilder.Entity<ChatMember>()
                .Property(cm => cm.EnteredChat)
                .HasDefaultValueSql("datetime('now')");

            modelBuilder.Entity<Message>()
                .Property(m => m.SentAt)
                .HasDefaultValueSql("datetime('now')");

            modelBuilder.Entity<AppUser>()
                .Property(u => u.LastVisit)
                .HasDefaultValueSql("datetime('now')");

        }

    }
}


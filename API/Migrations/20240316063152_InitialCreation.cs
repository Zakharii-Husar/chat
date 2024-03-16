using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsGroupChat",
                table: "ChatMembers");

            migrationBuilder.AddColumn<bool>(
                name: "IsGroupChat",
                table: "Chats",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsGroupChat",
                table: "Chats");

            migrationBuilder.AddColumn<bool>(
                name: "IsGroupChat",
                table: "ChatMembers",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}

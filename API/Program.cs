using Microsoft.AspNetCore.Identity;
using API.Data;
using API.Hubs;
using API.Repos;
using API.Services;


var builder = WebApplication.CreateBuilder(args);

var AllowFilteredOrigins = "_allowFilteredOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: AllowFilteredOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:3000",
                                              "http://www.localhost:3000")
                                 .AllowAnyHeader()
                                 .AllowAnyMethod()
                                 .AllowCredentials();
                      });
});

// Hosting doesn't add IHttpContextAccessor by default
builder.Services.AddHttpContextAccessor();
//ENTITY CONTEXT
builder.Services.AddDbContext<AppDbContext>();
//DATA PROTECTION
builder.Services.AddDataProtection();
//IDENTITY
builder.Services.AddIdentityCore<AppUser>()
.AddUserManager<UserManager<AppUser>>()
.AddSignInManager<SignInManager<AppUser>>()
.AddEntityFrameworkStores<AppDbContext>()
.AddDefaultTokenProviders();

builder.Services.AddSignalR();



builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = IdentityConstants.ApplicationScheme;
    options.DefaultSignInScheme = IdentityConstants.ExternalScheme;
})
.AddCookie(IdentityConstants.ApplicationScheme, options =>
{
    options.Cookie.Name = "ChatAppCookie";
    options.ExpireTimeSpan = TimeSpan.FromHours(3);
});
builder.Services.AddAuthorization();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddTransient<IChatMembersRepo, ChatMembersRepo>();
builder.Services.AddTransient<IChatsRepo, ChatsRepo>();
builder.Services.AddTransient<IMessagesRepo, MessagesRepo>();
builder.Services.AddTransient<IUsersRepo, UsersRepo>();

builder.Services.AddTransient<IAuthService, AuthService>();
builder.Services.AddTransient<IAllChatsService, AllChatsService>();
builder.Services.AddTransient<IPrivateChatService, PrivateChatService>();
builder.Services.AddTransient<IGroupChatService, GroupChatService>();
builder.Services.AddTransient<IChatMembershipService, ChatMembershipService>();
builder.Services.AddTransient<IMessageService, MessageService>();
builder.Services.AddTransient<IAvatarService, AvatarService>();
builder.Services.AddTransient<IUsersService, UsersService>();
builder.Services.AddTransient<IWSService, WSService>();
builder.Services.AddSingleton<IWsConManService, WsConManService>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapHub<MainHub>("/Hub");


app.UseCors(AllowFilteredOrigins);

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();

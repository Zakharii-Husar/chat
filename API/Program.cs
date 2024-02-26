using API.Models.DB;
using Microsoft.AspNetCore.Identity;
using API.Data;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
//CORS
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
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
//DATAPROTECTION
builder.Services.AddDataProtection();
//IDENTITY
builder.Services.AddIdentityCore<AppUser>(options =>
{
    options.Password.RequiredLength = 3;
    options.Password.RequireDigit = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireNonAlphanumeric = false;

})
.AddUserManager<UserManager<AppUser>>()
.AddSignInManager<SignInManager<AppUser>>()
.AddEntityFrameworkStores<AppDbContext>()
.AddDefaultTokenProviders();



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

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseCors(MyAllowSpecificOrigins);

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();

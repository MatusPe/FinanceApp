using FinanceApp.Server;
using FinanceApp.Server.Models;
using FinanceApp.Server.Service;
using FinanceApp.Server.WebSocket;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ReactApp2.Server.DateBase;
using ReactApp2.Server.Interface;
using ReactApp2.Server.Repositary;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddSingleton<AlpacaWebSocketClient>();
//Register
builder.Services.AddDbContext<ApplicationDbContext>(options=>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddControllers().
    AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);


builder.Services.AddIdentity<AppUser, IdentityRole>(options =>
{

    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequiredLength = 12;


}).AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme =
        options.DefaultChallengeScheme =
            options.DefaultForbidScheme =
                options.DefaultScheme =
                    options.DefaultSignInScheme =
                        options.DefaultSignOutScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{


    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            context.Token = null;
            // Check if the request contains the "token" cookie
            var token = context.Request.Cookies["token"];
            var path = context.HttpContext.Request.Path;
            if (!string.IsNullOrEmpty(token))
            {
                context.Token = token;
            }

            return Task.CompletedTask;
        }
    };

    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = builder.Configuration["JWT:Issuer"],
        ValidateAudience = true,
        ValidAudience = builder.Configuration["JWT:Audience"],
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(
            System.Text.Encoding.UTF8.GetBytes(builder.Configuration["JWT:SigningKey"])
        ),
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddScoped<IBudgetRepositary, BudgetRepositary>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IExpensesRepositary, ExpensesRepositary>();
builder.Services.AddScoped<ICashRepositary, CashRepositary>();
builder.Services.AddScoped<ITransactionRepositary, TransactionRepositary>();
builder.Services.AddScoped<ILoanRepositary, LoanRepositary>();
builder.Services.AddHttpClient<ITrading212Repositary, Trading212Repositary>();

builder.Services.AddSignalR();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.WithOrigins("https://localhost:53368")  // Allow requests from any origin
            .AllowAnyHeader()   // Allow any headers
            .AllowAnyMethod()
            .AllowCredentials()); 
});

var app = builder.Build();
app.UseCors("AllowAll");
app.MapControllers();
app.MapHub<AlpacaHub>("/hubs/alpaca");

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();





app.UseAuthentication();


app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.MapControllers();
app.Run();

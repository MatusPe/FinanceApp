using Microsoft.AspNetCore.Identity;
using ReactApp2.Server.Entity;

namespace FinanceApp.Server.Models;

public class AppUser:IdentityUser
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public bool? Graduated { get; set; }
    public string? Job { get; set; }
    public DateTime? Birthday { get; set; }
    public string? City { get; set; }
    public string? Place { get; set; }
    
    public List<Expenses> Expenses { get; set; }
}
using FinanceApp.Server.Entity;
using FinanceApp.Server.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ReactApp2.Server.Entity;

namespace ReactApp2.Server.DateBase;

public class ApplicationDbContext:  IdentityDbContext<AppUser>
{
    public ApplicationDbContext(DbContextOptions options): base(options)
    {
        
    }
    
    
    public DbSet<Budget> Budgets { get; set; }
    
    public DbSet<Expenses> Expenses { get; set; }
    
    public DbSet<CashTransaction> CashTransactions { get; set; }
    public DbSet<ExpenseTransaction> ExpenseTransactions { get; set; }
    
    public DbSet<Loan> Loans { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        List<IdentityRole> roles = new List<IdentityRole>
        {
            new IdentityRole
            {
                Id = "Admin",
                Name = "Admin",
                NormalizedName = "ADMIN"
            },
            new IdentityRole
            {
                Id = "User",
                Name = "User",
                NormalizedName = "USER"
            },
            
        };
        builder.Entity<IdentityRole>().HasData(roles);
        
        
    }
    
    
    
}
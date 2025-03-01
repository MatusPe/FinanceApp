using Microsoft.EntityFrameworkCore;
using ReactApp2.Server.DateBase;
using ReactApp2.Server.Entity;
using ReactApp2.Server.Interface;

namespace ReactApp2.Server.Repositary;

public class BudgetRepositary: IBudgetRepositary
{
    private ApplicationDbContext _context;

    public BudgetRepositary(ApplicationDbContext appDbContext)
    {
        _context = appDbContext;
    }
    public async Task<List<Budget>> GetAllBudgetAsync()
    {
        return await _context.Budgets.ToListAsync();
    }

    public async Task<Budget?> GetBudgetByIdAsync(int id)
    {
        var budget = await _context.Budgets.FirstOrDefaultAsync(x => x.Id == id);
        if (budget == null)
        {
            return null;
        }
        return budget;
        
    }

    public async Task<Budget> AddBudgetAsync(Budget budget)
    {
        await _context.Budgets.AddAsync(budget);
        await _context.SaveChangesAsync();
        return budget;
    }

    public async Task<Budget> UpdateBudgetAsync(int id, Budget budget)
    {
        var oldbudget = await _context.Budgets.FirstOrDefaultAsync(x => x.Id == id);
        if (oldbudget == null)
        {
            return null;
        }
        oldbudget.Name= budget.Name;
        oldbudget.LimitAmount = budget.LimitAmount;
        oldbudget.Status = budget.Status;
        oldbudget.StartDate = budget.StartDate;
        oldbudget.EndDate = budget.EndDate;
        oldbudget.repeater = budget.repeater;
        oldbudget.Category = budget.Category;

        await _context.SaveChangesAsync();
        return oldbudget;
    }

    public async Task<Budget?> DeleteBudgetAsync(int id)
    {
        var budget = await _context.Budgets.FirstOrDefaultAsync(x => x.Id == id);
        if (budget == null)
        {
            return null;
        }
        _context.Budgets.Remove(budget);
        await _context.SaveChangesAsync();
        return budget;
    }

    public Task<Budget> GetBudgetByNameAsync(string name)
    {
        throw new NotImplementedException();
    }
}
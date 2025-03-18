using FinanceApp.Server.UserMappers;
using Microsoft.EntityFrameworkCore;
using ReactApp2.Server.DateBase;
using ReactApp2.Server.DTOs;
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
    public async Task<List<BudgetDTO>> GetAllBudgetAsyncByUser()
    {
        var budgets= await _context.Budgets.Select(e=>new BudgetDTO
        {
            Id = e.Id,
            Name = e.Name,
            LimitAmount = e.LimitAmount,
            Status = e.Status,
            StartDate = e.StartDate,
            repeater = e.repeater,
            Interval = e.Interval,
            Category = e.Category,
            Description = e.Description,
            IntervalRemaining  =  e.StartDate != null
                ? e.Interval- ((int)(DateTime.UtcNow - e.StartDate).TotalDays % (int)e.Interval)
                : 0, 
            TotalExpenses = _context.Expenses
                .Where(p => p.BudgetId == e.Id &&
                            p.Date >= e.StartDate.AddDays(
                                ((int)(DateTime.UtcNow - e.StartDate).TotalDays - ((int)(DateTime.UtcNow - e.StartDate).TotalDays % (int)e.Interval) ) ) &&
                            p.Date <= e.StartDate.AddDays(
                                ((int)(DateTime.UtcNow - e.StartDate).TotalDays))) // Exclusive range
                .Sum(r => (double?)r.Price) ?? 0,
            
            
            
        }).ToListAsync();

        return budgets;
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
        var Budget= await _context.Budgets.FirstOrDefaultAsync(x => x.Category == budget.Category);
        if (Budget != null)
        {
            return null;
        }
        await _context.Budgets.AddAsync(budget );
        await _context.SaveChangesAsync();
        
        var expenses = await _context.Expenses.Where(e=>e.Category==budget.Category).ToListAsync();
        if (expenses.Any())
        {
            foreach (var expense in expenses)
            {
                Console.WriteLine(expense.BudgetId);
                expense.BudgetId = budget.Id;
            }
            await _context.SaveChangesAsync();
        }

        

        
        
        
        return budget;
    }
    
    

    public async Task<List<ExpensesDTOforPiegraph>> GetExpensesByBudgetAsync(String category, int duration)
    {
        DateTime thresholdDate = DateTime.UtcNow.AddDays(-duration);
        
        var expenses= await _context.Expenses.Where(e => e.Category == category&&e.Date>=thresholdDate).Select(e=> new ExpensesDTOforPiegraph
        {
            Category = e.Category,
            Price = e.Price,
            
        }).ToListAsync();
        return expenses;
    }

    public async Task<Budget> UpdateBudgetAsync(int id, Budget budget)
    {
        var oldbudget = await _context.Budgets.FirstOrDefaultAsync(x => x.Id == id);
        if (oldbudget == null)
        {
            return null;
        }

        if (oldbudget.Category != budget.Category)
        {
                
            var newbudget= await _context.Budgets.FirstOrDefaultAsync(x => x.Category == budget.Category);
            if (newbudget != null)
            {
                return null;
            }
            
            var expensesold = await _context.Expenses.Where(e => e.Category == oldbudget.Category).ToListAsync();
            foreach (var expense in expensesold)
            {
                expense.BudgetId = null;
            }
            var expenses = await _context.Expenses.Where(e => e.Category == budget.Category).ToListAsync();
            foreach (var expense in expenses)
            {
                expense.BudgetId = budget.Id;
            }
        }
        oldbudget.Name= budget.Name;
        oldbudget.LimitAmount = budget.LimitAmount;
        oldbudget.Status = budget.Status;
        oldbudget.StartDate = budget.StartDate;
        
        oldbudget.repeater = budget.repeater;
        oldbudget.Category = budget.Category;
        oldbudget.Description = budget.Description;
        oldbudget.Interval = budget.Interval;
        
        

        await _context.SaveChangesAsync();
        return oldbudget;
    }

    public async Task<Budget?> DeleteBudgetAsync(int id)
    {
        var budget = await _context.Budgets.Include(e=>e.expenses).FirstOrDefaultAsync(x => x.Id == id);
        foreach (var expense in budget.expenses)
        {
            expense.BudgetId = null;
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
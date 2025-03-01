using Microsoft.EntityFrameworkCore;
using ReactApp2.Server.DateBase;
using ReactApp2.Server.DTOs;
using ReactApp2.Server.Entity;
using ReactApp2.Server.Interface;

namespace ReactApp2.Server.Repositary;

public class ExpensesRepositary:IExpensesRepositary
{
    private readonly ApplicationDbContext _context;
    private readonly ITransactionRepositary _transactionRepositary;
    private readonly ICashRepositary _cashRepositary;
    public ExpensesRepositary(ApplicationDbContext dbContext, ITransactionRepositary transactionRepositary, ICashRepositary cashRepositary)
    {
        _context = dbContext;
        _transactionRepositary = transactionRepositary;
        _cashRepositary = cashRepositary;
    }
    public async Task<List<ExpensesByDateDTO>> GetExpensesByDateAsync(String Name, DateTime startDate, DateTime endDate)
    {
        
        startDate = startDate.ToUniversalTime();
        endDate = endDate.ToUniversalTime();
        // Assuming `Date` is stored as DateTimeOffset in the database
        var expensesByDate = await _context.Expenses
            .Where(x => x.Date >= startDate && x.Date <= endDate )
            .Select(x => new ExpensesByDateDTO()
            {
                Id = x.Id,
                Type = x.Type,
                Category = x.Category,
                Name = x.Name,
                Sender = x.Sender,
                Price = x.Price,
                Date = x.Date,
                
            })
            .ToListAsync();

        return expensesByDate;
    }

    

    public async Task<Expenses> AddExpensesAsync(Expenses expense)
    {
        await _context.Expenses.AddAsync(expense);
        await _context.SaveChangesAsync(); // Save Expenses first
        await _context.SaveChangesAsync();
        return expense;

    }
    
    public async Task<Expenses> GetExpensesByIdAsync(int id)
    {
        var expenses = await _context.Expenses.Include(x=>x.ExpenseTransactions).Include(x=>x.CashTransactions).FirstOrDefaultAsync(x=>x.Id == id);
        if (expenses == null)
        {
            return null;
        }
        return expenses;
        
    }

    public async Task<Expenses> UpdateExpensesAsync(Expenses expense)
    {
        Console.WriteLine($"This is write expense: {expense}");
        if (expense == null)
        {
            return null;
        }
        var existingExpense = await _context.Expenses
            .Include(e => e.CashTransactions)   
            .Include(e => e.ExpenseTransactions)
            .FirstOrDefaultAsync(e => e.Id == expense.Id);

        if (existingExpense == null)
        {
            
            return null;
        }
        
        existingExpense.Type = expense.Type;
        existingExpense.Category = expense.Category;
        existingExpense.Name = expense.Name;
        existingExpense.Sender = expense.Sender;
        existingExpense.Price = expense.Price;
        existingExpense.Date = expense.Date;

        if (expense.ExpenseTransactions == existingExpense.ExpenseTransactions&&existingExpense.CashTransactions == expense.CashTransactions)
        {
            return null;
        }

        
        
        existingExpense.CashTransactions = expense.CashTransactions ?? new List<CashTransaction>();
        existingExpense.ExpenseTransactions = expense.ExpenseTransactions ?? new List<ExpenseTransaction>();
        
        await _context.SaveChangesAsync();
        return expense;
        
    }

    public async Task<List<ExpensesDTOforPiegraph>> GetExpensesByLastmonth(int month, int year)
    {
        Console.WriteLine($"This is write expense for month {month}, year {year}");
        var today = DateTime.Today;
        var firstDayOfMonth = new DateTime(today.Year, today.Month, 1);
        
        var firstDayOfMonthUtc = firstDayOfMonth.ToUniversalTime();
        var todayUtc = today.ToUniversalTime();
        
        Console.WriteLine("First Day of Month: " + firstDayOfMonth.ToString("yyyy-MM-dd"));
        Console.WriteLine("Today: " + today.ToString("yyyy-MM-dd"));
        Console.WriteLine("this is okeekoe");
        
        var filteredExpenses = _context.Expenses
            .Where(e => e.Date >= firstDayOfMonthUtc && e.Date <= todayUtc) // Filter by the given month
            .OrderByDescending(x => x.Price);

        var top12 = await filteredExpenses.Take(12) // Limit to top 12
            .Select(e => new ExpensesDTOforPiegraph
            {
                Category = e.Category,
                Price = e.Price
            })
            .ToListAsync(); // Materialize the result

        var other = await filteredExpenses.Skip(12).SumAsync(e => e.Price); // Get the sum of the rest

        if (other > 0) // Add "Other" row only if there are remaining expenses
        {
            top12.Add(new ExpensesDTOforPiegraph()
            {
                Category = "Other",
                Price = other
            });
        }

        return top12;
        
        
    }

    public async Task<List<ExpensesDTOforPiegraph>> GetGroupedExpensesByMonth(int year)
    {
        var firstDayOfYear = new DateTime(year, 1, 1).ToUniversalTime();
        var lastDayOfYear = new DateTime(year, 12, 31).ToUniversalTime();
        
        var monthNames = new[]
        {
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        };
        
        var result = await _context.Expenses
            .Where(e => e.Date >= firstDayOfYear && e.Date <= lastDayOfYear)
            .GroupBy(e => e.Date.Month)
            .Select(g => new ExpensesDTOforPiegraph
            {
                Category = monthNames[g.Key - 1],
                Price = g.Sum(e => e.Price)
            })
            .ToListAsync();
        
        
        var allMonths = monthNames
            .Select((month, index) => new ExpensesDTOforPiegraph
            {
                Category = month,
                Price = result.FirstOrDefault(r => r.Category == month)?.Price ?? 0
            })
            .ToList();
        
        return allMonths;
    }

    public async Task<Expenses> UpdateonlyExpensesAsync(Expenses expense)
    {
        if (expense == null)
        {
            return null;
        }
        var existingExpense = await _context.Expenses
            .FirstOrDefaultAsync(e => e.Id == expense.Id);

        if (existingExpense == null)
        {
            
            return null;
        }
        
        existingExpense.Type = expense.Type;
        existingExpense.Category = expense.Category;
        existingExpense.Name = expense.Name;
        existingExpense.Sender = expense.Sender;
        existingExpense.Price = expense.Price;
        existingExpense.Date = expense.Date;
        
        
        
        
        await _context.SaveChangesAsync();
        return expense;
        
    }

    public async Task<Expenses> DeleteExpensesAsync(int id)
    {
        
        var expense=await _context.Expenses.Include(e => e.CashTransactions)
            .Include(e => e.ExpenseTransactions).FirstOrDefaultAsync(e => e.Id == id);

        if (expense == null)
        {
            return null;
        }
        _context.Expenses.Remove(expense);
        await _context.SaveChangesAsync();
        
        return expense;
    }
}
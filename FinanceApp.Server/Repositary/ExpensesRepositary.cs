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
                Receiver = x.Receiver,
                Price = x.Price,
                Date = x.Date,
                
            })
            .ToListAsync();

        return expensesByDate;
    }

    

    public async Task<Expenses> AddExpensesAsync(Expenses expense)
    {
        
        var Loan=await _context.Loans.FirstOrDefaultAsync(e => e.LoanName == expense.Name);
        var Budget = await _context.Budgets.FirstOrDefaultAsync(e => e.Category == expense.Category);
        
        expense.LoanId = Loan?.Id;
        expense.BudgetId = Budget?.Id;
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
        
        var Loan=await _context.Loans.FirstOrDefaultAsync(e => e.LoanName == expense.Name);
        var Budget = await _context.Budgets.FirstOrDefaultAsync(e => e.Category == expense.Category);
        
        
        existingExpense.Type = expense.Type;
        existingExpense.Category = expense.Category;
        existingExpense.Name = expense.Name;
        existingExpense.Receiver = expense.Receiver;
        existingExpense.Price = expense.Price;
        existingExpense.Date = expense.Date;
        existingExpense.LoanId = Loan?.Id;
        existingExpense.BudgetId = Budget?.Id;

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
        var firstDayOfMonthUtc = DateTime.SpecifyKind(new DateTime(year, month, 1, 0, 0, 0), DateTimeKind.Utc);

        // Last day of the given month in UTC (set to 23:59:59)
        var lastDayOfMonthUtc = DateTime.SpecifyKind(new DateTime(year, month, DateTime.DaysInMonth(year, month), 23, 59, 59), DateTimeKind.Utc);

        Console.WriteLine($"First Day of Month (UTC): {firstDayOfMonthUtc}");
        Console.WriteLine($"Last Day of Month (UTC): {lastDayOfMonthUtc}");
        
        var filteredExpenses = _context.Expenses
            .Where(e => e.Date >= firstDayOfMonthUtc && e.Date <= lastDayOfMonthUtc) // Filter by the given month
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

        var groupedByCategory = top12
            .GroupBy(e => e.Category)
            .Select(g => new ExpensesDTOforPiegraph
            {
                Category = g.Key,
                Price = g.Sum(e => e.Price)
            })
            .ToList();
        
        return groupedByCategory;
        
        
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
    
    public async Task<List<TwoExpensesDTO>> GetTwoExpensesAsync(int TargetMonth, int year)
    {
        var firstTargetDayOfMonthUtc = DateTime.SpecifyKind(new DateTime(year, TargetMonth, 1, 0, 0, 0), DateTimeKind.Utc);
        var lastTargetDayOfMonthUtc = DateTime.SpecifyKind(new DateTime(year, TargetMonth, DateTime.DaysInMonth(year, TargetMonth), 23, 59, 59), DateTimeKind.Utc);
        
        int currentMonth = DateTime.Now.Month;
        
        var firstDayOfYear = DateTime.SpecifyKind(new DateTime(year, currentMonth, 1, 0, 0, 0), DateTimeKind.Utc);
        var lastDayOfYear = DateTime.SpecifyKind(new DateTime(year, currentMonth, DateTime.DaysInMonth(year, currentMonth), 23, 59, 59), DateTimeKind.Utc);
        
        
        var targetExpenses = await _context.Expenses
            .Where(e => e.Date >= firstTargetDayOfMonthUtc && e.Date <= lastTargetDayOfMonthUtc)
            .GroupBy(e => e.Category)
            .Select(g => new
            {
                Category = g.Key,
                TargetPrice = g.Sum(e => e.Price)
            })
            .ToListAsync();
        
        var expenses = await _context.Expenses
            .Where(e => e.Date >= firstDayOfYear && e.Date <= lastDayOfYear)
            .GroupBy(e => e.Category)
            .Select(g => new
            {
                Category = g.Key,
                Price = g.Sum(e => e.Price)
            })
            .ToListAsync();
        
        
        var targetExpensesDict = targetExpenses.ToDictionary(x => x.Category, x => x.TargetPrice);
        var expensesDict = expenses.ToDictionary(x => x.Category, x => x.Price);
        
        var commonCategories = targetExpensesDict.Keys.Intersect(expensesDict.Keys)
            .Take(8)
            .Select(category => new TwoExpensesDTO
            {
                Category = category,
                AmountTargetMonth = targetExpensesDict[category],
                AmountMonth = expensesDict[category]
            })
            .ToList();
        
        
        
        return commonCategories;
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
        var Loan=await _context.Loans.FirstOrDefaultAsync(e => e.LoanName == expense.Name);
        var Budget = await _context.Budgets.FirstOrDefaultAsync(e => e.Category == expense.Category);
        
        existingExpense.Type = expense.Type;
        existingExpense.Category = expense.Category;
        existingExpense.Name = expense.Name;
        existingExpense.Receiver = expense.Receiver;
        existingExpense.Price = expense.Price;
        existingExpense.Date = expense.Date;
        existingExpense.LoanId = Loan?.Id;
        existingExpense.BudgetId = Budget?.Id;
        
        
        
        
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
using FinanceApp.Server.UserMappers;
using Microsoft.AspNetCore.Mvc;
using ReactApp2.Server.DateBase;
using ReactApp2.Server.DTOs;
using ReactApp2.Server.Entity;
using ReactApp2.Server.Interface;

namespace FinanceApp.Server.Controllers;

[Route("api/Expenses")]
[ApiController]
public class ExpensesController: ControllerBase
{
    
    private readonly IExpensesRepositary expensesRepositary;
    public ExpensesController( IExpensesRepositary expensesRepositary)
    {
        
        this.expensesRepositary = expensesRepositary;
    }
    

    [HttpGet("GetExpensesByDate")]
    public async Task<IActionResult> GetExensesBydata([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
    {
        Console.WriteLine($"totoke svo{startDate} - {endDate}");
        var Expense=await expensesRepositary.GetExpensesByDateAsync("string", startDate, endDate);
        
        if (Expense==null)
        {
            return NotFound();
        }
        Console.WriteLine($"ID: toto je spojene");
        foreach (var expense in Expense)
        {
            Console.WriteLine($"ID: {expense.Id}, Type: {expense.Type}, Category: {expense.Category}, " +
                              $"Name: {expense.Name}, Price: {expense.Price}, Date: {expense.Date}");
        }
        return Ok(Expense);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetExpensesById([FromRoute]int id)
    {
        Console.WriteLine("Hello, this is a log message!");
        var expenses=await expensesRepositary.GetExpensesByIdAsync(id);
        if (expenses == null)
        {
            return NotFound();
        }
        
        var expenseDto = new ExpensesDTO
        {
            Id = expenses.Id,
            Type = expenses.Type,
            Category = expenses.Category,
            Name = expenses.Name,
            Receiver = expenses.Receiver,
            Price = expenses.Price,
            Date = expenses.Date,
            CashTransactions = expenses.CashTransactions ?? new List<CashTransaction>(),
            ExpenseTransactions = expenses.ExpenseTransactions ?? new List<ExpenseTransaction>()
        };

        return Ok(expenseDto);

    }


    [HttpGet("GetExpensesByMonth/{month}/{year}")]
    
    public async Task<IActionResult> GetExpensesBymounth([FromRoute] int month, [FromRoute] int year)
    {
        Console.WriteLine("Hello, this is a log message!");
        var mounthExpenses=await expensesRepositary.GetExpensesByLastmonth(month, year);
        
        

        if (mounthExpenses == null)
        {
            return NotFound();
        }
        return Ok(mounthExpenses);
        
    }

    [HttpGet("GetGroupedExpensesByMonth/{year}")]

    public async Task<IActionResult> GetGroupedExpensesByMonth([FromRoute] int year)
    {
        var expenses=await expensesRepositary.GetGroupedExpensesByMonth(year);
        if (expenses == null)
        {
            return NotFound();
        }
        return Ok(expenses);
    }
    
    
        
        
    [HttpPut("UpdateonlyExpense")]
    public async Task<IActionResult> UpdateonlyExpensesAsync([FromBody] ExpensesDTO expensesDto)
    {
        
        var expense = ExpensesMapper.MapToEntity(expensesDto);
        
        await expensesRepositary.UpdateonlyExpensesAsync(expense);
        Console.WriteLine($"Updating Expense: {expensesDto}");
        return Ok(expensesDto);

    }   

    [HttpPost]
    public async Task<IActionResult> AddExpense([FromBody] ExpensesDTO expensesDto)
    {
        Console.WriteLine("javol!");


        var expense = ExpensesMapper.MapToEntity(expensesDto);
        
        
        await expensesRepositary.AddExpensesAsync(expense);
        
        return CreatedAtAction(nameof(GetExpensesById), new{id=expense.Id},expense);
    }
    
    
    [HttpPut("UpdateExpense")]
    
    public async Task<IActionResult> UpdateExpense( [FromBody] ExpensesDTO expensesDto)
    {
        
        Console.WriteLine($"Updating Expense: {expensesDto.Receiver}");
        var expense = ExpensesMapper.MapToEntity(expensesDto);
        
        await expensesRepositary.UpdateExpensesAsync(expense);
        Console.WriteLine($"olf Expense: {expensesDto}");
        return Ok(expensesDto);
    }

    [HttpDelete("deleteExpense/{id}")]
    
    public async Task<IActionResult> DeleteBudget([FromRoute] int id)
    {
        var expenses = await expensesRepositary.DeleteExpensesAsync(id);
        if (expenses == null)
        {
            return NotFound();
        }
       
        return Ok("Expense deleted successfully");
    }

    [HttpGet("GetTwoExpensesdifference/{targetMonth}/{year}")]
    public async Task<IActionResult> GetTwoExpenses([FromRoute] int targetMonth,[FromRoute] int year)
    {
        Console.WriteLine(targetMonth);
        Console.WriteLine(year);
        Console.WriteLine("Hellooo okeyy");
        var expenses = await expensesRepositary.GetTwoExpensesAsync(targetMonth, year);
        if (expenses == null)
        {
            return NotFound();
        }
        
        return Ok(expenses);
    }
        
}
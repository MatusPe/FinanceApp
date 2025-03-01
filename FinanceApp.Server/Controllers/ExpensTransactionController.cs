using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp2.Server.Entity;
using ReactApp2.Server.Interface;

namespace FinanceApp.Server.Controllers;

[Route("api/expenseTransactions")]
[ApiController]
public class ExpensTransactionController:ControllerBase
{
    private readonly ITransactionRepositary _transactionRepositary;

    public ExpensTransactionController(ITransactionRepositary repositary)
    {
        _transactionRepositary = repositary;
        
    }
    
    [HttpPut("updateExpense")]
    public async Task<IActionResult> UpdateExpensesTransaction([FromBody] List<ExpenseTransaction> expenseTransactions)
    {
        Console.WriteLine("UpdateExpensesTransaction UpdateExpensesTransaction UpdateExpensesTransaction UpdateExpensesTransaction UpdateExpensesTransaction UpdateExpensesTransaction UpdateExpensesTransaction");
        foreach (var expensesTransaction in expenseTransactions)  // Correct loop syntax
        {
            Console.WriteLine("index");
            Console.WriteLine(expensesTransaction);
            await  _transactionRepositary.UpdateCashTransactionAsync(expensesTransaction);
        }
        return Ok(new { message = "Expense updated successfully" });


    }

    [HttpGet("id")]
    public async Task<IActionResult> GetExpensesById(int id)
    {
        var expenseTransaction = await _transactionRepositary.GetExpenseTransactionsByIdAsync(id);
        if (expenseTransaction == null)
        {
            return NotFound();
        }
        return Ok(expenseTransaction);
        
    }
    
    [HttpPut]
    public async Task<IActionResult> UpdateExpensesTransaction([FromBody] ExpenseTransaction expenseTransaction)
    {
        
        await _transactionRepositary.UpdateCashTransactionAsync(expenseTransaction);
        return Ok(expenseTransaction);


    }
    
    [HttpDelete("id")]
    public async Task<IActionResult> DeleteExpensesTransaction(int id)
    {
        await _transactionRepositary.DeleteCashTransactionAsync(id);
        return Ok();
        
    }
    
    [HttpPost]
    public async Task<IActionResult> AddExpensesTransaction(ExpenseTransaction expenseTransaction)
    {
        await _transactionRepositary.AddTransactionAsync(expenseTransaction);
        return Ok(expenseTransaction);
        
    }
    
}
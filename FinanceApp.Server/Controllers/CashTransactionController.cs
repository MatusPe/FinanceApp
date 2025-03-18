using Microsoft.AspNetCore.Mvc;
using ReactApp2.Server.Entity;
using ReactApp2.Server.Interface;

namespace FinanceApp.Server.Controllers;

[Route("api/cashTransactions")]
[ApiController]
public class CashTransactionController:ControllerBase
{
    
    private readonly ICashRepositary _cashRepositary;

    public CashTransactionController(ICashRepositary cashRepositary){
        _cashRepositary = cashRepositary;
        
    }
    

    [HttpGet("id")]
    public async Task<IActionResult> GetExpensesById(int id)
    {
        var expenseTransaction = await _cashRepositary.GetCashTransactionsByIdAsync(id);
        if (expenseTransaction == null)
        {
            return NotFound();
        }
        return Ok(expenseTransaction);
        
    }
    
    [HttpPut("updateExpense")]
    public async Task<IActionResult> UpdateCashTransaction([FromBody] List<CashTransaction> cashTransactions)
    {
        
        foreach (var cashTransaction in cashTransactions)  // Correct loop syntax
        {
            
            Console.WriteLine($"Id: {cashTransaction.Id}");
            Console.WriteLine($"Name: {cashTransaction.Name}");
            Console.WriteLine($"Price: {cashTransaction.Price}");
            
            Console.WriteLine($"Taxis: {cashTransaction.Taxes}");
            Console.WriteLine($"WithoutTaxis: {cashTransaction.WithoutTaxes}");
            Console.WriteLine($"Sender: {cashTransaction.Sender}");
            
            Console.WriteLine($"Place: {cashTransaction.Place}");
            Console.WriteLine($"Country: {cashTransaction.Country}");
            
            Console.WriteLine($"ExpensesId: {cashTransaction.ExpensesId}");
            Console.WriteLine("-------------------------------------------");
            await _cashRepositary.UpdateCashTransactionAsync(cashTransaction);
        }
        return Ok(new { message = "Expense updated successfully" });


    }
    
    
    
    [HttpDelete("id")]
    public async Task<IActionResult> DeleteExpensesTransaction(int id)
    {
        await _cashRepositary.DeleteCashTransactionAsync(id);
        return Ok();
        
    }
    
    [HttpPost]
    public async Task<IActionResult> AddExpensesTransaction(CashTransaction cashTransaction)
    {
        await _cashRepositary.AddCashTransactionAsync(cashTransaction);
        return Ok(cashTransaction);
        
    }
    
}
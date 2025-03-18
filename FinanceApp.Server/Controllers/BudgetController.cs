using FinanceApp.Server.UserMappers;
using Microsoft.AspNetCore.Mvc;
using ReactApp2.Server.DateBase;
using ReactApp2.Server.DTOs;
using ReactApp2.Server.Entity;
using ReactApp2.Server.Interface;

namespace ReactApp2.Server.Controllers;

[Route("api/Budget")]
[ApiController]
public class BudgetController: ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IBudgetRepositary BudgetRepositary;
    public BudgetController(ApplicationDbContext context, IBudgetRepositary BudgetRepositary)
    {
        _context = context;
        this.BudgetRepositary = BudgetRepositary;
        
    }
    [HttpGet("getAllBudgetsByUser")]
    public async Task<IActionResult> GetALLBudget()
    {
        var budget= await BudgetRepositary.GetAllBudgetAsyncByUser();
        return Ok(budget);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetBudgetById([FromRoute]int id)
    {
        var budget = await BudgetRepositary.GetBudgetByIdAsync(id);
        if (budget==null)
        {
            return NotFound();
        }
        return Ok(budget);
    }

    [HttpPost("addBudget")]
    public async Task<IActionResult> AddBudget([FromBody] BudgetDTO budgetDto)
    {
        
        var result=await BudgetRepositary.AddBudgetAsync(BudgetMapper.ToEntity(budgetDto));
        return Ok(result);
        
    }
    [HttpPut("updateBudget/{id}")]
    
    public async Task<IActionResult> UpdateBudget([FromRoute] int id, [FromBody] BudgetDTO budgetDto)
    {
        var oldBudget =await BudgetRepositary.GetBudgetByIdAsync(id);
        if (oldBudget == null)
        {
            return NotFound();
        }
        var result =await BudgetRepositary.UpdateBudgetAsync(id, BudgetMapper.ToEntity(budgetDto));
        return Ok(result);
    }

    [HttpDelete("deleteBudget/{id}")]
    
    public async Task<IActionResult> DeleteBudget([FromRoute] int id)
    {
        var budget = await BudgetRepositary.DeleteBudgetAsync(id);
        if (budget == null)
        {
            return NotFound();
        }
       
        return NoContent();
    }

    [HttpGet("getExpensesByBudgetApi/{category}/{duration}")]
    public async Task<IActionResult> GetExpensesByBudgetApi([FromRoute] string category,[FromRoute] int duration)
    {
        var expenses=await BudgetRepositary.GetExpensesByBudgetAsync(category, duration);
        return Ok(expenses);
    }
}
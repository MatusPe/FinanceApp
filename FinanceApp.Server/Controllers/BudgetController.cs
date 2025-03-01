using Microsoft.AspNetCore.Mvc;
using ReactApp2.Server.DateBase;
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
    [HttpGet]
    public async Task<IActionResult> GetALLBudget()
    {
        var budget= await BudgetRepositary.GetAllBudgetAsync();
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

    [HttpPost]
    public async Task<IActionResult> AddBudget([FromBody] Budget budget)
    {
        
        await BudgetRepositary.AddBudgetAsync(budget);
        
        return CreatedAtAction(nameof(GetBudgetById), new{id=budget.Id},budget);
    }
    [HttpPut]
    [Route("{id}")]
    public async Task<IActionResult> UpdateBudget([FromRoute] int id, [FromBody] Budget budget)
    {
        var oldBudget =await BudgetRepositary.GetBudgetByIdAsync(id);
        if (oldBudget == null)
        {
            return NotFound();
        }
        await BudgetRepositary.UpdateBudgetAsync(id, budget);
        return Ok(oldBudget);
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<IActionResult> DeleteBudget([FromRoute] int id)
    {
        var budget = await BudgetRepositary.DeleteBudgetAsync(id);
        if (budget == null)
        {
            return NotFound();
        }
       
        return NoContent();
    } 
}
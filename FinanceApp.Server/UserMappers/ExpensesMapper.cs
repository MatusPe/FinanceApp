using ReactApp2.Server.DTOs;
using ReactApp2.Server.Entity;

namespace FinanceApp.Server.UserMappers;

public class ExpensesMapper
{
    public static ExpensesDTO MapToDto(Expenses expenses)
    {
        return new ExpensesDTO
        {
            Id = expenses.Id,
            Type = expenses.Type,
            Category = expenses.Category,
            Name = expenses.Name,
            Sender = expenses.Sender,
            Price = expenses.Price,
            Date = expenses.Date,
            
            
            
        
        };
    }
    
    public static Expenses MapToEntity(ExpensesDTO expensesDto)
    {
        return new Expenses
        {
            Id = expensesDto.Id,
            Type = expensesDto.Type,
            Category = expensesDto.Category,
            Name = expensesDto.Name,
            Sender = expensesDto.Sender,
            Price = expensesDto.Price,
            Date = expensesDto.Date,
            Userid = "7b1c6911-3ddc-45f8-b73a-47fac17619af",
            
            
            
            CashTransactions = expensesDto.CashTransactions ?? new List<CashTransaction>(),
            ExpenseTransactions = expensesDto.ExpenseTransactions ?? new List<ExpenseTransaction>()
        };
    }
}
using ReactApp2.Server.DTOs;
using ReactApp2.Server.Entity;

namespace ReactApp2.Server.Interface;

public interface IExpensesRepositary
{
    Task<List<ExpensesByDateDTO>> GetExpensesByDateAsync(String Name, DateTime startDate, DateTime endDate);
    
    Task<Expenses> AddExpensesAsync(Expenses expense);
    Task<Expenses> UpdateExpensesAsync(Expenses expense);
    Task<Expenses> DeleteExpensesAsync(int id);

    Task<Expenses> GetExpensesByIdAsync(int id);
    Task<Expenses> UpdateonlyExpensesAsync(Expenses expense);
    Task<List<ExpensesDTOforPiegraph>> GetExpensesByLastmonth(int month, int year);
    Task<List<ExpensesDTOforPiegraph>> GetGroupedExpensesByMonth(int year);
    Task<List<TwoExpensesDTO>> GetTwoExpensesAsync(int TargetMonth, int year);
}
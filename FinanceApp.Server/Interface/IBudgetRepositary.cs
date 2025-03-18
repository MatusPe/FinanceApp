using ReactApp2.Server.DTOs;
using ReactApp2.Server.Entity;

namespace ReactApp2.Server.Interface;

public interface IBudgetRepositary
{
    Task<List<BudgetDTO>> GetAllBudgetAsyncByUser();
    Task<Budget?> GetBudgetByIdAsync(int id);
    Task<Budget> AddBudgetAsync(Budget budget);
    Task<Budget> UpdateBudgetAsync(int id, Budget budget);
    Task<Budget?> DeleteBudgetAsync(int id);
    Task<Budget> GetBudgetByNameAsync(String name);

    Task<List<ExpensesDTOforPiegraph>> GetExpensesByBudgetAsync(String category, int duration);
}
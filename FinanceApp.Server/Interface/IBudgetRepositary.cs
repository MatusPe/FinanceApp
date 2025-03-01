using ReactApp2.Server.Entity;

namespace ReactApp2.Server.Interface;

public interface IBudgetRepositary
{
    Task<List<Budget>> GetAllBudgetAsync();
    Task<Budget?> GetBudgetByIdAsync(int id);
    Task<Budget> AddBudgetAsync(Budget budget);
    Task<Budget> UpdateBudgetAsync(int id, Budget budget);
    Task<Budget?> DeleteBudgetAsync(int id);
    Task<Budget> GetBudgetByNameAsync(String name);
}
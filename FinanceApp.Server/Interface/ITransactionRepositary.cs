using ReactApp2.Server.Entity;

namespace ReactApp2.Server.Interface;

public interface ITransactionRepositary
{
    Task<ExpenseTransaction> AddTransactionAsync(ExpenseTransaction expenseTransaction);
    Task<List<ExpenseTransaction>> GetCashTransactionsByExpensesIdAsync(int expensesId);
    Task<ExpenseTransaction> DeleteCashTransactionAsync(int id);
    Task<ExpenseTransaction> UpdateCashTransactionAsync(ExpenseTransaction expenseTransaction);
    Task<ExpenseTransaction> GetExpenseTransactionsByIdAsync(int id);
}
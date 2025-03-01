using ReactApp2.Server.Entity;

namespace ReactApp2.Server.Interface;

public interface ICashRepositary
{
    Task<CashTransaction> AddCashTransactionAsync(CashTransaction cashTransaction);
    Task<List<CashTransaction>> GetCashTransactionsByExpensesIdAsync(int expensesId);
    Task<CashTransaction> DeleteCashTransactionAsync(int id);
    Task<CashTransaction> UpdateCashTransactionAsync(CashTransaction cashTransaction);
    Task<CashTransaction> GetCashTransactionsByIdAsync(int id);
}
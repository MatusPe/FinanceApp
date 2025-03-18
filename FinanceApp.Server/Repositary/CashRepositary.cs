using Microsoft.EntityFrameworkCore;
using ReactApp2.Server.DateBase;
using ReactApp2.Server.Entity;
using ReactApp2.Server.Interface;

namespace ReactApp2.Server.Repositary;

public class CashRepositary: ICashRepositary
{

    private readonly ApplicationDbContext _context;

    public CashRepositary(ApplicationDbContext dbContext)
    {
        _context = dbContext;
    }
    public async Task<CashTransaction> AddCashTransactionAsync( CashTransaction cashTransaction)
    {
        await _context.CashTransactions.AddAsync(cashTransaction);
        await _context.SaveChangesAsync();
        return cashTransaction;
    }

    public Task<List<CashTransaction>> GetCashTransactionsByExpensesIdAsync(int expensesId)
    {
        throw new NotImplementedException();
    }
    
    public async Task<CashTransaction> GetCashTransactionsByIdAsync(int id)
    {
        var cashTransaction= await _context.CashTransactions.FirstOrDefaultAsync(x=>x.Id == id);
        if (cashTransaction == null)
        {
            return null;
        }
        return cashTransaction;
    }

    

    public async Task<CashTransaction> DeleteCashTransactionAsync(int id)
    {
        var cashTransaction = await GetCashTransactionsByIdAsync(id);
        _context.Remove(cashTransaction);
        await _context.SaveChangesAsync();
        return cashTransaction;
    }

    public async Task<CashTransaction> UpdateCashTransactionAsync(CashTransaction cashTransaction)
    {
        if (cashTransaction == null)
        {
            return null;
        }

        var existingCashTransaction = await _context.CashTransactions.FirstOrDefaultAsync(x => x.Id == cashTransaction.Id);

        if (existingCashTransaction == null)
        {
            await AddCashTransactionAsync(cashTransaction);
            await _context.SaveChangesAsync();
            return null;
        }
        
        
        existingCashTransaction.Name = cashTransaction.Name;
        existingCashTransaction.Price = cashTransaction.Price;
        existingCashTransaction.Taxes = cashTransaction.Taxes;
        existingCashTransaction.WithoutTaxes = cashTransaction.WithoutTaxes;
        existingCashTransaction.Sender = cashTransaction.Sender;
        existingCashTransaction.Place = cashTransaction.Place;
        existingCashTransaction.Country = cashTransaction.Country;
        
        await _context.SaveChangesAsync();
        return existingCashTransaction;
        

    }

    
}
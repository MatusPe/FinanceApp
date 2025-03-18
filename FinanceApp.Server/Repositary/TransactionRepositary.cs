using Microsoft.EntityFrameworkCore;
using ReactApp2.Server.DateBase;
using ReactApp2.Server.DTOs;
using ReactApp2.Server.Entity;
using ReactApp2.Server.Interface;

namespace ReactApp2.Server.Repositary;

public class TransactionRepositary:ITransactionRepositary
{
    
    private readonly ApplicationDbContext _context;

    public TransactionRepositary(ApplicationDbContext dbContext)
    {
        _context = dbContext;
    }
    public async Task<ExpenseTransaction> AddTransactionAsync(ExpenseTransaction expenseTransaction)
    {
        await _context.ExpenseTransactions.AddAsync(expenseTransaction);
        await _context.SaveChangesAsync();
        return expenseTransaction;
    }

    

    public async Task<ExpenseTransaction> GetExpenseTransactionsByIdAsync(int id)
    {
        var expense = await _context.ExpenseTransactions.FirstOrDefaultAsync(x => x.Id == id);
        if (expense == null)
        {
            return null;
        }
        return expense;
        
    }

    public Task<List<ExpenseTransaction>> GetCashTransactionsByExpensesIdAsync(int expensesId)
    {
        throw new NotImplementedException();
    }

    public async Task<ExpenseTransaction?> DeleteCashTransactionAsync(int id)
    {
        var transaction = await _context.ExpenseTransactions.FirstOrDefaultAsync(x => x.Id == id);

        if (transaction == null)
        {
            return null;
        }
        _context.Remove(transaction);
        await _context.SaveChangesAsync();
        return transaction;
    }

    public async Task<ExpenseTransaction> UpdateCashTransactionAsync(ExpenseTransaction expenseTransaction)
    {
        if (expenseTransaction == null)
        {
            return null;
        }
        var existingTransaction=await _context.ExpenseTransactions.FirstOrDefaultAsync(x => x.Id == expenseTransaction.Id);

        if (existingTransaction == null)
        {
            await AddTransactionAsync(expenseTransaction);
            await _context.SaveChangesAsync();
            return null;
        }
        existingTransaction.Name = expenseTransaction.Name;
        existingTransaction.Price = expenseTransaction.Price;
        
        existingTransaction.Taxes = expenseTransaction.Taxes;
        existingTransaction.WithoutTaxes = expenseTransaction.WithoutTaxes;
        existingTransaction.Sender = expenseTransaction.Sender;
        existingTransaction.IBAN = expenseTransaction.IBAN;
        existingTransaction.VB = expenseTransaction.VB;
        existingTransaction.IBANSender = expenseTransaction.IBANSender;
        
        await _context.SaveChangesAsync();
        return existingTransaction;
        
    }
}
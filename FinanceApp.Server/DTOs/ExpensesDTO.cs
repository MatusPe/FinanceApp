using System.ComponentModel.DataAnnotations;
using ReactApp2.Server.Entity;
using Transaction = System.Transactions.Transaction;

namespace ReactApp2.Server.DTOs;

public class ExpensesDTO
{
    [Key]
    public int Id{get;set;}
    
    [RegularExpression("Cash|Transaction", ErrorMessage = "Type must be either 'Cash' or 'Transaction'")]
    public String Type{get;set;}
    public String Category{get;set;}
    public String Name { get; set; }
    public String? Sender { get; set; }
    public Double Price { get; set; }
    public DateTime Date { get; set; }
    
    
    
    public List<CashTransaction> CashTransactions { get; set; } = new List<CashTransaction>();
    
    public List<ExpenseTransaction> ExpenseTransactions { get; set; }= new List<ExpenseTransaction>();
}
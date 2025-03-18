namespace ReactApp2.Server.DTOs;

public class CashTransactionDto
{
    public int Id{get;set;}
    public String? Name { get; set; }
    public Double Price { get; set; }
    
    public Double? Taxis { get; set; }
    public Double? WithoutTaxis { get; set; }
    public String? Sender { get; set; }
    
    public String? Place { get; set; }
    public String? Country { get; set; }
    
    public int ExpensesId { get; set; }
}
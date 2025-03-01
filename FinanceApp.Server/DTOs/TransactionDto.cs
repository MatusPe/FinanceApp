namespace ReactApp2.Server.DTOs;

public class TransactionDto
{
    public int Id{get;set;}
    public String Name { get; set; }
    public Double Price { get; set; }
    
    
    
    public Double? Taxis { get; set; }
    public Double? WithoutTaxis { get; set; }
    public String? Sender { get; set; }
    public String? Receiver { get; set; }
    public String? IBAN { get; set; }
    public String? VB { get; set; }
    public String? IBANSender { get; set; }
    
    
    public int ExpensesId { get; set; }

}
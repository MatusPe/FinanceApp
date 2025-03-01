using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReactApp2.Server.Entity;

public class CashTransaction
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id{get;set;}
    public String Name { get; set; }
    public Double Price { get; set; }
    public Double? Taxis { get; set; }
    public Double? WithoutTaxis { get; set; }
    public String? Sender { get; set; }
    public String? Receiver { get; set; }
    public String? Place { get; set; }
    public String? Country { get; set; }
    
    public int ExpensesId { get; set; }
    

    
    
}
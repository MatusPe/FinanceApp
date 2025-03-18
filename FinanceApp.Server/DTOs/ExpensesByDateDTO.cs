using System.ComponentModel.DataAnnotations;

namespace ReactApp2.Server.DTOs;

public class ExpensesByDateDTO
{
    [Key]
    public int Id{get;set;}
    
    [RegularExpression("Cash|Transaction", ErrorMessage = "Type must be either 'Cash' or 'Transaction'")]
    public String Type{get;set;}
    public String Category{get;set;}
    public String Name { get; set; }
    public String? Receiver { get; set; }
    public Double Price { get; set; }
    public DateTime Date { get; set; }
}
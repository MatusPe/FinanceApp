using System.ComponentModel.DataAnnotations;

namespace ReactApp2.Server.Entity;

public class Budget
{
    [Key]
    public int Id{get;set;}
    
    public String Name{get;set;}
    public Double LimitAmount { get; set; }
    public String Status { get; set; }
    public DateTime StartDate { get; set; }
   
    public String repeater  { get; set; }
    public int Interval { get; set; }
    public String Category { get; set; }
    public String Description { get; set; }
    public List<Expenses> expenses { get; set; }
    
    
    
}
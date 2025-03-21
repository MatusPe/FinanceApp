﻿using System.ComponentModel.DataAnnotations;
using FinanceApp.Server.Entity;
using FinanceApp.Server.Models;
using ReactApp2.Server.DTOs;

namespace ReactApp2.Server.Entity;

public class Expenses
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
    
    public string Userid{get;set;}
    
    public AppUser? AppUser{get;set;}
    public int? LoanId { get; set; }
    public Loan? Loan { get; set; }
    
    public int? BudgetId { get; set; }
    public Budget? Budget { get; set; }
    public List<CashTransaction>? CashTransactions{get;set;}
    public List<ExpenseTransaction>? ExpenseTransactions{get;set;}
    
    public override string ToString()
    {
        return $"Id: {Id}, Type: {Type}, Category: {Category}, Name: {Name}, Sender: {Receiver}, " +
               $"Price: {Price}, Date: {Date}, Userid: {Userid}, " +
               $"CashTransactions: {CashTransactions?.Count ?? 0}, ExpenseTransactions: {ExpenseTransactions?.Count ?? 0}";
    }
}
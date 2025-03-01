using System.ComponentModel.DataAnnotations;

namespace ReactApp2.Server.DTOs;

public class RegisterDiot
{
    [Required]
    public string? Username { get; set; }
    [Required]
    public string? Password { get; set; }
    [Required]
    [EmailAddress]
    public string? Email { get; set; }
}
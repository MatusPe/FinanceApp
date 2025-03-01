using System.ComponentModel.DataAnnotations;

namespace ReactApp2.Server.DTOs;

public class LoginDTOs
{
    [Required]
    public string? Username { get; set; }
    [Required]
    public string? Password { get; set; }
    
}
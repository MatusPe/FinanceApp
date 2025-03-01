using FinanceApp.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp2.Server.DTOs;
using ReactApp2.Server.Interface;

namespace FinanceApp.Server.Controllers;

[Route("api/account")]
[ApiController]
public class AccountController:ControllerBase
{
    
    private readonly UserManager<AppUser> _userManager;
    private readonly ITokenService _tokenService;
    private readonly SignInManager<AppUser> _signinManager;
    public AccountController(UserManager<AppUser> userManager, ITokenService tokenService, SignInManager<AppUser> signInManager)
    {
        _userManager = userManager;
        _tokenService = tokenService;
        _signinManager = signInManager;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDTOs loginDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName.ToLower() == loginDto.Username.ToLower());

        if (user == null) return Unauthorized("Invalid username!");
        
       

        var result = await _signinManager.CheckPasswordSignInAsync(user, loginDto.Password, lockoutOnFailure: false);

        if (!result.Succeeded) return Unauthorized("Username not found and/or password incorrect");

        
        

        Response.Cookies.Append("token", _tokenService.CreateToken(user), new CookieOptions
        {
            Expires = DateTime.UtcNow.AddDays(7),  // Set expiration time for the token cookie
            HttpOnly = true,  // Ensure the cookie is HttpOnly for security
            Secure = true,    // Cookie is sent only over HTTPS
            SameSite = SameSiteMode.Strict  // Prevent sending cookies in cross-site requests
        });
        
        return Ok(
            
            
        );
    }
    
    
    [HttpPost("logout")]
    public IActionResult ProtectedEndpoint()
    {
        Response.Cookies.Delete("token");
        return Ok("Cookies was cleared!");
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDiot registerDiot)
    {
        try
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var appUser = new AppUser
            {
                Email = registerDiot.Email,
                UserName = registerDiot.Username,

            };
            var createUser= await _userManager.CreateAsync(appUser, registerDiot.Password);
            if (createUser.Succeeded)
            {
                var roles = await _userManager.AddToRoleAsync(appUser, "User");
                if (roles.Succeeded)
                {
                    

                    Response.Cookies.Append("token", _tokenService.CreateToken(appUser), new CookieOptions
                    {
                        Expires = DateTime.UtcNow.AddDays(7),  // Set expiration time for the token cookie
                        HttpOnly = true,  // Ensure the cookie is HttpOnly for security
                        Secure = true,    // Cookie is sent only over HTTPS
                        SameSite = SameSiteMode.Strict  // Prevent sending cookies in cross-site requests
                    });
                    return Ok("You are authorized!");
                }else
                {
                    return StatusCode(500, roles.Errors);
                }
            }
            else
            {
                return StatusCode(500, createUser.Errors);
            }
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }

        
    }
    
    
}
using FinanceApp.Server.Models;

namespace ReactApp2.Server.Interface;

public interface ITokenService
{
    string CreateToken(AppUser user);
}

using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController : BaseApiController
{
    private readonly DataContext _context ;
    private readonly ItokenService _tokenService;

    public AccountController(DataContext context , ItokenService tokenService){

        _context = context ;
        _tokenService = tokenService;
    }

private async Task<bool> UserExists(string userName){

return  await _context.Users.AnyAsync(x=>x.UserName.ToLower() == userName.ToLower());

}

[HttpPost("register")]
public async Task<ActionResult<UserDto>> Register (RegisterDto registerDto)
{
if(await UserExists(registerDto.UserName)) return BadRequest("username already taken"); 

 using var hmac = new HMACSHA512();

        var user = new AppUser
        {
            UserName = registerDto.UserName.ToLower(),
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
            PasswordSalt = hmac.Key
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return new UserDto(){
            Username = user.UserName ,
            TokenKey = _tokenService.CreateToken(user)
        }  ;
}
[HttpPost("login")]
public async Task<ActionResult<UserDto>> Login(LoginDto login){

    var user = await _context.Users.FirstOrDefaultAsync(x=> x.UserName == login.UserName);

    if(user == null)return Unauthorized("Invalid Username !");

    using var hmac = new HMACSHA512(user.PasswordSalt);

    var computedPassword = hmac.ComputeHash(Encoding.UTF8.GetBytes(login.Password));

    for(int i=0 ; i<computedPassword.Length ; i++){

        if( computedPassword[i]!= user.PasswordHash[i] )return Unauthorized("Invalid password !");
    }

     return new UserDto(){
            Username = user.UserName ,
            TokenKey = _tokenService.CreateToken(user)
        } ;
}

}

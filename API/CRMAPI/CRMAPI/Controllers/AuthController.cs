using CRMAPI.Data;
using CRMAPI.Klasy;
using CRMAPI.Services;
using CRMAPI.UserRepo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;


namespace CRMAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]


  public class AuthController : ControllerBase
  {
    public static User user = new User();
    private readonly IConfiguration _configuration;
    private readonly IUserService _userService;
    private readonly DataContext _context;


    public AuthController(IConfiguration configuration, IUserService userService, DataContext context)
    {
      _configuration = configuration;
      _userService = userService;
      _context = context;

    }

    [HttpGet, Authorize]
    public ActionResult<string> GetMe()
    {
      UserDto userData = new UserDto();
      return Ok(userData);
    }

    [HttpPost("register")]
    public async Task<ActionResult<User>> Register(UserDto request)
    {
      if (string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.Password))
      {
        return BadRequest("Niepoprawne dane");
      }

      CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

      var userRepository = new UserRepository(_context);

      var user = new User
      {
        Username = request.Username,
        PasswordHash = passwordHash,
        PasswordSalt = passwordSalt,
        Rola = request.Rola
      };

      await userRepository.AddUser(user);

      return Ok(user);
    }

    [HttpPost("login")]
    public async Task<ActionResult<string>> Login(UserDto request)
    {
      var userRepository = new UserRepository(_context);
      var user = await userRepository.GetUserByUsername(request.Username);

        if (user == null || string.IsNullOrWhiteSpace(user.Username))
        {
          return BadRequest("Brak Użytkownika");
        }

        if (!VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
        {
          return BadRequest("Wrong password.");
        }

        string token = CreateToken(user);

        var refreshToken = GenerateRefreshToken();
        SetRefreshToken(refreshToken);

        return Ok(refreshToken);
        //return Ok(userSchema);
      
    }

    [HttpPost("refresh-token")]
    public async Task<ActionResult<string>> RefreshToken()
    {
      var refreshToken = Request.Cookies["refreshToken"];

      if (!user.RefreshToken.Equals(refreshToken))
      {
        return Unauthorized("Invalid Refresh Token.");
      }
      else if (user.TokenExpires < DateTime.Now)
      {
        return Unauthorized("Token expired.");
      }

      string token = CreateToken(user);
      var newRefreshToken = GenerateRefreshToken();
      SetRefreshToken(newRefreshToken);

      return Ok(token);
    }

    private RefreshToken GenerateRefreshToken()
    {
      var refreshToken = new RefreshToken
      {
        Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
        Expires = DateTime.Now.AddDays(7),
        Created = DateTime.Now
      };

      return refreshToken;
    }

    private void SetRefreshToken(RefreshToken newRefreshToken)
    {
      var cookieOptions = new CookieOptions
      {
        HttpOnly = true,
        Expires = newRefreshToken.Expires
      };
      Response.Cookies.Append("refreshToken", newRefreshToken.Token, cookieOptions);

      user.RefreshToken = newRefreshToken.Token;
      user.TokenCreated = newRefreshToken.Created;
      user.TokenExpires = newRefreshToken.Expires;
    }

    private string CreateToken(User user)
    {
      List<Claim> claims = new List<Claim>
      {
         new Claim(ClaimTypes.Name, user.Username),
         new Claim(ClaimTypes.Role, "Admin")
      };
      // Generate a random key of at least 512 bits
      var keyBytes = new byte[64]; // 512 bits
      using (var rng = RandomNumberGenerator.Create())
      {
        rng.GetBytes(keyBytes);
      }

      var key = new SymmetricSecurityKey(keyBytes);

      var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

      var token = new JwtSecurityToken(
          claims: claims,
          expires: DateTime.Now.AddDays(1),
          signingCredentials: creds);

      var jwt = new JwtSecurityTokenHandler().WriteToken(token);

      return jwt;
    }

    private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
    {
      using (var hmac = new HMACSHA512())
      {
        passwordSalt = hmac.Key;
        passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
      }
    }

    private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
    {
      using (var hmac = new HMACSHA512(passwordSalt))
      {
        var passwordBytes = Encoding.UTF8.GetBytes(password);
        var computedHash = hmac.ComputeHash(passwordBytes);
        return computedHash.SequenceEqual(passwordHash);
      }
    }
  }
}

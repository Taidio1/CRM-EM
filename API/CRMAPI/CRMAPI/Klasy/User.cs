using System.ComponentModel.DataAnnotations;

namespace CRMAPI.Klasy
{
  public class User
  {
    [Key]
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Rola { get; set; } = string.Empty;
    public byte[] PasswordHash { get; set; }
    public byte[] PasswordSalt { get; set; }
    public string RefreshToken { get; set; } = string.Empty ;
    public DateTime TokenCreated { get; set; }
    public DateTime TokenExpires { get; set; }
  }
}

using System.ComponentModel.DataAnnotations;

namespace CRMAPI.Klasy
{
  public class UserDto
  {
    [Key]
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string? Rola { get; set; } = string.Empty;

  }
}

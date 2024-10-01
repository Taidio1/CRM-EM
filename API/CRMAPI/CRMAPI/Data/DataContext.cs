using CRMAPI.Klasy;
using Microsoft.EntityFrameworkCore;

namespace CRMAPI.Data
{
  public class DataContext : DbContext
  {
    public DataContext(DbContextOptions<DataContext> options) : base(options) { }

    public DbSet<Customer> Customers => Set<Customer>();
    public DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      optionsBuilder.UseSqlServer(@"Data Source=serwer;Initial Catalog=baza_danych;User ID=uzytkownik;Password=haslo;");
    }

  }
}

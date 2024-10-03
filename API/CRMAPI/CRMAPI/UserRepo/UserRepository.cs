using CRMAPI.Data;
using CRMAPI.Klasy;
using Microsoft.EntityFrameworkCore;

namespace CRMAPI.UserRepo
{
  public class UserRepository
  {
    private readonly DataContext _context;

    public UserRepository(DataContext context)
    {
      _context = context;
    }

    public async Task<List<User>> GetAllUsers()
    {
      return await _context.Users.ToListAsync();
    }

    public async Task AddUser(User user)
    {
      _context.Users.Add(user);
      await _context.SaveChangesAsync();
    }

    public async Task UpdateUser(User user)
    {
      _context.Users.Update(user);
      await _context.SaveChangesAsync();
    }

    public async Task DeleteUser(int id)
    {
      var user = await _context.Users.FindAsync(id);
      if (user != null)
      {
        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
      }
    }
    public async Task<User> GetUserByUsername(string username)
    {
        return await _context.Users
            .Where(u => u.Username == username)
            .FirstOrDefaultAsync();
    }
  }
}

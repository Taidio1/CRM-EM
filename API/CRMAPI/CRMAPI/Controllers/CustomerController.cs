using CRMAPI.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRMAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class CustomerController : ControllerBase
  {
    private readonly DataContext _context;
    public CustomerController(DataContext context)
    {
      _context = context;
    }


    [HttpGet]
    public async Task<ActionResult<List<Customer>>>GetCustomer()
    {
      return Ok(await _context.Customers.ToListAsync());
    }





    [HttpGet("api/customer-purpose-stats")]
    public IActionResult GetCustomerPurposeStats()
    {
      var purposeCounts = _context.Customers
          .GroupBy(c => c.CelPobytu)
          .Select(g => new
          {
            Purpose = g.Key,
            Count = g.Count()
          })
          .ToList();

      return Ok(purposeCounts);
    }
  }
}

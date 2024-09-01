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

    [HttpPost]
    public async Task<ActionResult<List<Customer>>> CreateCustomer(Customer customer)
    {
      _context.Customers.Add(customer);
      await _context.SaveChangesAsync();

      return Ok(await _context.Customers.ToListAsync());
    }

    [HttpPut]
    public async Task<ActionResult<List<Customer>>> UpdateCustomer(Customer customer)
    {
      var dbCustomer = await _context.Customers.FindAsync(customer.Id);
      if (dbCustomer == null)
        return BadRequest("Customer not found.");
      dbCustomer.Name = customer.Name;
      dbCustomer.Status = customer.Status;
      dbCustomer.CelPobytu = customer.CelPobytu;
      dbCustomer.PodLegPob = customer.PodLegPob;
      dbCustomer.KrajPoch = customer.KrajPoch;
      dbCustomer.Telefon = customer.Telefon;
      dbCustomer.Adres = customer.Adres;
      dbCustomer.StatusPla = customer.StatusPla;
      dbCustomer.DataZloWnio = customer.DataZloWnio;
      dbCustomer.Email = customer.Email;
      dbCustomer.DataUro = customer.DataUro;
      dbCustomer.Notes = customer.Notes;
      dbCustomer.TotalSpend = customer.TotalSpend;
      dbCustomer.NumerSprawy = customer.NumerSprawy;
      dbCustomer.Inspektor = customer.Inspektor;
      dbCustomer.DataWydWnio = customer.DataWydWnio;
      dbCustomer.DataOdbKarty = customer.DataOdbKarty;
      dbCustomer.DataOdbDec = customer.DataOdbDec;
      dbCustomer.DataZakLegPob = customer.DataZakLegPob;
      dbCustomer.Firma = customer.Firma;

      await _context.SaveChangesAsync();

      return Ok(await _context.Customers.ToListAsync());
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<List<Customer>>> DeleteCustomer(int id)
    {
      var dbCustomer = await _context.Customers.FindAsync(id);
      if (dbCustomer == null) 
        return BadRequest("Customer not found");

      _context.Customers.Remove(dbCustomer);
      await _context.SaveChangesAsync();

      return Ok(await _context.Customers.ToListAsync());
    }



    [HttpGet("customer-purpose-stats")]
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

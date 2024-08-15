using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CRMAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class CustomerController : ControllerBase
  {
    [HttpGet]
    public async Task<ActionResult<List<Customer>>>GetCustomer()
    {
      return new List<Customer>
      {
        new Customer
        {
          Id = 1,
          Name = "Test",
          Status = "Brak",
          CelPobytu = "Wakacje"
        }
      };
    }
  }
}

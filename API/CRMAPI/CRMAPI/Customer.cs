using System.Data.SqlTypes;

namespace CRMAPI
{
  public class Customer
  {
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string? Status { get; set; }
    public string? CelPobytu { get; set; }
    public string? PodLegPob { get; set; }
    public string? KrajPoch { get; set; }
    public int? Telefon { get; set; }
    public string? Adres { get; set; }
    public string? StatusPla { get; set; }
    public DateOnly? DataZloWnio { get; set; }
    public string? Email { get; set; }
    public DateOnly? DataUro { get; set; }
    public string? Notes { get; set; }
    public string? Creator { get; set; }
    public decimal? TotalSpend { get; set; }
    public string? NumerSprawy { get; set; }
    public string? Inspektor { get; set; }
    public DateOnly? DataWydWnio { get; set; }
    public DateOnly? DataOdbKarty { get; set; }
    public DateOnly? DataOdbDec { get; set; }
    public DateOnly? DataZakLegPob { get; set; }
    public string? Firma { get; set; }
  }
}

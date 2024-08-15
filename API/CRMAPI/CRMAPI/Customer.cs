namespace CRMAPI
{
  public class Customer
  {
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Status { get; set; }
    public string CelPobytu { get; set; }
    public string PodLegPob { get; set; }
    public string KrajPoch { get; set; }
    public int? Telefon { get; set; }
    public string Adres { get; set; }
    public string StatusPla { get; set; }
    public DateTime? DataZloWnio { get; set; }
    public string Email { get; set; }
    public DateTime? DataUro { get; set; }
    public string Notes { get; set; }
    public string Creator { get; set; }
    public decimal? TotalSpend { get; set; }
    public byte[] Doc { get; set; } 
    public string NumerSprawy { get; set; }
    public string Inspektor { get; set; }
    public DateTime? DataWydWnio { get; set; }
    public DateTime? DataOdbKarty { get; set; }
    public DateTime? DataOdbDec { get; set; }
    public DateTime? DataZakLegPob { get; set; }
    public string Firma { get; set; }
  }
}

using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRMAPI.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Customers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CelPobytu = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PodLegPob = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    KrajPoch = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Telefon = table.Column<int>(type: "int", nullable: true),
                    Adres = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StatusPla = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DataZloWnio = table.Column<DateOnly>(type: "date", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DataUro = table.Column<DateOnly>(type: "date", nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Creator = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TotalSpend = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    NumerSprawy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Inspektor = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DataWydWnio = table.Column<DateOnly>(type: "date", nullable: true),
                    DataOdbKarty = table.Column<DateOnly>(type: "date", nullable: true),
                    DataOdbDec = table.Column<DateOnly>(type: "date", nullable: true),
                    DataZakLegPob = table.Column<DateOnly>(type: "date", nullable: true),
                    Firma = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customers", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Customers");
        }
    }
}

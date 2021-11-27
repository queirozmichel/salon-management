using Microsoft.EntityFrameworkCore.Migrations;

namespace SalonManagement.API.Data.Migrations
{
    public partial class Inicial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Servicos",
                columns: table => new
                {
                    ServicoId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    DataServico = table.Column<string>(type: "TEXT", nullable: true),
                    Cliente = table.Column<string>(type: "TEXT", nullable: true),
                    DescricaoServico = table.Column<string>(type: "TEXT", nullable: true),
                    ProdutoUtilizadoServico = table.Column<string>(type: "TEXT", nullable: true),
                    ValorServico = table.Column<double>(type: "REAL", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Servicos", x => x.ServicoId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Servicos");
        }
    }
}

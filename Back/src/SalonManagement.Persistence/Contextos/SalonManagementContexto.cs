using Microsoft.EntityFrameworkCore;
using SalonManagement.Domain;

namespace SalonManagement.Persistence.Contextos
{
    public class SalonManagementContexto : DbContext
    {
        public SalonManagementContexto(DbContextOptions<SalonManagementContexto> opcoes) : base(opcoes) { }
        public DbSet<Servico> Servico { get; set; }
        public DbSet<Cliente> Cliente { get; set; }
        public DbSet<Produto> Produto { get; set; }
        public DbSet<Profissional> Profissional { get; set; }
        public DbSet<ProdutoServico> ProdutoServico { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ProdutoServico>()
            .HasKey(PS => new { PS.ServicoId, PS.ProdutoId });
        }
    }
}
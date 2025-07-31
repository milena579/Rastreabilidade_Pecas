
using Microsoft.EntityFrameworkCore;
using Rastreabilidade.API;

namespace Rastreabilidade.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Peca> Pecas { get; set; }
        public DbSet<Estacao> Estacoes { get; set; }
        public DbSet<Movimentacao> Movimentacoes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Estacao>()
                .HasIndex(e => e.Ordem)
            .   IsUnique();

            modelBuilder.Entity<Estacao>()
            .HasData(
                new Estacao { Id = 1, Nome = "Recebimento", Ordem = 1 },
                new Estacao { Id = 2, Nome = "Montagem", Ordem = 2 },
                new Estacao { Id = 3, Nome = "Finalizada", Ordem = 3 }
            );
            
            modelBuilder.Entity<Movimentacao>()
                .HasOne(m => m.Peca)
                .WithMany(p => p.Movimentacoes)
                .HasForeignKey(m => m.PecaId);

            modelBuilder.Entity<Movimentacao>()
                .HasOne(m => m.Origem)
                .WithMany()
                .HasForeignKey(m => m.OrigemId)
                .OnDelete(DeleteBehavior.Restrict); 

            modelBuilder.Entity<Movimentacao>()
                .HasOne(m => m.Destino)
                .WithMany()
                .HasForeignKey(m => m.DestinoId)
                .OnDelete(DeleteBehavior.Restrict);

            base.OnModelCreating(modelBuilder);
        }
    }
}

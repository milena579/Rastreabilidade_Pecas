
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
            modelBuilder.Entity<Peca>()
                .HasIndex(p => p.Codigo)
                .IsUnique();
            
            modelBuilder.Entity<Movimentacao>()
                .HasOne(m => m.Peca)
                .WithMany(p => p.Movimentacoes)
                .HasForeignKey(m => m.PecaId);

            modelBuilder.Entity<Movimentacao>()
                .HasOne(m => m.Origem)
                .WithMany()
                .HasForeignKey(m => m.OrigemId)
                .OnDelete(DeleteBehavior.Restrict); // evita delete em cascata

            modelBuilder.Entity<Movimentacao>()
                .HasOne(m => m.Destino)
                .WithMany()
                .HasForeignKey(m => m.DestinoId)
                .OnDelete(DeleteBehavior.Restrict);

            base.OnModelCreating(modelBuilder);
        }
    }
}

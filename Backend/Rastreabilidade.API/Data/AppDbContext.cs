public class AppDbContext : DbContext
{
    public AppDbContext(AppDbContextOptions<AppDbContext> option) : base(options) { }
    public DbSet<Peca> Pecas { get; set; }
    public DbSet<Estacao> Estacoes { get; set; }
    public DbSet<Movimentacao> Movimentacoes { get; set; }

    protected override void OnModelCreating()
    {
        modelBuilder.Entity<Peca>().HasIndex(p => p.Codigo).isUnique();

        base.OnModelCreating(modelBuilder);
    }

    
}
using Microsoft.EntityFrameworkCore;

namespace backend.Data;

using backend.Models;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) { }

    // =========================
    // DbSets
    // =========================
    public DbSet<tb_usuario> Usuarios { get; set; }
    public DbSet<tb_cliente> Clientes { get; set; }
    public DbSet<tb_conta> Contas { get; set; }
    public DbSet<tb_saldo> Saldos { get; set; }
    public DbSet<tb_cartao> Cartoes { get; set; }
    public DbSet<tb_transacao> Transacoes { get; set; }
    public DbSet<tb_alerta> Alertas { get; set; }
    public DbSet<tb_logs> Logs { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // =========================
        // USUARIO
        // =========================
        modelBuilder.Entity<tb_usuario>(entity =>
        {
            entity.ToTable("tb_usuario");
            entity.Property(u => u.usu_tipo_usuario_enum)
            .HasConversion<int>();

            entity.HasKey(u => u.usu_id);
            

        });

        // =========================
        // CLIENTE
        // =========================
        modelBuilder.Entity<tb_cliente>( entity =>
        {
            entity.ToTable("tb_cliente")
            .HasIndex(c => c.cli_cpf)
            .IsUnique();

            entity.HasKey(c => c.cli_id);
        });

        // =========================
        // CONTA
        // =========================
        modelBuilder.Entity<tb_conta>( entity =>
        {
            entity.ToTable("tb_conta");
            entity.HasKey (c => c.cnt_id);
            
            entity.HasOne(c => c.Cliente)
            .WithMany(c => c.Contas)
            .HasForeignKey(c => c.cnt_cli_id)
            .OnDelete(DeleteBehavior.Restrict);
            
            
            
            entity.Property(c => c.cnt_tipoConta)
            .HasConversion<int>();
            
        });

       

        // =========================
        // SALDO (1:1 com CONTA)
        // =========================
        modelBuilder.Entity<tb_saldo>(entity =>
        {
            entity.ToTable("tb_saldo");
            entity.HasKey(s => s.sld_id);
            entity.HasIndex(s => s.sld_contaId).IsUnique();

            entity.HasOne(s => s.Conta)
            .WithOne(c => c.Saldo)
            .HasForeignKey<tb_saldo>(s => s.sld_contaId)
            .OnDelete(DeleteBehavior.Cascade);
            
        });

        // =========================
        // CARTAO
        // =========================
        modelBuilder.Entity<tb_cartao>( entity =>
        {
            entity.ToTable("tb_cartao");

            entity.HasKey("crt_id");
            
            entity.HasOne(c => c.Conta)
            .WithMany(c => c.Cartoes)
            .HasForeignKey(c => c.crt_contaId);
            
            entity.Property(c => c.crt_tipoCartao)
            .HasConversion<int>();
        });
            

        // =========================
        // MOVIMENTACAO
        // =========================
        modelBuilder.Entity<tb_transacao>(entity =>
        {
            
            entity.ToTable("tb_transacao");
            entity.HasKey("trs_id");
            entity.HasOne(m => m.Conta)
            .WithMany(c => c.Transacoes)
            .HasForeignKey(m => m.trs_cnt_id);
            
            entity.Property(m => m.trs_tipoTransacao)
            .HasConversion<int>();
        });

      

        // =========================
        // ALERTA
        // =========================
        modelBuilder.Entity<tb_alerta>(entity =>
        {
            entity.ToTable("tb_alerta");

            entity.HasKey("alt_id");
            
            entity.HasOne(a => a.transacao)
            .WithMany(m => m.Alertas)
            .HasForeignKey(a => a.alt_trasacaoId)
            .OnDelete(DeleteBehavior.SetNull);

            entity.Property(a => a.alt_status)
            .HasConversion<int>();
        });


        // =========================
        // LOG
        // =========================
        modelBuilder.Entity<tb_logs>( entity =>
        {
            entity.ToTable("tb_logs");
            entity.HasKey("log_id");
            entity.HasOne(l => l.Usuario)
            .WithMany()
            .HasForeignKey(l => l.log_usuarioId)
            .OnDelete(DeleteBehavior.SetNull);
            
        });
    }
}

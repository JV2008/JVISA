using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository;

public class ClienteRepository : IClienteRepository
{
    private readonly AppDbContext _context;

    public ClienteRepository(AppDbContext context)
    {
        _context = context;
    }

    // =========================
    // CLIENTE
    // =========================
    public async Task<tb_cliente?> GetByCli_Usu_Id(int usu_id)
    {
        return await _context.Clientes
            .FirstOrDefaultAsync(t => 
            t.cli_usu_id == usu_id);
    }

    public async Task<tb_cliente?> GetByCli_Id(int cli_usu_id)
{
    return await _context.Clientes
        .Include(c => c.Usuario) 
        .FirstOrDefaultAsync(c => c.cli_usu_id == cli_usu_id);
}
   
    public async Task UpdateCliente (tb_cliente cliente)
    {
        _context.Clientes.Update(cliente);
        await _context.SaveChangesAsync();
    }

     public async Task Add(tb_cliente cliente)
    {
        _context.Clientes.Add(cliente);
        await _context.SaveChangesAsync();
    }

     public async Task<tb_cliente?> GetByCPF(string cpf)
    {
        return await _context.Clientes
            .FirstOrDefaultAsync(t => t.cli_cpf == cpf);
    }



    // =========================
    // SALDO
    // =========================
    public async Task<tb_saldo?> GetBySld_Cli_Id(int cli_id)
    {
        return await _context.Saldos
            .FirstOrDefaultAsync(s => s.sld_cli_id == cli_id);
    }

    public async Task UpdateSld(tb_saldo saldo)
    {
        _context.Saldos.Update(saldo);
        await _context.SaveChangesAsync();
    }

    // =========================
    // CARTÃO
    // =========================
    public async Task<tb_cartao?> GetByCrt_Cli_Id(int cli_id)
    {
        return await _context.Cartoes
            .FirstOrDefaultAsync(c => c.crt_cli_id == cli_id);
    }

    // =========================
    // TRANSAÇÕES
    // =========================
    public async Task<List<tb_transacao>> GetAllByTrs_Cli_Id(int cli_id)
    {
        return await _context.Transacoes
            .Where(t => t.trs_cli_id == cli_id)
            .ToListAsync();
    }

    public async Task<tb_transacao?> GetByTrs_Id_And_Cli_Id(int trs_id, int cli_id)
    {
        return await _context.Transacoes
            .FirstOrDefaultAsync(t => t.trs_id == trs_id && t.trs_cli_id == cli_id);
    }

    public async Task AddTrs(tb_transacao transacao)
    {
        await _context.Transacoes.AddAsync(transacao);
        await _context.SaveChangesAsync();
    }
}
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
     public async Task<tb_cliente?> GetByCli_Email(string email)
    {
        return await _context.Clientes
            .FirstOrDefaultAsync(t => t.Usuario.usu_email== email);
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

    public async Task<tb_transacao?> GetByChavePix(string chave_pix)
    {
        return await _context.Transacoes
            .FirstOrDefaultAsync(t => t.trs_cli_chave_pix == chave_pix);
    }

    public async Task AddTrs(tb_transacao transacao)
    {
        await _context.Transacoes.AddAsync(transacao);
        await _context.SaveChangesAsync();
    }



    // =========================
    // ➕ BUSCA POR CHAVE PIX (SUPORTA OS 3 TIPOS)
    // =========================
    
    public async Task<tb_cliente?> GetByChavePixAsync(ChavePix tipo, string valor)
    {
        // Normaliza o valor para comparação (remove formatação)
        var valorNormalizado = NormalizarChavePix(valor, tipo);

        return tipo switch
        {
            ChavePix.TELEFONE => await _context.Clientes
                .Include(c => c.Usuario)
                .FirstOrDefaultAsync(c => c.cli_telefone == valorNormalizado),

            ChavePix.CPF => await _context.Clientes
                .Include(c => c.Usuario)
                .FirstOrDefaultAsync(c => c.cli_cpf == valorNormalizado),

            ChavePix.EMAIL => await _context.Clientes
                .Include(c => c.Usuario)
                .FirstOrDefaultAsync(c => c.Usuario != null && c.Usuario.usu_email == valorNormalizado),

           

            _ => throw new ArgumentException($"Tipo de chave PIX inválido: {tipo}")
        };
    }

    // Método auxiliar para normalizar chaves (remove pontos, traços, etc.)
    private string NormalizarChavePix(string valor, ChavePix tipo)
    {
        return tipo switch
        {
            ChavePix.TELEFONE => valor.Replace(" ", "").Replace("-", "").Replace("(", "").Replace(")", ""),
            ChavePix.CPF => valor.Replace(".", "").Replace("-", ""),
            ChavePix.EMAIL => valor.Trim().ToLower(),
            _ => valor
        };
    }

    // ➕ Validação rápida: verifica se a chave PIX existe
    public async Task<bool> ChavePixExisteAsync(ChavePix tipo, string valor)
    {
        var valorNormalizado = NormalizarChavePix(valor, tipo);

        return tipo switch
        {
            ChavePix.TELEFONE => await _context.Clientes.AnyAsync(c => c.cli_telefone == valorNormalizado),
            ChavePix.CPF => await _context.Clientes.AnyAsync(c => c.cli_cpf == valorNormalizado),
            ChavePix.EMAIL => await _context.Clientes.AnyAsync(c => c.Usuario != null && c.Usuario.usu_email == valorNormalizado),
            _ => false
        };
    }
}
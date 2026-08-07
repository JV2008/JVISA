// Repository/TransacaoRepository.cs
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository;

public class TransacaoRepository : ITransacaoRepository
{
    private readonly AppDbContext _context;

    public TransacaoRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<tb_transacao>> GetAllByCliIdAsync(int cli_id)
    {
        return await _context.Transacoes
            .Where(t => t.trs_cli_id == cli_id)
            .OrderByDescending(t => t.trs_dataHora)
            .ToListAsync();
    }

    public async Task<tb_transacao?> GetByIdAsync(int trs_id, int cli_id)
    {
        return await _context.Transacoes
            .FirstOrDefaultAsync(t => t.trs_id == trs_id && t.trs_cli_id == cli_id);
    }

    public async Task<tb_transacao?> GetByChavePixAsync(string chave_pix)
    {
        return await _context.Transacoes
            .FirstOrDefaultAsync(t => t.trs_cli_chave_pix == chave_pix);
    }

    public void Add(tb_transacao transacao)
    {
        _context.Transacoes.Add(transacao);
        // NÃO salva aqui - quem controla é o Service
    }

    public void AddRange(IEnumerable<tb_transacao> transacoes)
    {
        _context.Transacoes.AddRange(transacoes);
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}
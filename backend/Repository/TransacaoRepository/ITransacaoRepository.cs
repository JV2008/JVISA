// Repository/ITransacaoRepository.cs
using backend.Models;

namespace backend.Repository;

public interface ITransacaoRepository
{
    // Leitura
    Task<List<tb_transacao>> GetAllByCliIdAsync(int cli_id);
    Task<tb_transacao?> GetByIdAsync(int trs_id, int cli_id);
    Task<tb_transacao?> GetByChavePixAsync(string chave_pix);
    
    // Escrita (sem salvar - para transações atômicas)
    void Add(tb_transacao transacao);
    void AddRange(IEnumerable<tb_transacao> transacoes);
    
    // Persistência (chamada no commit da transação)
    Task SaveChangesAsync();
}
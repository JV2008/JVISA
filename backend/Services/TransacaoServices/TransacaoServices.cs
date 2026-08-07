using backend.Repository;
using backend.Data;
using backend.Models;
public class TransacaoService
{
    private readonly IClienteRepository _clienteRepo;
    private readonly ITransacaoRepository _transacaoRepo;
    private readonly AppDbContext _context;

    public TransacaoService(IClienteRepository clienteRepo, ITransacaoRepository transacaoRepo, AppDbContext context)
    {
        _clienteRepo = clienteRepo;
        _transacaoRepo = transacaoRepo;
        _context = context;
    }

    public async Task<TransacaoResponse> ExecutarAsync(TransacaoDto request, string remetenteEmail)
    {
        var remetente = await _clienteRepo.GetByChavePixAsync(ChavePix.EMAIL, remetenteEmail)
            ?? throw new Exception("Conta remetente não encontrada.");

        var destinatario = await _clienteRepo.GetByChavePixAsync(request.TipoChave, request.ValorChave)
            ?? throw new Exception("Conta destinatária não encontrada.");

        if (remetente.cli_id == destinatario.cli_id)
            throw new Exception("Não é possível transferir para a própria conta.");

        var saldoRemetente = await _clienteRepo.GetBySld_Cli_Id(remetente.cli_id)
            ?? throw new Exception("Saldo do remetente não encontrado.");

        if (saldoRemetente.sld_saldo < request.Valor)
            throw new Exception("Saldo insuficiente.");

        var saldoDestinatario = await _clienteRepo.GetBySld_Cli_Id(destinatario.cli_id)
            ?? throw new Exception("Saldo do destinatário não encontrado.");

        using var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            saldoRemetente.sld_saldo -= request.Valor;
            saldoDestinatario.sld_saldo += request.Valor;

            await _clienteRepo.UpdateSld(saldoRemetente);
            await _clienteRepo.UpdateSld(saldoDestinatario);

            var now = DateTime.UtcNow;

            _transacaoRepo.Add(new tb_transacao
            {
                trs_cli_id = remetente.cli_id,
                trs_valor = request.Valor,
                trs_tipoTransacao = 2,
                descricao = $"Transf. para {request.ValorChave}: {request.Descricao}",
                trs_dataHora = now
            });

            _transacaoRepo.Add(new tb_transacao
            {
                trs_cli_id = destinatario.cli_id,
                trs_valor = request.Valor,
                trs_tipoTransacao = 1,
                descricao = $"Receb. de {remetenteEmail}: {request.Descricao}",
                trs_dataHora = now
            });

            await _transacaoRepo.SaveChangesAsync();
            await transaction.CommitAsync();

            return new TransacaoResponse
            {
                Sucesso = true,
                Mensagem = "Transferência realizada com sucesso.",
                NovoSaldoRemetente = saldoRemetente.sld_saldo
            };
        }
        catch
        {
            throw;
        }
    }
}
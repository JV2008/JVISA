using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.DTO.ContaDto;
using backend.Models;

namespace backend.Services;

public class DadosContaService
{
    private readonly AppDbContext _context;

    public DadosContaService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<DadosDashboardDto> ObterDadosDashboard(int cliId)
    {
        var cliente = await _context.Clientes
            .Include(c => c.Usuario)
            .FirstOrDefaultAsync(c => c.cli_id == cliId);

        if (cliente == null)
            throw new Exception("Cliente não encontrado");

        var conta = await _context.Contas
            .FirstOrDefaultAsync(c => c.cnt_cli_id == cliId);

        if (conta == null)
            throw new Exception("Conta não encontrada");

        var saldo = await _context.Saldos
            .FirstOrDefaultAsync(s => s.sld_contaId == conta.cnt_id);

        var cartao = await _context.Cartoes
            .FirstOrDefaultAsync(c => c.crt_contaId == conta.cnt_id);

        var transacoes = await _context.Transacoes
            .Where(t => t.trs_cnt_id == conta.cnt_id)
            .OrderByDescending(t => t.trs_dataHora)
            .Take(5)
            .ToListAsync();

        var contaDto = new DadosContaResponseDto
        {
            ContaId = conta.cnt_id,
            NumeroConta = conta.cnt_numeroConta,
            TipoConta = conta.cnt_tipoConta.ToString(),
            Status = conta.cnt_status,
            Saldo = saldo?.sld_saldo ?? 0,
            UltimaAtualizacaoSaldo = saldo?.sld_ultimaAtualizacao ?? DateTime.MinValue,
            CartaoId = cartao?.crt_id,
            NumeroCartao = cartao != null ? MascaraCartao(cartao.crt_numeroCartao) : null,
            TipoCartao = cartao?.crt_tipoCartao.ToString(),
            Limite = cartao?.crt_limite ?? 0,
            LimiteUtilizado = 0,
            LimiteDisponivel = cartao?.crt_limite ?? 0,
            DataValidade = cartao?.crt_dataValidade ?? DateTime.MinValue,
            CartaoAtivo = cartao?.crt_status ?? false,
            NomeCliente = cliente.Nome ?? "",
            Email = cliente.Email ?? ""
        };

        var transacoesDto = transacoes
            .Select(t => new TransacaoResponseDto
            {
                Id = t.trs_id,
                Descricao = t.descricao,
                Valor = t.trs_valor,
                Tipo = t.trs_tipoTransacao.ToString(),
                DataHora = t.trs_dataHora
            })
            .ToList();

        return new DadosDashboardDto
        {
            Conta = contaDto,
            TransacoesRecentes = transacoesDto
        };
    }

    private string MascaraCartao(string numero)
    {
        if (string.IsNullOrEmpty(numero) || numero.Length < 4)
            return numero;
        
        var ultimos4 = numero.Substring(numero.Length - 4);
        return $"**** **** **** {ultimos4}";
    }
}
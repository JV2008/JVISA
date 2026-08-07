namespace backend.DTO.ContaDto;

public class DadosContaResponseDto
{
    public int ContaId { get; set; }
    public string NumeroConta { get; set; } = string.Empty;
    public string TipoConta { get; set; } = string.Empty;
    public bool Status { get; set; }

    public decimal Saldo { get; set; }
    public DateTime UltimaAtualizacaoSaldo { get; set; }

    public int? CartaoId { get; set; }
    public string? NumeroCartao { get; set; }
    public string? TipoCartao { get; set; }
    public decimal Limite { get; set; }
    public decimal LimiteUtilizado { get; set; }
    public decimal LimiteDisponivel { get; set; }
    public DateTime DataValidade { get; set; }
    public bool CartaoAtivo { get; set; }

    public string NomeCliente { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
}

public class DadosDashboardDto
{
    public DadosContaResponseDto Conta { get; set; } = null!;
    public List<TransacaoResponseDto> TransacoesRecentes { get; set; } = new();
}

public class TransacaoResponseDto
{
    public int Id { get; set; }
    public string Descricao { get; set; } = string.Empty;
    public decimal Valor { get; set; }
    public string Tipo { get; set; } = string.Empty;
    public DateTime DataHora { get; set; }
}
// Dtos/TransferenciaDto.cs
using System.ComponentModel.DataAnnotations;

public class TransacaoDto
{
  [Required(ErrorMessage = "Tipo da chave PIX é obrigatório.")]
    public ChavePix TipoChave { get; set; }

    [Required(ErrorMessage = "Valor da chave PIX é obrigatório.")]
    [MaxLength(100)]
    public string ValorChave { get; set; } = string.Empty;

    [Required]
    [Range(0.01, double.MaxValue, ErrorMessage = "O valor deve ser maior que zero.")]
    public decimal Valor { get; set; }

    [MaxLength(255)]
    public string? Descricao { get; set; }
}

public class TransacaoResponse
{
    public bool Sucesso { get; set; }
    public string Mensagem { get; set; } = string.Empty;
    public decimal NovoSaldoRemetente { get; set; }
}
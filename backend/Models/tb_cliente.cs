namespace backend.Models;

using System.ComponentModel.DataAnnotations.Schema;
using backend.Models;

public class tb_cliente
{
    public int cli_id { get; set; }

    //[Foreign Key]
    public int cli_usu_id { get; set; }

    public string cli_cpf { get; set; } = string.Empty;
    public string cli_rg { get; set; } = string.Empty;
    public string cli_telefone { get; set; } = string.Empty;
    // Endereço
    public string cli_logradouro { get; set; } = string.Empty;
    public string cli_numero { get; set; } = string.Empty;
    public string cli_complemento { get; set; } = string.Empty;
    public string cli_bairro { get; set; } = string.Empty;
    public string cli_cidade { get; set; } = string.Empty;
    public string cli_estado { get; set; } = string.Empty;
    public string cli_cep { get; set; } = string.Empty;
    public ChavePix cli_chave_pix {get; set;}


    public DateTime cli_dataNascimento { get; set; }

    [ForeignKey("cli_usu_id")]
    public virtual tb_usuario Usuario { get; set; } = null!;

    [NotMapped]
    public string? Nome => Usuario?.usu_nome;

    [NotMapped]
    public string? Email => Usuario?.usu_email;

    public ICollection<tb_conta> Contas { get; set; } = new List<tb_conta>();
    public ICollection<tb_saldo> Saldos { get; set; } = new List<tb_saldo>();
}
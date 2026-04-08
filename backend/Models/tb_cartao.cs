namespace backend.Models;
public class tb_cartao
{
    public int crt_id { get; set; }
    public int crt_cli_id { get; set; }
    public int crt_contaId { get; set; }
    public string crt_numeroCartao { get; set; } = string.Empty;
    public string crt_tipoCartao { get; set; } = string.Empty;
    public decimal crt_limite { get; set; }
    public bool crt_status { get; set; }
    public DateTime crt_dataValidade { get; set; }

    public tb_conta Conta { get; set; } = null!;
    public tb_cliente Cliente { get; set; } = null!;
}

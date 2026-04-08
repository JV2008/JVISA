namespace backend.Models;


public class tb_conta
{
    public int cnt_id { get; set; }
    public int cnt_cli_id { get; set; }
    public string cnt_numeroConta { get; set; } = string.Empty;
    public string cnt_tipoConta { get; set; } = string.Empty;
    public bool cnt_status { get; set; }

    public tb_cliente Cliente { get; set; } = null!;
    public tb_saldo Saldo { get; set; } = null!;

    


    public ICollection<tb_transacao> Transacoes { get; set; } = new List<tb_transacao>();
    public ICollection<tb_cartao> Cartoes { get; set; } = new List<tb_cartao>();

}
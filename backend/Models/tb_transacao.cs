namespace backend.Models;

public class tb_transacao
{
    public int trs_id { get; set; }
    public int trs_cli_id { get; set; }

    //Foreign Key
    public int trs_cnt_id { get; set; }
    public int trs_tipoTransacao { get; set; }
    public decimal trs_valor { get; set; }
    public DateTime trs_dataHora { get; set; }

    public string descricao { get; set; } = string.Empty;
    //Foreign Key
    public string trs_cli_chave_pix {get; set;} = string.Empty;

    
    
    public tb_cliente ChavePix {get; set;} = null!;

    public  tb_conta Conta { get; set; } = null!; 

    
    public ICollection<tb_alerta> Alertas { get; set; } = new List<tb_alerta>();
}
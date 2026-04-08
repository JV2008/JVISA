namespace backend.Models;
public class tb_saldo
{
    public int sld_id { get; set; }
     
    public int sld_cli_id {get; set;} 
    public int sld_contaId { get; set; }
    public decimal sld_saldo { get; set; }
    public DateTime sld_ultimaAtualizacao { get; set; }

    public tb_conta Conta { get; set; } = null!;
    public tb_cliente Cliente {get; set;} = null!;

    
}
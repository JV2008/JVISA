namespace backend.Models;

public class tb_alerta
{
    public int alt_id { get; set; }
    public int? alt_trasacaoId { get; set; }
    public string alt_tipoAlerta { get; set; } = string.Empty;
    public string alt_descricao { get; set; } = string.Empty;
    public string alt_status { get; set; } = string.Empty;
    public DateTime alt_dataCriacao { get; set; }

    public tb_transacao transacao { get; set; } = null!;
}
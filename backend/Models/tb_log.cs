using backend.Models;

public class tb_logs
{
    public int log_id { get; set; }
    public int? log_usuarioId { get; set; }
    public string log_acao { get; set; } = string.Empty;
    public string log_entidade { get; set; } = string.Empty;
    public int? log_entidadeId { get; set; }
    public DateTime log_dataHora { get; set; }

    public tb_usuario?  Usuario { get; set; } 
}
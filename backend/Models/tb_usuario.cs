namespace backend.Models;

using BCrypt.Net;

public class tb_usuario
{
    

    public int usu_id { get; set; } 
    public string usu_nome { get; set; } = string.Empty;
    public string usu_email { get; set; } = string.Empty;
    public required string usu_senhaHash { get; set; } 
    public tipoUsuario usu_tipo_usuario_enum { get; set; }
    public bool usu_status { get; set; }
    public DateTime usu_dataCriacao { get; set; }

    public ICollection<tb_cliente> Clientes { get; set; } = new List<tb_cliente>();
}






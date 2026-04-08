public class ClienteCreateDto
{
    public  RegisterDto Usuario { get; set; } = default!; 
   
    public string CPF { get; set; } = string.Empty;
    public string RG { get; set; } = string.Empty;
    public string Telefone { get; set; } = string.Empty;
    public string CEP { get; set; } = string.Empty;
    public string Estado { get; set; } = string.Empty;
    public string Cidade { get; set; } = string.Empty;

    public string Logradouro { get; set; } = string.Empty;
    public string Bairro { get; set; } = string.Empty;
    public string Numero { get; set; } = string.Empty;
    public string Complemento { get; set; } = string.Empty;

    public DateTime DataNascimento { get; set; }
}


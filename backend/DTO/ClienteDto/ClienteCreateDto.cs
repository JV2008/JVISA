using backend.DTO.UsuarioDto;
using System.ComponentModel.DataAnnotations;
using backend.Enums;
public class ClienteCreateDto
{
     public static ValidationResult ValidateDataNascimento(DateTime data, ValidationContext context)
    {
        if (data > DateTime.Now)
            return new ValidationResult("Data de nascimento não pode ser futura.");
        if (DateTime.Now.Year - data.Year < 18)
            return new ValidationResult("Usuário deve ter pelo menos 18 anos.");
        return ValidationResult.Success;
    }


    [Required(ErrorMessage = "Usuário é obrigatório.")]
    public RegisterDto Usuario { get; set; } = default!;

    [Required(ErrorMessage = "CPF é obrigatório.")]
    [StringLength(11, MinimumLength = 11, ErrorMessage = "CPF deve conter exatamente 11 caracteres.")]
    [RegularExpression(@"^\d{11}$", ErrorMessage = "CPF deve conter apenas números.")]
    public string CPF { get; set; } = string.Empty;

    [Required(ErrorMessage = "RG é obrigatório.")]
    [StringLength(9, MinimumLength = 9, ErrorMessage = "RG deve conter exatamente 9 caracteres.")]
    [RegularExpression(@"^\d{9}$", ErrorMessage = "RG deve conter apenas números.")]
    public string RG { get; set; } = string.Empty;

    [Required(ErrorMessage = "Telefone é obrigatório.")]
    [StringLength(11, MinimumLength = 11, ErrorMessage = "Telefone deve conter exatamente 11 caracteres.")]
    [RegularExpression(@"^\(\d{2}\)\s\d{4,5}-\d{4}$", ErrorMessage = "Telefone deve conter apenas números.")]
    public string Telefone { get; set; } = string.Empty;

    [Required(ErrorMessage = "CEP é obrigatório.")]
    [StringLength(8, MinimumLength = 8, ErrorMessage = "CEP deve conter exatamente 8 caracteres.")]
    [RegularExpression(@"^\d{5}-\d{3}$", ErrorMessage = "CEP deve estar no formato XXXXX-XXX")]
    public string CEP { get; set; } = string.Empty;
    [Required(ErrorMessage = "Estado é obrigatório.")]
    [StringLength(2, MinimumLength = 2, ErrorMessage = "Estado deve conter exatamente 2 caracteres.")]
    public string Estado { get; set; } = string.Empty;

    [Required(ErrorMessage = "Cidade é obrigatória.")]
    public string Cidade { get; set; } = string.Empty;

    [Required(ErrorMessage = "Logradouro é obrigatório.")]
    public string Logradouro { get; set; } = string.Empty;

    [Required(ErrorMessage = "Bairro é obrigatório.")]
    public string Bairro { get; set; } = string.Empty;

    [Required(ErrorMessage = "Número é obrigatório.")]
    public string Numero { get; set; } = string.Empty;


    public string Complemento { get; set; } = string.Empty;

    [Required(ErrorMessage = "Data de nascimento é obrigatória.")]
    [DataType(DataType.Date)]
    [CustomValidation(typeof(ClienteCreateDto), nameof(ValidateDataNascimento))]
    public DateTime DataNascimento { get; set; }
    [Required(ErrorMessage = "Chave Pix é obrigatória.")]
    public ChavePix cli_chave_pix { get; set; }

}


   



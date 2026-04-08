namespace backend.DTO;

using backend.Models;
public static class ClienteMapperDto
{
    public static tb_cliente ToEntity(ClienteCreateDto dto)
    {
        return new tb_cliente
        {
            
            cli_cpf = dto.CPF,
            cli_rg = dto.RG,
            cli_telefone = dto.Telefone,
            cli_logradouro = dto.Logradouro,
            cli_numero = dto.Numero,
            cli_complemento = dto.Complemento,
            cli_bairro = dto.Bairro,
            cli_cidade = dto.Cidade,
            cli_estado = dto.Estado,
            cli_cep = dto.CEP,
            cli_dataNascimento = dto.DataNascimento
        };
    }

    public static ClienteResponseDto ToResponse(tb_cliente entity)
    {
        return new ClienteResponseDto
        {
            Id = entity.cli_id,
            CPF = entity.cli_cpf,
        };
    }
}
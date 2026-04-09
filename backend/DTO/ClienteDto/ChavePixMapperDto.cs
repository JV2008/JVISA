public class ChavePixMapperDto
{
    public static Dictionary<ChavePix, string> Mapeamento = new Dictionary<ChavePix, string>
    {
        { ChavePix.TELEFONE, "cli_telefone" },
        { ChavePix.CPF, "cli_cpf" },
        { ChavePix.EMAIL, "usu_email" },
        { ChavePix.ALEATORIA, "default" }
    };
}
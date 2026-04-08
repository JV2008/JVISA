using backend.Models;
using BCrypt.Net;
using backend.Repository;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using backend.Data;

namespace backend.Services;

public class AuthService
{
    private readonly IUsuarioRepository _repo;
    private readonly IConfiguration _config;

    private readonly IClienteRepository _clirepo;

    private readonly AppDbContext _context;

    public AuthService(IUsuarioRepository repo, IConfiguration config, IClienteRepository clirepo, AppDbContext context)
    {
        _repo = repo;
        _config = config;
        _clirepo = clirepo;
        _context = context;
    }

    public async Task<string> Register(RegisterDto dto)
    {


        var email = dto.Email.Trim().ToLower();
        var usuario = new tb_usuario
        {
            usu_nome = dto.Nome,
            usu_email = email,
            usu_senhaHash = BCrypt.Net.BCrypt.HashPassword(dto.Senha),
            usu_status = true,
            usu_dataCriacao = DateTime.UtcNow
        };


        if (email == "adminjvisa@admin.com")
        {
            usuario.usu_tipo_usuario_enum = tipoUsuario.ADMIN;
        }

        else if (email.EndsWith("@2rpnet.com"))
        {
            usuario.usu_tipo_usuario_enum = tipoUsuario.ANALISTA;
        }

        else
        {
            usuario.usu_tipo_usuario_enum = tipoUsuario.USUARIO;
        }

        var existente = await _repo.GetByEmail(email);

        if (existente != null)
            throw new Exception("Usuário já existe");


        await _repo.Add(usuario);

        return "Usuário criado com sucesso";
    }

    public async Task<string> Login(LoginDto dto)
    {
        var usuario = await _repo.GetByEmail(dto.Email);

        if (usuario == null)
            throw new Exception("Usuário não encontrado");

        var senhaValida = BCrypt.Net.BCrypt.Verify(dto.Senha, usuario.usu_senhaHash);

        if (!senhaValida)
            throw new Exception("Senha inválida");

        var claims = new[]
      {
            new Claim(ClaimTypes.Name, usuario.usu_email),
            new Claim(ClaimTypes.NameIdentifier, usuario.usu_id.ToString()),
            new Claim(ClaimTypes.Role, usuario.usu_tipo_usuario_enum.ToString()),
            new Claim("nome", usuario.usu_nome),
        };

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes("chave-de-acesso-para-o-sistemabanco-jvisa-teste-de-validacao-do-token-jwt")
        );

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(2),
            signingCredentials: creds
        );


        return new JwtSecurityTokenHandler().WriteToken(token);
    }


    public async Task<string> CreateCliente(ClienteCreateDto dto)
    {
        // 1. Validações iniciais (E-mail e CPF) antes de abrir a transação
        var email = dto.Usuario.Email.Trim().ToLower();
        if (await _repo.GetByEmail(email) != null)
            throw new Exception("E-mail já está em uso.");

        if (await _clirepo.GetByCPF(dto.CPF) != null)
            throw new Exception("CPF já está cadastrado.");

        // Precisamos do contexto para a transação. 
        // Certifique-se de injetar o AppDbContext no construtor ou acessá-lo via repo
        using var transaction = await _context.Database.BeginTransactionAsync();

        try
        {
            // 2. Criar o Usuário reutilizando a sua lógica de Roles
            var usuario = new tb_usuario
            {
                usu_nome = dto.Usuario.Nome,
                usu_email = dto.Usuario.Email,
                usu_senhaHash = BCrypt.Net.BCrypt.HashPassword(dto.Usuario.Senha),
                usu_status = true,
                usu_dataCriacao = DateTime.UtcNow,
                usu_tipo_usuario_enum = tipoUsuario.USUARIO // Todo cliente é USUARIO
            };

            // Adiciona o usuário pelo repositório que você já tem
            await _repo.Add(usuario);
            // Importante: o Add do repo deve chamar o SaveChanges ou você chama aqui
            await _context.SaveChangesAsync();

            // 3. Agora que temos o usuario.usu_id, criamos o cliente
            var cliente = new tb_cliente
            {
                cli_usu_id = usuario.usu_id, // O ID gerado acima
                cli_cpf = dto.CPF,
                cli_rg = dto.RG,
                cli_telefone = dto.Telefone,
                cli_dataNascimento = dto.DataNascimento,
                cli_cep = dto.CEP,
                cli_estado = dto.Estado,
                cli_cidade = dto.Cidade,
                cli_logradouro = dto.Logradouro,
                cli_bairro = dto.Bairro,
                cli_numero = dto.Numero,
                cli_complemento = dto.Complemento,
            };

            await _clirepo.Add(cliente);
            await _context.SaveChangesAsync();

            await transaction.CommitAsync();
            return "Cliente e Usuário cadastrados com sucesso";
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            throw new Exception("Erro ao processar cadastro de cliente: " + ex.Message);
        }
    }

}



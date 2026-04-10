using backend.Models;
using backend.Repository;
using System.Security.Claims;

namespace backend.Services;

public class ClienteService
{
    private readonly IClienteRepository _repo;

    public ClienteService(IClienteRepository repo)
    {
        _repo = repo;
    }

    // 🔥 pegar id do usuário logado
    private int GetUserId(ClaimsPrincipal user)
    {
        var userId = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (userId == null)
            throw new Exception("Usuário não autenticado");

        return int.Parse(userId);
    }

    // =========================
    // 🔑 DEFINIR CHAVE PIX
    // =========================
    public async Task DefinirChavePix(ChavePix chavePix, ClaimsPrincipal user)
    {
        var cliente = await GetCliente(user);

        if (cliente == null)
            throw new Exception("Cliente não encontrado");

        // 🔥 atualiza a chave Pix (assumindo que cli_chave_pix é um campo int)
        cliente.cli_chave_pix = (chavePix);

        await _repo.UpdateCliente(cliente);
    }

    // =========================
    // 🔎 PEGAR CLIENTE
    // =========================
    public async Task<tb_cliente?> GetCliente(ClaimsPrincipal user)
    {
        var userId = GetUserId(user);

        return await _repo.GetByCli_Usu_Id(userId);
    }

    // =========================
    // 💰 SALDO
    // =========================
    public async Task<tb_saldo?> GetSaldo(ClaimsPrincipal user)
    {
        var cliente = await GetCliente(user);

        if (cliente == null)
            throw new Exception("Cliente não encontrado");

        return await _repo.GetBySld_Cli_Id(cliente.cli_id);
    }

    // =========================
    // 💳 CARTÃO
    // =========================
    public async Task<tb_cartao?> GetCartao(ClaimsPrincipal user)
    {
        var cliente = await GetCliente(user);

        if (cliente == null)
            throw new Exception("Cliente não encontrado");

        return await _repo.GetByCrt_Cli_Id(cliente.cli_id);
    }

    // =========================
    // 💸 TRANSAÇÕES
    // =========================
    public async Task<List<tb_transacao>> GetTransacoes(ClaimsPrincipal user)
    {
        var cliente = await GetCliente(user);

        if (cliente == null)
            throw new Exception("Cliente não encontrado");

        return await _repo.GetAllByTrs_Cli_Id(cliente.cli_id);
    }

    // =========================
    // ➕ NOVA TRANSAÇÃO
    // =========================
    public async Task CriarTransacao(tb_transacao transacao, ClaimsPrincipal user)
    {
        var cliente = await GetCliente(user);

        if (cliente == null)
            throw new Exception("Cliente não encontrado");

        var saldo = await _repo.GetBySld_Cli_Id(cliente.cli_id);

        if (saldo == null)
            throw new Exception("Saldo não encontrado");

        // 🔥 regra de negócio
        if (saldo.sld_saldo < transacao.trs_valor)
            throw new Exception("Saldo insuficiente");

        // 🔥 debita saldo
        saldo.sld_saldo -= transacao.trs_valor;

        transacao.trs_cli_id = cliente.cli_id;
        transacao.trs_dataHora = DateTime.UtcNow;

        await _repo.UpdateSld(saldo);
        await _repo.AddTrs(transacao);
    }

    // =========================
    // ✏️ ATUALIZAR DADOS
    // =========================
    public async Task AtualizarCliente(tb_cliente clienteAtualizado, ClaimsPrincipal user)
    {
        var cliente = await GetCliente(user);

        if (cliente == null)
            throw new Exception("Cliente não encontrado");

        // 🔥 protege ID
        cliente.Usuario.usu_nome = clienteAtualizado.Usuario.usu_nome;
        cliente.cli_telefone = clienteAtualizado.cli_telefone;
        cliente.cli_logradouro = clienteAtualizado.cli_logradouro;

        await _repo.UpdateCliente(cliente);
    }
}
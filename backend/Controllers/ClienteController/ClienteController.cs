using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using backend.Services;
using backend.Models;

namespace backend.Controllers;

[Authorize(Roles = "USUARIO")]
[ApiController]
[Route("api/[controller]")]
public class ClienteController : ControllerBase
{
    private readonly ClienteService _service;

    public ClienteController(ClienteService service)
    {
        _service = service;
    }

    // =========================
    // 👤 DADOS DO CLIENTE
    // =========================
    [HttpGet("me")]
    public async Task<IActionResult> GetCliente()
    {
        var cliente = await _service.GetCliente(User);
        return Ok(cliente);
    }

    // =========================
    // 💰 SALDO
    // =========================
    [HttpGet("saldo")]
    public async Task<IActionResult> GetSaldo()
    {
        var saldo = await _service.GetSaldo(User);
        return Ok(saldo);
    }

    // =========================
    // 💳 CARTÃO
    // =========================
    [HttpGet("cartao")]
    public async Task<IActionResult> GetCartao()
    {
        var cartao = await _service.GetCartao(User);
        return Ok(cartao);
    }

    // =========================
    // 💸 TRANSAÇÕES
    // =========================
    [HttpGet("transacoes")]
    public async Task<IActionResult> GetTransacoes()
    {
        var transacoes = await _service.GetTransacoes(User);
        return Ok(transacoes);
    }

    // =========================
    // ➕ NOVA TRANSAÇÃO
    // =========================
    [HttpPost("transacao")]
    public async Task<IActionResult> CriarTransacao([FromBody] tb_transacao transacao)
    {
        await _service.CriarTransacao(transacao, User);
        return Ok("Transação realizada com sucesso");
    }

    // =========================
    // ✏️ ATUALIZAR DADOS
    // =========================
    [HttpPut("atualizar")]
    public async Task<IActionResult> AtualizarCliente([FromBody] tb_cliente cliente)
    {
        await _service.AtualizarCliente(cliente, User);
        return Ok("Dados atualizados com sucesso");
    }
}
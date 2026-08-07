using Microsoft.AspNetCore.Mvc;
using backend.Services;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DadosContaController : ControllerBase
{
    private readonly DadosContaService _dadosContaService;

    public DadosContaController(DadosContaService dadosContaService)
    {
        _dadosContaService = dadosContaService;
    }

    [HttpGet("dashboard/{cliId}")]
    public async Task<IActionResult> GetDashboard(int cliId)
    {
        try
        {
            var dados = await _dadosContaService.ObterDadosDashboard(cliId);
            return Ok(dados);
        }
        catch (Exception ex)
        {
            return NotFound(new { mensagem = ex.Message });
        }
    }
}
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/teste")]
public class TesteController : ControllerBase
{
    [Authorize]
    [HttpGet("protegido")]
    public IActionResult RotaProtegida()
    {
        return Ok("Você está autenticado!");
    }

    [Authorize(Roles = "ADMIN")]
    [HttpGet("admin")]
    public IActionResult ApenasAdmin()
    {
        return Ok("Você é ADMIN!");
    }

    [Authorize(Roles = "ANALISTA")]
    [HttpGet("analista")]
    public IActionResult ApenasAnalista()
    {
        return Ok("Você é um ANALISTA");
    }
}
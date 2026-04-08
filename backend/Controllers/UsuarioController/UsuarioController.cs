using backend.Services;
using Microsoft.AspNetCore.Mvc;


namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _service;

    public AuthController(AuthService service)
    {
        _service = service;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        var result = await _service.Register(dto);
        return Ok(result);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var result = await _service.Login(dto);
        return Ok( new { token = result});
    }

    [HttpPost("cliente")] 
    public async Task<IActionResult> Cliente([FromBody]ClienteCreateDto dto){
            var result = await _service.CreateCliente(dto);
        return Ok(result);
    }
}
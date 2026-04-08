using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Authorization;

namespace backend.controllers;

[Authorize(Roles = "ADMIN")]
[ApiController]
[Route("api/[controller]")]
public class AdminController : ControllerBase
{
    private readonly AdminService _service;
    private readonly AuthService _authService;

    public AdminController(AdminService service, AuthService authService)
    {
        _service = service;
        _authService = authService;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var usuarios = await _service.GetAll();
        return Ok(usuarios);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var usuario = await _service.GetById(id);

        if (usuario == null)
            return NotFound("Usuário não encontrado");

        return Ok(usuario);
    }

    [HttpPost]
    public async Task<IActionResult> CriarUsuario(RegisterDto dto)
    {
        var resultado = await _authService.Register(dto);
        return Ok(resultado);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> AtualizarUsuario(int id, tb_usuario usuario)
    {
        var atualizado = await _service.AtualizarUsuario(id, usuario, User);

        if (!atualizado)
        return NotFound("Usuário não encontrado");

        return Ok("Atualizado com sucesso");
        


    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deletado = await _service.DeletarUsuario(id, User);

        if (!deletado)
            return NotFound("Usuário não encontrado");

        return Ok("Deletado com sucesso");
    }

}
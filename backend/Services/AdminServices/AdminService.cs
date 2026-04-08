using backend.Models;
using backend.Repository;
using System.Security.Claims;

namespace backend.Services;

public class AdminService
{
    private readonly IAdminRepository _repo;

    public AdminService(IAdminRepository repo)
    {
        _repo = repo;
    }

    // 🔥 Método para validar ADMIN
    private void ValidarAdmin(ClaimsPrincipal user)
    {
        var role = user.FindFirst(ClaimTypes.Role)?.Value;

        if (role != "ADMIN")
            throw new Exception("Acesso negado: apenas ADMIN pode realizar esta ação");
    }


    // =========================
    // GET ALL
    // =========================

    public async Task<List<tb_usuario>> GetAll()
    {
        return await _repo.GetAll();
    }

    // =========================
    // GET BY ID
    // =========================

    public async Task<tb_usuario?> GetById(int id)
    {
        return await _repo.GetById(id);
    }

    // =========================
    // CREATE
    // =========================
    public async Task CriarUsuario(tb_usuario usuario, ClaimsPrincipal user)
    {
        ValidarAdmin(user);

        await _repo.Add(usuario);
    }

    // =========================
    // UPDATE
    // =========================
    public async Task<bool> AtualizarUsuario(int id, tb_usuario usuario, ClaimsPrincipal user)
    {
        ValidarAdmin(user);

        var existente = await _repo.GetById(id);

        if (existente == null)
            return false;

        existente.usu_nome = usuario.usu_nome;
        existente.usu_email = usuario.usu_email;

        await _repo.Update(existente);

        return true;

    }

    // =========================
    // DELETE
    // =========================
    public async Task<bool> DeletarUsuario(int id, ClaimsPrincipal user)
    {
        ValidarAdmin(user);

        var existente = await _repo.GetById(id);

        if (existente == null)
            return false;

        await _repo.Delete(id);

        return true;


    }


}
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

public class AdminRepository : IAdminRepository
{
    private readonly AppDbContext _context;

    public AdminRepository(AppDbContext context)
    {
        _context = context;
    }

    // =========================
    // CREATE
    // =========================
    public async Task Add(tb_usuario usuario)
    {
        await _context.Usuarios.AddAsync(usuario);
        await _context.SaveChangesAsync();
    }

    // =========================
    // UPDATE
    // =========================
    public async Task Update(tb_usuario usuario)
    {
        _context.Usuarios.Update(usuario);
        await _context.SaveChangesAsync();
    }

    // =========================
    // DELETE
    // =========================
    public async Task Delete(int id)
    {
        var usuario = await _context.Usuarios.FindAsync(id);

        if (usuario == null)
            throw new Exception("Usuário não encontrado");

        _context.Usuarios.Remove(usuario);
        await _context.SaveChangesAsync();
    }

    // =========================
    // GET BY ID
    // =========================
    public async Task<tb_usuario?> GetById(int id)
    {
        return await _context.Usuarios.FindAsync(id);
    }

    // =========================
    // GET ALL
    // =========================
    public async Task<List<tb_usuario>> GetAll()
    {
        return await _context.Usuarios.ToListAsync();
    }

    // =========================
    // GET BY EMAIL
    // =========================
    public async Task<tb_usuario?> GetByEmail(string email)
    {
        return await _context.Usuarios
            .FirstOrDefaultAsync(u => u.usu_email == email);
    }
}
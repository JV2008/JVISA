using backend.Data;
using backend.Models;
using backend.Repository;
using Microsoft.EntityFrameworkCore;


public class UsuarioRepository : IUsuarioRepository
{
    private readonly AppDbContext _context;

    public UsuarioRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<tb_usuario?> GetByEmail(string email)
    {
        return await _context.Usuarios
            .FirstOrDefaultAsync(u => u.usu_email == email);
    }

    public async Task Add(tb_usuario usuario)
    {
        _context.Usuarios.Add(usuario);
        await _context.SaveChangesAsync();
    }




    
}
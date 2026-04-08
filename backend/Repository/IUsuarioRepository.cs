using backend.Models;

namespace backend.Repository;

public interface IUsuarioRepository
{
    Task<tb_usuario?> GetByEmail(string email);
    Task Add(tb_usuario usuario);
}
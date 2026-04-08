using backend.Models;

public interface IAdminRepository
{
    Task Add(tb_usuario usuario);
    Task Update(tb_usuario usuario);
    Task Delete(int id);
    Task<tb_usuario?> GetById(int id);
    Task<List<tb_usuario>> GetAll();
    Task<tb_usuario?> GetByEmail(string email);
}
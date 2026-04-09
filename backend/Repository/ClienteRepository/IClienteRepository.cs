using backend.Models;


public interface IClienteRepository
{
    // =========================
    // CLIENTE
    // =========================

    Task Add(tb_cliente cliente);
    Task<tb_cliente?> GetByCli_Usu_Id(int usu_id);
    Task<tb_cliente?> GetByCli_Id(int cli_usu_id);
    Task<tb_cliente?> GetByCPF (string cli_cpf);


    Task UpdateCliente(tb_cliente cliente);

    // =========================
    // SALDO
    // =========================
    Task<tb_saldo?> GetBySld_Cli_Id(int cli_id);
    Task UpdateSld(tb_saldo saldo);

    // =========================
    // CARTÃO
    // =========================
    Task<tb_cartao?> GetByCrt_Cli_Id(int cli_id);

    // =========================
    // TRANSAÇÕES
    // =========================
    Task<List<tb_transacao>> GetAllByTrs_Cli_Id(int cli_id);
    Task<tb_transacao?> GetByTrs_Id_And_Cli_Id(int trs_id, int cli_id);
    Task<tb_transacao?> GetByChavePix(string chave_pix);
    Task AddTrs(tb_transacao transacao);
    
}
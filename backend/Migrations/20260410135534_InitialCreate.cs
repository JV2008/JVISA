using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tb_usuario",
                columns: table => new
                {
                    usu_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    usu_nome = table.Column<string>(type: "text", nullable: false),
                    usu_email = table.Column<string>(type: "text", nullable: false),
                    usu_senhaHash = table.Column<string>(type: "text", nullable: false),
                    usu_tipo_usuario_enum = table.Column<int>(type: "integer", nullable: false),
                    usu_status = table.Column<bool>(type: "boolean", nullable: false),
                    usu_dataCriacao = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_usuario", x => x.usu_id);
                });

            migrationBuilder.CreateTable(
                name: "tb_cliente",
                columns: table => new
                {
                    cli_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    cli_usu_id = table.Column<int>(type: "integer", nullable: false),
                    cli_cpf = table.Column<string>(type: "text", nullable: false),
                    cli_rg = table.Column<string>(type: "text", nullable: false),
                    cli_telefone = table.Column<string>(type: "text", nullable: false),
                    cli_logradouro = table.Column<string>(type: "text", nullable: false),
                    cli_numero = table.Column<string>(type: "text", nullable: false),
                    cli_complemento = table.Column<string>(type: "text", nullable: false),
                    cli_bairro = table.Column<string>(type: "text", nullable: false),
                    cli_cidade = table.Column<string>(type: "text", nullable: false),
                    cli_estado = table.Column<string>(type: "text", nullable: false),
                    cli_cep = table.Column<string>(type: "text", nullable: false),
                    cli_chave_pix = table.Column<int>(type: "integer", nullable: false),
                    cli_dataNascimento = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_cliente", x => x.cli_id);
                    table.ForeignKey(
                        name: "FK_tb_cliente_tb_usuario_cli_usu_id",
                        column: x => x.cli_usu_id,
                        principalTable: "tb_usuario",
                        principalColumn: "usu_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tb_logs",
                columns: table => new
                {
                    log_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    log_usuarioId = table.Column<int>(type: "integer", nullable: true),
                    log_acao = table.Column<string>(type: "text", nullable: false),
                    log_entidade = table.Column<string>(type: "text", nullable: false),
                    log_entidadeId = table.Column<int>(type: "integer", nullable: true),
                    log_dataHora = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_logs", x => x.log_id);
                    table.ForeignKey(
                        name: "FK_tb_logs_tb_usuario_log_usuarioId",
                        column: x => x.log_usuarioId,
                        principalTable: "tb_usuario",
                        principalColumn: "usu_id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "tb_conta",
                columns: table => new
                {
                    cnt_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    cnt_cli_id = table.Column<int>(type: "integer", nullable: false),
                    cnt_numeroConta = table.Column<string>(type: "text", nullable: false),
                    cnt_tipoConta = table.Column<int>(type: "integer", nullable: false),
                    cnt_status = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_conta", x => x.cnt_id);
                    table.ForeignKey(
                        name: "FK_tb_conta_tb_cliente_cnt_cli_id",
                        column: x => x.cnt_cli_id,
                        principalTable: "tb_cliente",
                        principalColumn: "cli_id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "tb_cartao",
                columns: table => new
                {
                    crt_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    crt_cli_id = table.Column<int>(type: "integer", nullable: false),
                    crt_contaId = table.Column<int>(type: "integer", nullable: false),
                    crt_numeroCartao = table.Column<string>(type: "text", nullable: false),
                    crt_tipoCartao = table.Column<int>(type: "integer", nullable: false),
                    crt_limite = table.Column<decimal>(type: "numeric", nullable: false),
                    crt_status = table.Column<bool>(type: "boolean", nullable: false),
                    crt_dataValidade = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Clientecli_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_cartao", x => x.crt_id);
                    table.ForeignKey(
                        name: "FK_tb_cartao_tb_cliente_Clientecli_id",
                        column: x => x.Clientecli_id,
                        principalTable: "tb_cliente",
                        principalColumn: "cli_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tb_cartao_tb_conta_crt_contaId",
                        column: x => x.crt_contaId,
                        principalTable: "tb_conta",
                        principalColumn: "cnt_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tb_saldo",
                columns: table => new
                {
                    sld_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    sld_cli_id = table.Column<int>(type: "integer", nullable: false),
                    sld_contaId = table.Column<int>(type: "integer", nullable: false),
                    sld_saldo = table.Column<decimal>(type: "numeric", nullable: false),
                    sld_ultimaAtualizacao = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Clientecli_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_saldo", x => x.sld_id);
                    table.ForeignKey(
                        name: "FK_tb_saldo_tb_cliente_Clientecli_id",
                        column: x => x.Clientecli_id,
                        principalTable: "tb_cliente",
                        principalColumn: "cli_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tb_saldo_tb_conta_sld_contaId",
                        column: x => x.sld_contaId,
                        principalTable: "tb_conta",
                        principalColumn: "cnt_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tb_transacao",
                columns: table => new
                {
                    trs_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    trs_cli_id = table.Column<int>(type: "integer", nullable: false),
                    trs_cnt_id = table.Column<int>(type: "integer", nullable: false),
                    trs_tipoTransacao = table.Column<int>(type: "integer", nullable: false),
                    trs_valor = table.Column<decimal>(type: "numeric", nullable: false),
                    trs_dataHora = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    descricao = table.Column<string>(type: "text", nullable: false),
                    trs_cli_chave_pix = table.Column<string>(type: "text", nullable: false),
                    ChavePixcli_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_transacao", x => x.trs_id);
                    table.ForeignKey(
                        name: "FK_tb_transacao_tb_cliente_ChavePixcli_id",
                        column: x => x.ChavePixcli_id,
                        principalTable: "tb_cliente",
                        principalColumn: "cli_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tb_transacao_tb_conta_trs_cnt_id",
                        column: x => x.trs_cnt_id,
                        principalTable: "tb_conta",
                        principalColumn: "cnt_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tb_alerta",
                columns: table => new
                {
                    alt_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    alt_trasacaoId = table.Column<int>(type: "integer", nullable: true),
                    alt_tipoAlerta = table.Column<string>(type: "text", nullable: false),
                    alt_descricao = table.Column<string>(type: "text", nullable: false),
                    alt_status = table.Column<int>(type: "integer", nullable: false),
                    alt_dataCriacao = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_alerta", x => x.alt_id);
                    table.ForeignKey(
                        name: "FK_tb_alerta_tb_transacao_alt_trasacaoId",
                        column: x => x.alt_trasacaoId,
                        principalTable: "tb_transacao",
                        principalColumn: "trs_id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tb_alerta_alt_trasacaoId",
                table: "tb_alerta",
                column: "alt_trasacaoId");

            migrationBuilder.CreateIndex(
                name: "IX_tb_cartao_Clientecli_id",
                table: "tb_cartao",
                column: "Clientecli_id");

            migrationBuilder.CreateIndex(
                name: "IX_tb_cartao_crt_contaId",
                table: "tb_cartao",
                column: "crt_contaId");

            migrationBuilder.CreateIndex(
                name: "IX_tb_cliente_cli_cpf",
                table: "tb_cliente",
                column: "cli_cpf",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_tb_cliente_cli_usu_id",
                table: "tb_cliente",
                column: "cli_usu_id");

            migrationBuilder.CreateIndex(
                name: "IX_tb_conta_cnt_cli_id",
                table: "tb_conta",
                column: "cnt_cli_id");

            migrationBuilder.CreateIndex(
                name: "IX_tb_logs_log_usuarioId",
                table: "tb_logs",
                column: "log_usuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_tb_saldo_Clientecli_id",
                table: "tb_saldo",
                column: "Clientecli_id");

            migrationBuilder.CreateIndex(
                name: "IX_tb_saldo_sld_contaId",
                table: "tb_saldo",
                column: "sld_contaId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_tb_transacao_ChavePixcli_id",
                table: "tb_transacao",
                column: "ChavePixcli_id");

            migrationBuilder.CreateIndex(
                name: "IX_tb_transacao_trs_cnt_id",
                table: "tb_transacao",
                column: "trs_cnt_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tb_alerta");

            migrationBuilder.DropTable(
                name: "tb_cartao");

            migrationBuilder.DropTable(
                name: "tb_logs");

            migrationBuilder.DropTable(
                name: "tb_saldo");

            migrationBuilder.DropTable(
                name: "tb_transacao");

            migrationBuilder.DropTable(
                name: "tb_conta");

            migrationBuilder.DropTable(
                name: "tb_cliente");

            migrationBuilder.DropTable(
                name: "tb_usuario");
        }
    }
}

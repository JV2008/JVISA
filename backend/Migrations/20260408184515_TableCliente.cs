using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class TableCliente : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tb_cliente_tb_usuario_Usuariousu_id",
                table: "tb_cliente");

            migrationBuilder.DropIndex(
                name: "IX_tb_cliente_Usuariousu_id",
                table: "tb_cliente");

            migrationBuilder.DropColumn(
                name: "Usuariousu_id",
                table: "tb_cliente");

            migrationBuilder.DropColumn(
                name: "cli_email",
                table: "tb_cliente");

            migrationBuilder.DropColumn(
                name: "cli_nome",
                table: "tb_cliente");

            migrationBuilder.CreateIndex(
                name: "IX_tb_cliente_cli_usu_id",
                table: "tb_cliente",
                column: "cli_usu_id");

            migrationBuilder.AddForeignKey(
                name: "FK_tb_cliente_tb_usuario_cli_usu_id",
                table: "tb_cliente",
                column: "cli_usu_id",
                principalTable: "tb_usuario",
                principalColumn: "usu_id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tb_cliente_tb_usuario_cli_usu_id",
                table: "tb_cliente");

            migrationBuilder.DropIndex(
                name: "IX_tb_cliente_cli_usu_id",
                table: "tb_cliente");

            migrationBuilder.AddColumn<int>(
                name: "Usuariousu_id",
                table: "tb_cliente",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "cli_email",
                table: "tb_cliente",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "cli_nome",
                table: "tb_cliente",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_tb_cliente_Usuariousu_id",
                table: "tb_cliente",
                column: "Usuariousu_id");

            migrationBuilder.AddForeignKey(
                name: "FK_tb_cliente_tb_usuario_Usuariousu_id",
                table: "tb_cliente",
                column: "Usuariousu_id",
                principalTable: "tb_usuario",
                principalColumn: "usu_id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

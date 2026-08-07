# JVISA — Sistema Bancário

Sistema bancário simples desenvolvido para fins de estudo/portfólio, com backend em **ASP.NET Core (C#)** e frontend em **React + TypeScript**. O sistema conta com autenticação JWT, controle de acesso por perfis (roles) e operações bancárias básicas (conta, saldo, cartão, transações).

> ⚠️ **Status do projeto:** em desenvolvimento. O sistema de pagamento (transferência via chave PIX) ainda **não está completamente implementado** — veja a seção [Limitações conhecidas](#limitações-conhecidas).

---

## Arquitetura

O projeto é dividido em três partes:

```
JVISA/
├── backend/        → API REST em ASP.NET Core (C#)
├── front/           → SPA em React + Vite + TypeScript
└── bancoDados/       → Script SQL e docker-compose do PostgreSQL
```

### Backend (`backend/`)

API em camadas, seguindo o padrão **Controller → Service → Repository → DbContext**:

```
Controllers/   → endpoints HTTP, validam entrada e delegam para os Services
Services/      → regras de negócio
Repository/    → acesso a dados via Entity Framework Core
Models/        → entidades mapeadas para as tabelas do banco (tb_*)
DTO/           → objetos de transferência usados nas requisições/respostas
Data/          → DbContext e configuração do EF Core
Enums/         → enums do domínio (tipos de usuário, transação, etc.)
Migrations/    → migrations do Entity Framework Core
```

**Stack:**
- .NET 10 / ASP.NET Core Web API
- Entity Framework Core + Npgsql (PostgreSQL)
- Autenticação via JWT Bearer (`Microsoft.AspNetCore.Authentication.JwtBearer`)
- Hash de senha com BCrypt (`BCrypt.Net-Next`)
- Documentação de API via Swagger (`Swashbuckle.AspNetCore`)

**Principais entidades (tabelas `tb_*`):**

| Tabela | Descrição |
|---|---|
| `tb_usuario` | Usuário do sistema (login, senha, tipo/role) |
| `tb_cliente` | Dados pessoais do cliente (CPF, endereço, chave PIX) |
| `tb_conta` | Conta bancária vinculada ao cliente |
| `tb_saldo` | Saldo da conta (1:1 com `tb_conta`) |
| `tb_cartao` | Cartão vinculado à conta |
| `tb_transacao` | Histórico de transações (depósito, saque, transferência) |
| `tb_alertas` | Alertas gerados sobre movimentações |
| `tb_log` | Logs de auditoria/ações do sistema |

### Frontend (`front/`)

SPA construída com **React 18 + TypeScript + Vite**, estilizada com **Tailwind CSS** e componentes **Radix UI / MUI**.

```
src/
├── app/
│   ├── App.tsx           → componente raiz e providers
│   ├── routes.tsx        → definição de rotas e proteção por role
│   ├── components/       → componentes reutilizáveis
│   └── (Pages)/          → páginas da aplicação
├── services/
│   └── api.js             → client HTTP (axios) para consumir a API
├── utils/
│   └── auth.tsx            → helpers de autenticação (token JWT, sessão)
└── styles/                 → tema, fontes e CSS global (Tailwind)
```

### Banco de dados (`bancoDados/`)

- `banco.sql` — script de criação das tabelas.
- `docker-compose.yml` — sobe **PostgreSQL 15** e **pgAdmin** localmente.

> O backend também possui migrations do EF Core (`backend/Migrations/`), então o schema pode ser criado tanto via `banco.sql` quanto via `dotnet ef database update`. Evite rodar os dois em bancos diferentes ao mesmo tempo para não gerar divergência de schema.

---

## Setup

### Pré-requisitos

- [.NET SDK 10](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) 18+ e um gerenciador de pacotes (npm/pnpm)
- [Docker](https://www.docker.com/) (para subir o PostgreSQL) — ou uma instância própria do PostgreSQL 15+

### 1. Banco de dados

```bash
cd bancoDados
docker-compose up -d
```

Isso sobe:
- **PostgreSQL** na porta `5432` (usuário `admin`, senha `1234`, banco `sistema_banco`)
- **pgAdmin** na porta `8082` (login `admin@admin.com` / `admin`)

Em seguida, aplique o schema — pela migration do EF Core (recomendado):

```bash
cd backend
dotnet ef database update
```

ou, alternativamente, rodando `bancoDados/banco.sql` diretamente no banco.

### 2. Backend

```bash
cd backend
dotnet restore
dotnet run
```

A API sobe com Swagger disponível em `/swagger` para explorar os endpoints.

Configurações de conexão e JWT ficam em `backend/appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=sistema_banco;Username=admin;Password=1234"
  },
  "Jwt": {
    "Key": "...",
    "Issuer": "sistema_banco",
    "Audience": "frontend"
  }
}
```

> ⚠️ Esses valores estão como placeholders de desenvolvimento. Antes de qualquer deploy real, mova-os para variáveis de ambiente ou `dotnet user-secrets`.

### 3. Frontend

```bash
cd front
npm install
npm run dev
```

A aplicação sobe via Vite (porta padrão `5173`) e consome a API configurada em `src/services/api.js`.

---

## Roles (perfis de acesso)

O controle de acesso é feito via **claims no token JWT**, validadas nos controllers com `[Authorize(Roles = "...")]`. Existem três perfis definidos no domínio:

| Role | Acesso | Controller correspondente |
|---|---|---|
| **ADMIN** | Gerencia usuários do sistema (CRUD completo) | `AdminController` |
| **USUARIO** | Acessa seus próprios dados: conta, saldo, cartão e transações | `ClienteController` |
| **ANALISTA** | Perfil de monitoramento/análise | *ainda não implementado* |

**Como a role é atribuída:** no cadastro, o tipo de usuário é definido automaticamente por regra sobre o e-mail informado (ex: domínio corporativo específico vira `ANALISTA`, um e-mail fixo vira `ADMIN`, os demais viram `USUARIO`). Essa regra é prática para testes, mas vale revisar antes de um ambiente real — o ideal é que a definição de role seja feita por um admin, não pelo próprio cadastro.

O `ANALISTA` já existe no enum de tipos de usuário e há páginas correspondentes no frontend, mas o backend ainda não tem um controller/service dedicado a esse perfil.

---

## Limitações conhecidas

- **Transferência via PIX incompleta:** o modelo `tb_transacao` já tem o campo de chave PIX (`trs_cli_chave_pix`) e o frontend já tem as telas (`PixTransferForm`, `TransferPage`), mas não há endpoint no backend que resolva a chave PIX do destinatário e execute a transferência entre contas.
- **Perfil ANALISTA:** existe no domínio (enum, rotas protegidas no front) mas sem controller/service no backend.
- **Segurança para produção:** connection string e chave JWT precisam sair do `appsettings.json` versionado antes de qualquer deploy.

---

## Endpoints principais (via Swagger)

Ao rodar o backend, acesse `/swagger` para a lista completa e atualizada de endpoints. De forma geral:

- `POST /api/usuario/login` — autenticação, retorna JWT
- `POST /api/usuario/cadastro` — cadastro de novo usuário/cliente
- `GET /api/cliente/...` — dados da conta, saldo, cartão, transações do usuário logado
- `GET|POST|PUT|DELETE /api/admin/usuarios` — gestão de usuários (somente ADMIN)

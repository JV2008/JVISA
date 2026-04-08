# 📊 Fluxogramas de Regras de Negócio — Sistema de Monitoramento Bancário

## 🎯 Objetivo
Documentar de forma detalhada os fluxos de interação dos diferentes perfis do sistema:
- Usuário
- Analista
- Administrador

---

# 👤 FLUXO — USUÁRIO (ACESSO E USO DO SISTEMA)

```mermaid
flowchart TD
    A[Início] --> B[Acessar sistema]
    B --> C{Usuário autenticado?}

    C -- Não --> D[Tela de login]
    D --> E[Inserir email e senha]
    E --> F{Credenciais válidas?}

    F -- Não --> D
    F -- Sim --> G[Redirecionar para dashboard]

    C -- Sim --> G

    G --> H[Visualizar dashboard]
    H --> I[Selecionar opção]

    I --> J[Visualizar movimentações]
    I --> K[Visualizar perfil]

    J --> L[Filtrar movimentações]
    L --> M[Ver detalhes da transação]

    K --> N[Editar dados pessoais]

    M --> O[Voltar ao dashboard]
    N --> O

    O --> P{Deseja sair?}
    P -- Sim --> Q[Logout]
    P -- Não --> H

    Q --> R[Fim]
```

---

# 🧑‍💻 FLUXO — ANALISTA (MONITORAMENTO E ANÁLISE)

```mermaid
flowchart TD
    A[Início] --> B[Login]
    B --> C[Dashboard]

    C --> D[Visualizar movimentações]
    D --> E[Aplicar filtros]
    E --> F[Selecionar transação]

    F --> G[Analisar detalhes]
    G --> H{Atividade suspeita?}

    H -- Não --> I[Voltar lista]

    H -- Sim --> J[Verificar alertas existentes]
    J --> K{Já existe alerta?}

    K -- Sim --> L[Atualizar status]
    K -- Não --> M[Criar alerta manual]

    L --> N[Marcar como em análise]
    N --> O[Investigar]

    O --> P{Confirmado problema?}
    P -- Sim --> Q[Marcar como resolvido]
    P -- Não --> R[Descartar alerta]

    M --> N

    Q --> S[Registrar ação]
    R --> S

    S --> T[Voltar dashboard]
    I --> T

    T --> U[Fim]
```

---

# 🛠️ FLUXO — ADMINISTRADOR (GESTÃO COMPLETA)

```mermaid
flowchart TD
    A[Início] --> B[Login]
    B --> C[Dashboard Admin]

    C --> D[Gerenciar usuários]
    C --> E[Visualizar relatórios]
    C --> F[Visualizar logs]

    %% CRUD USUÁRIOS
    D --> G[Listar usuários]
    G --> H{Ação}

    H -- Criar --> I[Cadastrar usuário]
    H -- Editar --> J[Editar usuário]
    H -- Desativar --> K[Desativar usuário]

    I --> L[Salvar usuário]
    J --> L
    K --> L

    L --> G

    %% RELATÓRIOS
    E --> M[Selecionar tipo de relatório]
    M --> N[Gerar relatório]
    N --> O{Exportar?}

    O -- CSV --> P[Exportar CSV]
    O -- PDF --> Q[Exportar PDF]
    O -- Não --> R[Visualizar na tela]

    P --> S[Download]
    Q --> S
    R --> S

    S --> C

    %% LOGS
    F --> T[Visualizar logs]
    T --> U[Filtrar ações]
    U --> V[Analisar atividade]

    V --> C

    C --> W{Logout?}
    W -- Sim --> X[Sair]
    W -- Não --> C

    X --> Y[Fim]
```

---

# 🚨 FLUXO — SISTEMA (GERAÇÃO DE ALERTAS AUTOMÁTICOS)

```mermaid
flowchart TD
    A[Movimentação recebida] --> B[Buscar usuário]

    B --> C{Valor > 10.000?}
    C -- Sim --> D[Gerar alerta: Valor alto]
    C -- Não --> E[Continuar]

    D --> F
    E --> F{Alta frequência?}

    F -- Sim --> G[Gerar alerta: Muitas transações]
    F -- Não --> H[Continuar]

    G --> I
    H --> I{Horário incomum?}

    I -- Sim --> J[Gerar alerta: Horário suspeito]
    I -- Não --> K[Continuar]

    J --> L
    K --> L[Salvar movimentação]

    L --> M[Fim]
```

---

# 🧠 Observações Gerais

- Cada perfil possui permissões específicas (RBAC)
- O sistema pode gerar múltiplos alertas simultaneamente
- Todas as ações devem ser registradas em log
- Fluxos podem evoluir para eventos em tempo real

---

# 🚀 Próximos Passos

- Transformar fluxos em endpoints (API)
- Criar diagrama de arquitetura
- Implementar regras no back


-- =========================================
-- TABELA: USUARIOS (SISTEMA)
-- =========================================
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha_hash TEXT NOT NULL,
    tipo_usuario INT NOT NULL,
    status BOOLEAN DEFAULT TRUE,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- TABELA: CLIENTES (DADOS PESSOAIS)
-- =========================================
CREATE TABLE tb_cliente (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    rg VARCHAR(20) UNIQUE,
    email VARCHAR(150),
    telefone VARCHAR(20),
    
    -- ENDEREÇO
    logradouro VARCHAR(150),
    numero VARCHAR(10),
    complemento VARCHAR(100),
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    estado VARCHAR(2),
    cep VARCHAR(10),

    data_nascimento DATE,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- TABELA: CONTAS
-- =========================================
CREATE TABLE tb_conta (
    id SERIAL PRIMARY KEY,
    cliente_id INT NOT NULL,
    numero_conta VARCHAR(20) UNIQUE NOT NULL,
    tipo_conta INT NOT NULL,
    status BOOLEAN DEFAULT TRUE,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_cliente_conta
        FOREIGN KEY (cliente_id)
        REFERENCES tb_cliente(id)
        ON DELETE CASCADE
);

-- =========================================
-- TABELA: SALDO
-- =========================================
CREATE TABLE tb_saldo_conta (
    id SERIAL PRIMARY KEY,
    conta_id INT NOT NULL UNIQUE,
    saldo NUMERIC(12,2) DEFAULT 0,
    ultima_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_conta_saldo
        FOREIGN KEY (conta_id)
        REFERENCES tb_conta(id)
        ON DELETE CASCADE
);

-- =========================================
-- TABELA: CARTAO
-- =========================================
CREATE TABLE tb_cartao (
    id SERIAL PRIMARY KEY,
    conta_id INT NOT NULL,
    numero_cartao VARCHAR(20) UNIQUE NOT NULL,
    tipo_cartao INT NOT NULL,
    limite NUMERIC(12,2),
    status BOOLEAN DEFAULT TRUE,
    data_validade DATE,

    CONSTRAINT fk_conta_cartao
        FOREIGN KEY (conta_id)
        REFERENCES tb_conta(id)
        ON DELETE CASCADE
);

-- =========================================
-- TABELA: MOVIMENTACOES
-- =========================================
CREATE TABLE movimentacoes (
    id SERIAL PRIMARY KEY,
    conta_id INT NOT NULL,
    tipo_movimentacao INT NOT NULL,
    valor NUMERIC(12,2) NOT NULL,
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_conta_movimentacao
        FOREIGN KEY (conta_id)
        REFERENCES tb_conta(id)
        ON DELETE CASCADE
);

-- =========================================
-- TABELA: ALERTAS
-- =========================================
CREATE TABLE alertas (
    id SERIAL PRIMARY KEY,
    movimentacao_id INT,
    tipo_alerta VARCHAR(50) NOT NULL,
    descricao TEXT,
    status INT DEFAULT 1,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_movimentacao_alerta
        FOREIGN KEY (movimentacao_id)
        REFERENCES movimentacoes(id)
        ON DELETE SET NULL
);

-- =========================================
-- TABELA: LOGS (AUDITORIA)
-- =========================================
CREATE TABLE logs (
    id SERIAL PRIMARY KEY,
    usuario_id INT,
    acao VARCHAR(100) NOT NULL,
    entidade VARCHAR(50),
    entidade_id INT,
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_usuario_log
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
        ON DELETE SET NULL
);

-- =========================================
-- ÍNDICES (PERFORMANCE)
-- =========================================
CREATE INDEX idx_cliente_cpf ON tb_cliente(cpf);
CREATE INDEX idx_conta_cliente ON tb_conta(cliente_id);
CREATE INDEX idx_movimentacoes_conta ON movimentacoes(conta_id);
CREATE INDEX idx_alertas_status ON alertas(status);
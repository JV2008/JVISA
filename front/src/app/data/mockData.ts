export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  date: string;
  time: string;
  location: string;
  category: string;
  receipt?: string;
  status: string;
}

export interface Alert {
  id: string;
  transactionId: string;
  type: 'manual' | 'automatic';
  severity: 'low' | 'medium' | 'high';
  status: 'pending' | 'analyzing' | 'resolved' | 'dismissed';
  reason: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  notes?: string;
  actions?: string[];
}

export const accountData = {
  name: "Maria Silva",
  accountNumber: "12345-6",
  agency: "0001",
  cardNumber: "**** **** **** 4829",
  balance: 15847.32,
};

export const transactions: Transaction[] = [
  {
    id: "1",
    description: "Supermercado Zona Sul",
    amount: -234.50,
    type: "debit",
    date: "2026-03-24",
    time: "14:32",
    location: "Rio de Janeiro, RJ",
    category: "Alimentação",
    receipt: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=600&fit=crop",
    status: "Ativo"
  },
  {
    id: "2",
    description: "Salário Mensal",
    amount: 5800.00,
    type: "credit",
    date: "2026-03-23",
    time: "08:00",
    location: "Transferência Bancária",
    category: "Salário",
    status: "Ativo"
  },
  {
    id: "3",
    description: "Netflix Assinatura",
    amount: -44.90,
    type: "debit",
    date: "2026-03-22",
    time: "10:15",
    location: "São Paulo, SP",
    category: "Entretenimento",
    status: "Ativo"
  },
  {
    id: "4",
    description: "Farmácia São Paulo",
    amount: -89.90,
    type: "debit",
    date: "2026-03-21",
    time: "16:45",
    location: "São Paulo, SP",
    category: "Saúde",
    receipt: "https://images.unsplash.com/photo-1576602976047-174e57a47881?w=400&h=600&fit=crop",
    status: "Ativo",
  },
  {
    id: "5",
    description: "Transferência Recebida",
    amount: 350.00,
    type: "credit",
    date: "2026-03-20",
    time: "11:20",
    location: "PIX - João Santos",
    category: "Transferência",
    status: "Ativo",
  },
  {
    id: "6",
    description: "Posto Ipiranga",
    amount: -180.00,
    type: "debit",
    date: "2026-03-19",
    time: "07:30",
    location: "São Paulo, SP",
    category: "Combustível",
    receipt: "https://images.unsplash.com/photo-1545262810-77515befe149?w=400&h=600&fit=crop",
    status: "Ativo",
  },
  {
    id: "7",
    description: "Restaurante Bella Vista",
    amount: -125.80,
    type: "debit",
    date: "2026-03-18",
    time: "20:15",
    location: "São Paulo, SP",
    category: "Alimentação",
    receipt: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=600&fit=crop",
    status: "Ativo",
  },
  {
    id: "8",
    description: "Amazon.com.br",
    amount: -299.90,
    type: "debit",
    date: "2026-03-17",
    time: "15:22",
    location: "Compra Online",
    category: "Shopping",
    status: "Ativo",
  },
  {
    id: "9",
    description: "Freelance - Design",
    amount: 1200.00,
    type: "credit",
    date: "2026-03-16",
    time: "14:00",
    location: "Transferência Bancária",
    category: "Freelance",
    status: "Ativo",
  },
  {
    id: "10",
    description: "Academia Fit",
    amount: -129.90,
    type: "debit",
    date: "2026-03-15",
    time: "06:45",
    location: "São Paulo, SP",
    category: "Saúde",
    status: "Ativo",
  },
  {
    id: "11",
    description: "Uber",
    amount: -28.50,
    type: "debit",
    date: "2026-03-14",
    time: "18:30",
    location: "São Paulo, SP",
    category: "Transporte",
    status: "Ativo",
  },
  {
    id: "12",
    description: "Padaria Central",
    amount: -15.80,
    type: "debit",
    date: "2026-03-13",
    time: "07:15",
    location: "São Paulo, SP",
    category: "Alimentação",
    status: "Ativo",
  },
];



export const alerts: Alert[] = [
  {
    id: "ALT001",
    transactionId: "1",
    type: "automatic",
    severity: "high",
    status: "analyzing",
    reason: "Transferência internacional em horário suspeito + alto valor",
    createdBy: "Sistema Automático",
    createdAt: "2026-03-25T02:35:00",
    updatedAt: "2026-03-25T09:00:00",
    notes: "Cliente entrou em contato, alegando não reconhecer a transação",
    actions: ["Bloqueio temporário da conta", "Contato com cliente iniciado"]
  },
  {
    id: "ALT002",
    transactionId: "2",
    type: "automatic",
    severity: "high",
    status: "pending",
    reason: "Compra em site de risco + horário incomum",
    createdBy: "Sistema Automático",
    createdAt: "2026-03-25T03:16:00",
    updatedAt: "2026-03-25T03:16:00",
  },
  {
    id: "ALT003",
    transactionId: "5",
    type: "manual",
    severity: "medium",
    status: "resolved",
    reason: "Múltiplas transferências PIX em curto período",
    createdBy: "Analista: Maria Lima",
    createdAt: "2026-03-24T14:30:00",
    updatedAt: "2026-03-24T18:00:00",
    notes: "Verificado com cliente. Pagamentos legítimos de fornecedores.",
    actions: ["Cliente contatado", "Documentação verificada", "Caso resolvido"]
  },
  {
    id: "ALT004",
    transactionId: "7",
    type: "automatic",
    severity: "high",
    status: "pending",
    reason: "Transferência para conta recém-criada + horário suspeito",
    createdBy: "Sistema Automático",
    createdAt: "2026-03-24T01:13:00",
    updatedAt: "2026-03-24T01:13:00",
  },
  {
    id: "ALT005",
    transactionId: "9",
    type: "automatic",
    severity: "high",
    status: "analyzing",
    reason: "Transação com site de cassino online",
    createdBy: "Sistema Automático",
    createdAt: "2026-03-23T03:31:00",
    updatedAt: "2026-03-25T08:30:00",
    notes: "Investigando padrão de comportamento do usuário",
    actions: ["Análise de histórico em andamento"]
  },
];

export const analystData = {
  name: "Maria Lima",
  role: "Analista de Fraudes Sênior",
  department: "Segurança e Compliance",
  pendingAlerts: alerts.filter(a => a.status === 'pending').length,
  analyzingAlerts: alerts.filter(a => a.status === 'analyzing').length,
  resolvedToday: 8,
  totalTransactionsToday: transactions.length,
};

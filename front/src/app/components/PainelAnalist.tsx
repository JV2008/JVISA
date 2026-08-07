import { useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, RadialBarChart, RadialBar
} from 'recharts';
import {
  CheckCircle2, Clock, XCircle, TrendingUp, TrendingDown,
  Activity, ArrowUpRight, ArrowDownRight, Filter, Download,
  RefreshCw, ChevronUp, ChevronDown
} from 'lucide-react';

// ─── Mock Data ────────────────────────────────────────────────────────────────

const dailyData = [
  { dia: '01/04', aprovadas: 142, pendentes: 28, rejeitadas: 12 },
  { dia: '02/04', aprovadas: 178, pendentes: 35, rejeitadas: 18 },
  { dia: '03/04', aprovadas: 165, pendentes: 22, rejeitadas: 9 },
  { dia: '04/04', aprovadas: 210, pendentes: 41, rejeitadas: 22 },
  { dia: '05/04', aprovadas: 195, pendentes: 30, rejeitadas: 15 },
  { dia: '06/04', aprovadas: 88,  pendentes: 14, rejeitadas: 6 },
  { dia: '07/04', aprovadas: 74,  pendentes: 10, rejeitadas: 4 },
  { dia: '08/04', aprovadas: 231, pendentes: 47, rejeitadas: 25 },
  { dia: '09/04', aprovadas: 198, pendentes: 36, rejeitadas: 19 },
  { dia: '10/04', aprovadas: 245, pendentes: 52, rejeitadas: 28 },
  { dia: '11/04', aprovadas: 220, pendentes: 38, rejeitadas: 17 },
  { dia: '12/04', aprovadas: 189, pendentes: 29, rejeitadas: 11 },
  { dia: '13/04', aprovadas: 96,  pendentes: 16, rejeitadas: 7 },
  { dia: '14/04', aprovadas: 82,  pendentes: 12, rejeitadas: 5 },
];

const volumeData = [
  { dia: '01/04', valor: 482000 },
  { dia: '02/04', valor: 615000 },
  { dia: '03/04', valor: 540000 },
  { dia: '04/04', valor: 728000 },
  { dia: '05/04', valor: 690000 },
  { dia: '06/04', valor: 312000 },
  { dia: '07/04', valor: 278000 },
  { dia: '08/04', valor: 823000 },
  { dia: '09/04', valor: 710000 },
  { dia: '10/04', valor: 895000 },
  { dia: '11/04', valor: 768000 },
  { dia: '12/04', valor: 630000 },
  { dia: '13/04', valor: 341000 },
  { dia: '14/04', valor: 295000 },
];

const distribuicaoPie = [
  { name: 'Aprovadas', value: 2113, color: '#22c55e' },
  { name: 'Pendentes', value: 410,  color: '#f59e0b' },
  { name: 'Rejeitadas', value: 198, color: '#ef4444' },
];

const categoriaData = [
  { categoria: 'PIX',           aprovadas: 820, pendentes: 140, rejeitadas: 68 },
  { categoria: 'Transferência', aprovadas: 540, pendentes: 95,  rejeitadas: 52 },
  { categoria: 'Boleto',        aprovadas: 380, pendentes: 72,  rejeitadas: 30 },
  { categoria: 'Saque',         aprovadas: 210, pendentes: 48,  rejeitadas: 24 },
  { categoria: 'Depósito',      aprovadas: 163, pendentes: 55,  rejeitadas: 24 },
];

const horaData = [
  { hora: '00h', transacoes: 18 }, { hora: '02h', transacoes: 12 },
  { hora: '04h', transacoes: 8  }, { hora: '06h', transacoes: 25 },
  { hora: '08h', transacoes: 142 }, { hora: '10h', transacoes: 210 },
  { hora: '12h', transacoes: 198 }, { hora: '14h', transacoes: 225 },
  { hora: '16h', transacoes: 248 }, { hora: '18h', transacoes: 190 },
  { hora: '20h', transacoes: 132 }, { hora: '22h', transacoes: 64 },
];

const radialData = [
  { name: 'Aprovadas', value: 78.5, fill: '#22c55e' },
  { name: 'Pendentes', value: 15.1, fill: '#f59e0b' },
  { name: 'Rejeitadas', value: 7.3,  fill: '#ef4444' },
];

const recentTransactions = [
  { id: 'TXN-8821', usuario: 'João Silva',    tipo: 'PIX',           valor: 'R$ 2.500,00', status: 'aprovada',  hora: '14:32' },
  { id: 'TXN-8820', usuario: 'Maria Santos',  tipo: 'Transferência', valor: 'R$ 8.200,00', status: 'pendente',  hora: '14:28' },
  { id: 'TXN-8819', usuario: 'Carlos Lima',   tipo: 'Boleto',        valor: 'R$ 450,00',   status: 'aprovada',  hora: '14:21' },
  { id: 'TXN-8818', usuario: 'Ana Oliveira',  tipo: 'PIX',           valor: 'R$15.000,00', status: 'rejeitada', hora: '14:15' },
  { id: 'TXN-8817', usuario: 'Pedro Costa',   tipo: 'Saque',         valor: 'R$ 3.000,00', status: 'pendente',  hora: '14:09' },
  { id: 'TXN-8816', usuario: 'Lucia Mendes',  tipo: 'Transferência', valor: 'R$ 1.200,00', status: 'aprovada',  hora: '14:02' },
  { id: 'TXN-8815', usuario: 'Roberto Dias',  tipo: 'PIX',           valor: 'R$ 5.500,00', status: 'rejeitada', hora: '13:55' },
  { id: 'TXN-8814', usuario: 'Sandra Alves',  tipo: 'Depósito',      valor: 'R$ 7.800,00', status: 'aprovada',  hora: '13:48' },
];

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

const CustomBarTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-3 shadow-2xl">
        <p className="text-slate-300 text-xs mb-2">{label}</p>
        {payload.map((p: any) => (
          <div key={p.name} className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
            <span className="text-slate-400">{p.name}:</span>
            <span className="text-white font-semibold">{p.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const CustomAreaTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-3 shadow-2xl">
        <p className="text-slate-300 text-xs mb-1">{label}</p>
        <p className="text-white font-semibold text-sm">
          R$ {(payload[0].value / 1000).toFixed(0)}K
        </p>
      </div>
    );
  }
  return null;
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central"
      fontSize={11} fontWeight={700}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// ─── Period Filter ────────────────────────────────────────────────────────────

const periods = ['7 dias', '14 dias', '30 dias', '90 dias'];

// ─── Component ───────────────────────────────────────────────────────────────

export function PainelPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('14 dias');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const total = distribuicaoPie.reduce((s, d) => s + d.value, 0);
  const aprovadas = distribuicaoPie[0].value;
  const pendentes  = distribuicaoPie[1].value;
  const rejeitadas = distribuicaoPie[2].value;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const statusConfig: Record<string, { label: string; bg: string; text: string; dot: string }> = {
    aprovada:  { label: 'Aprovada',  bg: 'bg-green-50',  text: 'text-green-700',  dot: 'bg-green-500' },
    pendente:  { label: 'Pendente',  bg: 'bg-yellow-50', text: 'text-yellow-700', dot: 'bg-yellow-500' },
    rejeitada: { label: 'Rejeitada', bg: 'bg-red-50',    text: 'text-red-700',    dot: 'bg-red-500' },
  };

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="mb-1">Painel de Transações</h1>
          <p className="text-gray-500 text-sm">Monitoramento em tempo real · Atualizado às 14:38</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {/* Period selector */}
          <div className="flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            {periods.map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPeriod(p)}
                className={`px-3 py-2 text-xs font-medium transition ${
                  selectedPeriod === p
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 text-sm shadow-sm transition"
          >
            <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
            Atualizar
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm shadow-sm hover:bg-blue-700 transition">
            <Download size={14} />
            Exportar
          </button>
        </div>
      </div>

      {/* ── KPI Cards ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <Activity size={20} className="text-white" />
            </div>
            <span className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
              <ArrowUpRight size={12} /> +8,3%
            </span>
          </div>
          <p className="text-3xl font-bold text-white">{total.toLocaleString('pt-BR')}</p>
          <p className="text-slate-400 text-sm mt-1">Total de Transações</p>
          <div className="mt-3 w-full bg-white/10 rounded-full h-1">
            <div className="bg-blue-400 h-1 rounded-full" style={{ width: '100%' }} />
          </div>
        </div>

        {/* Aprovadas */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle2 size={20} className="text-green-600" />
            </div>
            <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
              <ArrowUpRight size={12} /> +12,1%
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{aprovadas.toLocaleString('pt-BR')}</p>
          <p className="text-gray-500 text-sm mt-1">Aprovadas</p>
          <div className="mt-3 w-full bg-gray-100 rounded-full h-1.5">
            <div className="bg-green-500 h-1.5 rounded-full transition-all" style={{ width: `${(aprovadas/total*100).toFixed(0)}%` }} />
          </div>
          <p className="text-xs text-gray-400 mt-1">{(aprovadas/total*100).toFixed(1)}% do total</p>
        </div>

        {/* Pendentes */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Clock size={20} className="text-yellow-600" />
            </div>
            <span className="flex items-center gap-1 text-xs text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">
              <ChevronDown size={12} /> -3,4%
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{pendentes.toLocaleString('pt-BR')}</p>
          <p className="text-gray-500 text-sm mt-1">Pendentes</p>
          <div className="mt-3 w-full bg-gray-100 rounded-full h-1.5">
            <div className="bg-yellow-500 h-1.5 rounded-full transition-all" style={{ width: `${(pendentes/total*100).toFixed(0)}%` }} />
          </div>
          <p className="text-xs text-gray-400 mt-1">{(pendentes/total*100).toFixed(1)}% do total</p>
        </div>

        {/* Rejeitadas */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
              <XCircle size={20} className="text-red-600" />
            </div>
            <span className="flex items-center gap-1 text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">
              <ArrowDownRight size={12} /> -5,8%
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{rejeitadas.toLocaleString('pt-BR')}</p>
          <p className="text-gray-500 text-sm mt-1">Rejeitadas</p>
          <div className="mt-3 w-full bg-gray-100 rounded-full h-1.5">
            <div className="bg-red-500 h-1.5 rounded-full transition-all" style={{ width: `${(rejeitadas/total*100).toFixed(0)}%` }} />
          </div>
          <p className="text-xs text-gray-400 mt-1">{(rejeitadas/total*100).toFixed(1)}% do total</p>
        </div>
      </div>

      {/* ── Row 2: Bar chart + Donut ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Stacked Bar – daily breakdown */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-gray-900 mb-0.5">Transações por Dia</h2>
              <p className="text-gray-500 text-xs">Distribuição diária por status</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-green-500 inline-block" />Aprovadas</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-yellow-400 inline-block" />Pendentes</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-red-500 inline-block" />Rejeitadas</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={dailyData} barSize={14} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="dia" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomBarTooltip />} cursor={{ fill: 'rgba(0,0,0,0.04)', radius: 4 }} />
              <Bar dataKey="aprovadas" name="Aprovadas" fill="#22c55e" radius={[3,3,0,0]} stackId="a" />
              <Bar dataKey="pendentes"  name="Pendentes"  fill="#facc15" radius={[0,0,0,0]} stackId="a" />
              <Bar dataKey="rejeitadas" name="Rejeitadas" fill="#ef4444" radius={[3,3,0,0]} stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Donut Pie */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col">
          <div className="mb-4">
            <h2 className="text-gray-900 mb-0.5">Distribuição</h2>
            <p className="text-gray-500 text-xs">Proporção por status · {selectedPeriod}</p>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={distribuicaoPie}
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={88}
                  paddingAngle={3}
                  dataKey="value"
                  labelLine={false}
                  label={renderCustomizedLabel}
                >
                  {distribuicaoPie.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [value.toLocaleString('pt-BR'), '']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {distribuicaoPie.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-900">{item.value.toLocaleString('pt-BR')}</span>
                  <span className="text-xs text-gray-400 w-10 text-right">{(item.value/total*100).toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Row 3: Volume Area + Hora pico ─────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Area chart – volume R$ */}
        <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-white mb-0.5">Volume Financeiro</h2>
              <p className="text-slate-400 text-xs">Montante total movimentado por dia</p>
            </div>
            <div className="flex items-center gap-2 text-emerald-400 text-sm bg-emerald-400/10 px-3 py-1.5 rounded-full">
              <TrendingUp size={14} />
              <span>+18,4%</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={volumeData}>
              <defs>
                <linearGradient id="colorVol" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="dia" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 10, fill: '#64748b' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${(v/1000).toFixed(0)}K`}
              />
              <Tooltip content={<CustomAreaTooltip />} />
              <Area
                type="monotone"
                dataKey="valor"
                stroke="#3b82f6"
                strokeWidth={2.5}
                fill="url(#colorVol)"
                dot={false}
                activeDot={{ r: 5, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pico por hora */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="mb-4">
            <h2 className="text-gray-900 mb-0.5">Pico por Hora</h2>
            <p className="text-gray-500 text-xs">Concentração de transações no dia</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={horaData} layout="vertical" barSize={10}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 9, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="hora" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={28} />
              <Tooltip
                formatter={(v: number) => [v, 'Transações']}
                contentStyle={{ background: '#1e293b', border: 'none', borderRadius: 8, color: '#fff', fontSize: 12 }}
              />
              <Bar dataKey="transacoes" radius={[0,4,4,0]}>
                {horaData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.transacoes > 200 ? '#3b82f6' : entry.transacoes > 100 ? '#60a5fa' : '#bfdbfe'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Row 4: Por categoria + Radial ──────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Grouped Bar – by category */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-gray-900 mb-0.5">Por Tipo de Operação</h2>
              <p className="text-gray-500 text-xs">Status por categoria de transação</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-green-500 inline-block" />Aprovadas</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-yellow-400 inline-block" />Pendentes</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-red-500 inline-block" />Rejeitadas</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={categoriaData} barSize={14} barGap={3}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="categoria" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomBarTooltip />} cursor={{ fill: 'rgba(0,0,0,0.04)', radius: 4 }} />
              <Bar dataKey="aprovadas" name="Aprovadas" fill="#22c55e" radius={[3,3,0,0]} />
              <Bar dataKey="pendentes"  name="Pendentes"  fill="#facc15" radius={[3,3,0,0]} />
              <Bar dataKey="rejeitadas" name="Rejeitadas" fill="#ef4444" radius={[3,3,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Radial chart – taxa de sucesso */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col">
          <div className="mb-4">
            <h2 className="text-gray-900 mb-0.5">Taxa de Sucesso</h2>
            <p className="text-gray-500 text-xs">Percentual por status do período</p>
          </div>
          <div className="flex-1 flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height={200}>
              <RadialBarChart
                cx="50%" cy="50%"
                innerRadius="25%" outerRadius="85%"
                barSize={14}
                data={radialData}
                startAngle={90}
                endAngle={-270}
              >
                <RadialBar
                  background={{ fill: '#f3f4f6' }}
                  dataKey="value"
                  cornerRadius={8}
                />
                <Tooltip
                  formatter={(v: number) => [`${v}%`, '']}
                  contentStyle={{ background: '#1e293b', border: 'none', borderRadius: 8, color: '#fff', fontSize: 12 }}
                />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">78,5%</p>
                <p className="text-xs text-gray-500">Aprovação</p>
              </div>
            </div>
          </div>
          <div className="space-y-3 mt-2">
            {radialData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }} />
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Recent Transactions Table ───────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-gray-900 mb-0.5">Transações Recentes</h2>
            <p className="text-gray-500 text-xs">Últimas movimentações do sistema</p>
          </div>
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 text-sm transition">
            <Filter size={14} />
            Filtrar
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">ID</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Usuário</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Tipo</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Valor</th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Hora</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentTransactions.map((tx) => {
                const cfg = statusConfig[tx.status];
                return (
                  <tr key={tx.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{tx.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-semibold">
                          {tx.usuario.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <span className="font-medium text-gray-900">{tx.usuario}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{tx.tipo}</td>
                    <td className="px-6 py-4 text-right font-semibold text-gray-900">{tx.valor}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-gray-500 text-xs">{tx.hora}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <span>Exibindo 8 de 2.721 transações</span>
          <button className="text-blue-600 hover:text-blue-700 font-medium">Ver todas →</button>
        </div>
      </div>

    </div>
  );
}

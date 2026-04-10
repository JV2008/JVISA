import { Link, useNavigate } from 'react-router';
import { Eye, EyeOff, CreditCard, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { accountData, transactions } from '../data/mockData';
import { getUser } from '../../utils/auth';

export function Dashboard() {
  const [showBalance, setShowBalance] = useState(true);
  const recentTransactions = transactions.slice(0, 5);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(Math.abs(value));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
    }).format(date);
  };
  const navigate = useNavigate();
  const user = getUser();

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="mb-2">Olá, {user?.nome}!</h1>
        <p className="text-gray-600">Bem-vindo ao seu banco digital</p>
      </div>

      {/* Account Card */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white mb-6 shadow-lg">
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-blue-100 text-sm mb-1">Saldo disponível</p>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-semibold">
                {showBalance ? formatCurrency(accountData.balance) : '•••••'}
              </span>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-1 hover:bg-white/20 rounded-lg transition"
              >
                {showBalance ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <CreditCard size={32} className="text-blue-200" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-blue-100 text-xs mb-1">Agência</p>
            <p className="font-medium">{accountData.agency}</p>
          </div>
          <div>
            <p className="text-blue-100 text-xs mb-1">Conta</p>
            <p className="font-medium">{accountData.accountNumber}</p>
          </div>
          <div className="col-span-2">
            <p className="text-blue-100 text-xs mb-1">Cartão</p>
            <p className="font-medium tracking-wider">{accountData.cardNumber}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <button onClick={() => navigate('/tranferir')}
          className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100">

          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-3">
            <TrendingUp className="text-blue-600" size={24} />
          </div>
          <p className="text-sm font-medium text-gray-900">Transferir</p>
        </button>
        <button className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100">
          <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-3">
            <TrendingDown className="text-green-600" size={24} />
          </div>
          <p className="text-sm font-medium text-gray-900">Depositar</p>
        </button>
        <button className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100">
          <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mb-3">
            <CreditCard className="text-purple-600" size={24} />
          </div>
          <p className="text-sm font-medium text-gray-900">Pagar</p>
        </button>
        <button className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100">
          <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mb-3">
            <span className="text-orange-600 text-xl">💰</span>
          </div>
          <p className="text-sm font-medium text-gray-900">Investir</p>
        </button>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="mb-1">Movimentações Recentes</h2>
            <p className="text-sm text-gray-600">Últimas transações da sua conta</p>
          </div>
          <Link
            to="/extrato"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            Ver extrato completo
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="divide-y divide-gray-100">
          {recentTransactions.map((transaction) => (
            <Link
              key={transaction.id}
              to={`/transacao/${transaction.id}`}
              className="flex items-center justify-between p-6 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${transaction.type === 'credit'
                      ? 'bg-green-50'
                      : 'bg-red-50'
                    }`}
                >
                  {transaction.type === 'credit' ? (
                    <TrendingUp className="text-green-600" size={20} />
                  ) : (
                    <TrendingDown className="text-red-600" size={20} />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{transaction.description}</p>
                  <p className="text-sm text-gray-500">{formatDate(transaction.date)}</p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`font-semibold ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                    }`}
                >
                  {transaction.type === 'credit' ? '+' : '-'} {formatCurrency(transaction.amount)}
                </p>
                <p className="text-sm text-gray-500">{transaction.time}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

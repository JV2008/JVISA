import { Link } from 'react-router';
import { TrendingUp, TrendingDown, Calendar, Filter } from 'lucide-react';
import { transactions } from '../data/mockData';

export function Extrato() {
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
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  const formatDateShort = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
    }).format(date);
  };

  // Group transactions by date
  const groupedTransactions = transactions.reduce((groups, transaction) => {
    const date = transaction.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {} as Record<string, typeof transactions>);

  // Calculate totals
  const totalCredit = transactions
    .filter(t => t.type === 'credit')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalDebit = transactions
    .filter(t => t.type === 'debit')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="mb-2">Extrato Completo</h1>
        <p className="text-gray-600">Todas as suas movimentações financeiras</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
              <TrendingUp className="text-green-600" size={20} />
            </div>
            <p className="text-sm text-gray-600">Entradas</p>
          </div>
          <p className="text-2xl font-semibold text-green-600">{formatCurrency(totalCredit)}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
              <TrendingDown className="text-red-600" size={20} />
            </div>
            <p className="text-sm text-gray-600">Saídas</p>
          </div>
          <p className="text-2xl font-semibold text-red-600">{formatCurrency(totalDebit)}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
              <Calendar className="text-blue-600" size={20} />
            </div>
            <p className="text-sm text-gray-600">Total de transações</p>
          </div>
          <p className="text-2xl font-semibold text-gray-900">{transactions.length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition">
            <Filter size={16} />
            Filtrar por período
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
            Todas
          </button>
          <button className="px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition">
            Entradas
          </button>
          <button className="px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition">
            Saídas
          </button>
        </div>
      </div>

      {/* Transactions List */}
      <div className="space-y-6">
        {Object.entries(groupedTransactions).map(([date, dateTransactions]) => (
          <div key={date} className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <p className="font-medium text-gray-900">{formatDate(date)}</p>
            </div>
            <div className="divide-y divide-gray-100">
              {dateTransactions.map((transaction) => (
                <Link
                  key={transaction.id}
                  to={`/transacao/${transaction.id}`}
                  className="flex items-center justify-between p-6 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        transaction.type === 'credit'
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
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm text-gray-500">{transaction.time}</span>
                        <span className="text-sm text-gray-400">•</span>
                        <span className="text-sm text-gray-500">{transaction.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-semibold text-lg ${
                        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {transaction.type === 'credit' ? '+' : '-'} {formatCurrency(transaction.amount)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

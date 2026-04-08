import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, MapPin, Calendar, Clock, Tag, Download, Share2, TrendingUp, TrendingDown } from 'lucide-react';
import { transactions } from '../data/mockData';

export function TransactionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const transaction = transactions.find(t => t.id === id);

  if (!transaction) {
    return (
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <p className="text-gray-600 mb-4">Transação não encontrada</p>
          <button
            onClick={() => navigate('/extrato')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Voltar ao extrato
          </button>
        </div>
      </div>
    );
  }

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

  const formatFullDate = (dateString: string, time: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition"
      >
        <ArrowLeft size={20} />
        <span>Voltar</span>
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className={`p-8 ${transaction.type === 'credit' ? 'bg-green-50' : 'bg-red-50'}`}>
          <div className="flex items-center justify-center mb-4">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center ${
                transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
              }`}
            >
              {transaction.type === 'credit' ? (
                <TrendingUp className={transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'} size={32} />
              ) : (
                <TrendingDown className="text-red-600" size={32} />
              )}
            </div>
          </div>
          <h1 className="text-center mb-2">{transaction.description}</h1>
          <p
            className={`text-center text-4xl font-semibold ${
              transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {transaction.type === 'credit' ? '+' : '-'} {formatCurrency(transaction.amount)}
          </p>
        </div>

        {/* Details */}
        <div className="p-8">
          <h2 className="mb-6">Detalhes da Transação</h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Calendar className="text-gray-600" size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">Data e hora</p>
                <p className="font-medium text-gray-900">{formatFullDate(transaction.date, transaction.time)}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="text-gray-600" size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">Local</p>
                <p className="font-medium text-gray-900">{transaction.location}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Tag className="text-gray-600" size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">Categoria</p>
                <p className="font-medium text-gray-900">{transaction.category}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="text-gray-600" size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">Status</p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Concluída
                </span>
              </div>
            </div>
          </div>

          {/* Receipt/Proof */}
          {transaction.receipt && (
            <div className="mt-8 pt-8 border-t border-gray-100">
              <h3 className="mb-4">Comprovante</h3>
              <div className="bg-gray-50 rounded-lg overflow-hidden">
                <img
                  src={transaction.receipt}
                  alt="Comprovante"
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 mt-8 pt-8 border-t border-gray-100">
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <Download size={20} />
              <span>Baixar Comprovante</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
              <Share2 size={20} />
              <span>Compartilhar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

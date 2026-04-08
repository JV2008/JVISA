import { Link } from 'react-router';
import { AlertTriangle, TrendingUp, CheckCircle, Clock, ArrowRight, Activity } from 'lucide-react';
import { analystData, alerts, transactions } from '../../data/mockData';
import { getUser } from '../../../utils/auth';

export function AnalistaPage() {
  const suspiciousTransactions = transactions.filter(t => t.status === 'suspicious');
  const recentAlerts = alerts.slice(0, 5);
  const user = getUser();


  return (

    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2">Bem-vindo, {user?.nome}!</h1>
        <p className="text-gray-600">{analystData.department} - {analystData.role}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="text-red-600" size={24} />
            </div>
            <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">
              URGENTE
            </span>
          </div>
          <p className="text-3xl font-semibold text-gray-900 mb-1">{analystData.pendingAlerts}</p>
          <p className="text-sm text-gray-600">Alertas Pendentes</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="text-yellow-600" size={24} />
            </div>
          </div>
          <p className="text-3xl font-semibold text-gray-900 mb-1">{analystData.analyzingAlerts}</p>
          <p className="text-sm text-gray-600">Em Análise</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="text-green-600" size={24} />
            </div>
          </div>
          <p className="text-3xl font-semibold text-gray-900 mb-1">{analystData.resolvedToday}</p>
          <p className="text-sm text-gray-600">Resolvidos Hoje</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Activity className="text-blue-600" size={24} />
            </div>
          </div>
          <p className="text-3xl font-semibold text-gray-900 mb-1">{suspiciousTransactions.length}</p>
          <p className="text-sm text-gray-600">Transações Suspeitas</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Link
          to="/movimentacoes?filter=suspicious"
          className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl p-6 hover:from-red-600 hover:to-red-700 transition shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white mb-2">Visualizar Movimentações Suspeitas</h3>
              <p className="text-red-100 text-sm">
                {suspiciousTransactions.length} transações requerem análise
              </p>
            </div>
            <ArrowRight size={24} />
          </div>
        </Link>

        <Link
          to="/alertas?status=pending"
          className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-xl p-6 hover:from-yellow-600 hover:to-yellow-700 transition shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white mb-2">Alertas Pendentes</h3>
              <p className="text-yellow-100 text-sm">
                {analystData.pendingAlerts} alertas aguardando ação
              </p>
            </div>
            <ArrowRight size={24} />
          </div>
        </Link>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="mb-1">Alertas Recentes</h2>
            <p className="text-sm text-gray-600">Últimas atividades do sistema</p>
          </div>
          <Link
            to="/alertas"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            Ver todos
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="divide-y divide-gray-200">
          {recentAlerts.map((alert) => {
            const transaction = transactions.find(t => t.id === alert.transactionId);
            
            const severityColors = {
              high: 'bg-red-100 text-red-700 border-red-200',
              medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
              low: 'bg-blue-100 text-blue-700 border-blue-200',
            };

            const statusColors = {
              pending: 'bg-gray-100 text-gray-700',
              analyzing: 'bg-yellow-100 text-yellow-700',
              resolved: 'bg-green-100 text-green-700',
              dismissed: 'bg-gray-100 text-gray-500',
            };

            return (
              <Link
                key={alert.id}
                to={`/transacao/${alert.transactionId}`}
                className="p-6 hover:bg-gray-50 transition block"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${severityColors[alert.severity]}`}>
                        {alert.severity === 'high' ? 'ALTA' : alert.severity === 'medium' ? 'MÉDIA' : 'BAIXA'}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[alert.status]}`}>
                        {alert.status === 'pending' ? 'Pendente' : 
                         alert.status === 'analyzing' ? 'Em Análise' : 
                         alert.status === 'resolved' ? 'Resolvido' : 'Descartado'}
                      </span>
                    </div>
                    <p className="font-medium text-gray-900 mb-1">{alert.reason}</p>
                    {transaction && (
                      <p className="text-sm text-gray-600">
                        {transaction.description} - R$ {Math.abs(transaction.amount).toFixed(2)}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-2">{alert.createdBy}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      {new Date(alert.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(alert.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

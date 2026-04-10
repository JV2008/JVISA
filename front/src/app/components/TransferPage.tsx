import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowLeft, Zap, Calendar, FileText } from 'lucide-react';

export function TransferPage() {
  const [selectedMethod, setSelectedMethod] = useState<'pix' | 'boleto' | 'scheduled' | null>(null);
  const navigate = useNavigate();

  const methods = [
    {
      id: 'pix' as const,
      icon: Zap,
      title: 'PIX',
      description: 'Transferência instantânea',
      color: 'from-purple-500 to-purple-600',
      hoverColor: 'from-purple-600 to-purple-700',
    },
    {
      id: 'boleto' as const,
      icon: FileText,
      title: 'Boleto',
      description: 'Pagamento via boleto bancário',
      color: 'from-orange-500 to-orange-600',
      hoverColor: 'from-orange-600 to-orange-700',
    },
    {
      id: 'scheduled' as const,
      icon: Calendar,
      title: 'Agendado',
      description: 'Agendar transferência futura',
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'from-blue-600 to-blue-700',
    },
  ];

  const handleMethodSelect = (methodId: 'pix' | 'boleto' | 'scheduled') => {
    setSelectedMethod(methodId);
    setTimeout(() => {
      navigate(`/transferir/${methodId}`);
    }, 300);
  };

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition"
      >
        <ArrowLeft size={20} />
        <span>Voltar</span>
      </Link>

      <div className="mb-8">
        <h1 className="mb-2">Transferir dinheiro</h1>
        <p className="text-gray-600">Escolha o método de transferência</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {methods.map((method) => {
          const Icon = method.icon;
          const isSelected = selectedMethod === method.id;

          return (
            <button
              onClick={() => navigate('/pixtranfer')}
              className={`bg-gradient-to-br ${method.color} hover:${method.hoverColor} text-white rounded-2xl p-8 transition shadow-lg hover:shadow-xl transform hover:scale-105 ${
                isSelected ? 'scale-105 ring-4 ring-white ring-opacity-50' : ''
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                  <Icon size={32} />
                </div>
                <h3 className="text-white font-semibold text-xl mb-2">{method.title}</h3>
                <p className="text-white text-opacity-90 text-sm">{method.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

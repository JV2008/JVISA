import { Link, useLocation, useNavigate } from 'react-router';
import { ArrowLeft, CheckCircle, User, Calendar } from 'lucide-react';

export function PixTransferConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { keyType, pixKey, amount, description } = location.state || {};

  const handleConfirm = () => {
    navigate('/comprovante', {
      state: {
        keyType,
        pixKey,
        amount,
        description,
        transactionId: `PIX${Date.now()}`,
        date: new Date().toISOString(),
      }
    });
  };

  const formatKeyType = (type: string) => {
    const types: Record<string, string> = {
      cpf: 'CPF/CNPJ',
      email: 'E-mail',
      phone: 'Telefone',
      random: 'Chave aleatória',
    };
    return types[type] || type;
  };

  return (
    <div className="p-6 lg:p-8 max-w-2xl mx-auto">
      <Link
        to="/pix"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition"
      >
        <ArrowLeft size={20} />
        <span>Voltar</span>
      </Link>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="text-purple-600" size={32} />
          </div>
          <h1 className="mb-2">Confirme os dados</h1>
          <p className="text-gray-600">Verifique as informações antes de continuar</p>
        </div>

        <div className="space-y-6 mb-8">
          <div className="bg-gray-50 rounded-xl p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600 mb-1">Tipo de chave</p>
                <p className="font-semibold text-gray-900">{formatKeyType(keyType)}</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-600 mb-1">Chave PIX</p>
              <p className="font-medium text-gray-900 break-all">{pixKey}</p>
            </div>

            {description && (
              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-600 mb-1">Descrição</p>
                <p className="font-medium text-gray-900">{description}</p>
              </div>
            )}

            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-600 mb-1">Data</p>
              <p className="font-medium text-gray-900">
                {new Date().toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>

          <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
            <p className="text-sm text-gray-600 mb-2">Valor da transferência</p>
            <p className="text-4xl font-bold text-purple-600">
              R$ {parseFloat(amount).toFixed(2)}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleConfirm}
            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition shadow-lg"
          >
            Confirmar transferência
          </button>
          <Link
            to="/transferir/pix"
            className="block w-full text-center py-3 text-gray-600 hover:text-gray-900 font-medium transition"
          >
            Cancelar
          </Link>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowLeft, User, Mail, Smartphone, Building, CreditCard } from 'lucide-react';

export function PixTransferForm() {
  const [keyType, setKeyType] = useState<'cpf' | 'email' | 'phone' | 'random'>('cpf');
  const [pixKey, setPixKey] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const keyTypes = [
    { id: 'cpf' as const, label: 'CPF/CNPJ', icon: User, placeholder: '000.000.000-00' },
    { id: 'email' as const, label: 'E-mail', icon: Mail, placeholder: 'exemplo@email.com' },
    { id: 'phone' as const, label: 'Telefone', icon: Smartphone, placeholder: '(00) 00000-0000' },
    { id: 'random' as const, label: 'Chave aleatória', icon: CreditCard, placeholder: 'Cole a chave aqui' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/transferir/pix/confirmacao', {
      state: {
        keyType,
        pixKey,
        amount: parseFloat(amount),
        description
      }
    });
  };

  return (
    <div className="p-6 lg:p-8 max-w-2xl mx-auto">
      <Link
        to="/tranferir"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition"
      >
        <ArrowLeft size={20} />
        <span>Voltar</span>
      </Link>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <div className="mb-8">
          <h1 className="mb-2">Transferência PIX</h1>
          <p className="text-gray-600">Preencha os dados para enviar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Key Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Tipo de chave PIX
            </label>
            <div className="grid grid-cols-2 gap-3">
              {keyTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setKeyType(type.id)}
                    className={`p-4 rounded-xl border-2 transition flex items-center gap-3 ${
                      keyType === type.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon size={20} className={keyType === type.id ? 'text-purple-600' : 'text-gray-400'} />
                    <span className={`text-sm font-medium ${
                      keyType === type.id ? 'text-purple-700' : 'text-gray-700'
                    }`}>
                      {type.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* PIX Key Input */}
          <div>
            <label htmlFor="pixKey" className="block text-sm font-medium text-gray-700 mb-2">
              Chave PIX do destinatário
            </label>
            <input
              id="pixKey"
              type="text"
              value={pixKey}
              onChange={(e) => setPixKey(e.target.value)}
              placeholder={keyTypes.find(t => t.id === keyType)?.placeholder}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            />
          </div>

          {/* Amount Input */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
              Valor
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                R$
              </span>
              <input
                id="amount"
                type="number"
                step="0.01"
                min="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0,00"
                required
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Description Input */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Descrição (opcional)
            </label>
            <input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Pagamento almoço"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition shadow-lg"
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}

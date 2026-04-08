import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router';
import { getUser } from '../../utils/auth';
import api from '../../services/api';

export default function RegisterPage() {
  const [nome , setNome] = useState ('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("1. Iniciei o envio");

    try {
      const response = await api.post("api/Auth/register", {
        nome: nome,
        email: email,
        senha: password // OK: Enviando 'senha' para o backend
      });
      console.log("2. Resposta da API recebida:", response.data);

      const token = response.data.token;
       if (token) {
      localStorage.setItem("token", token);
      console.log("3. Token salvo!");
      
      
      const user = getUser(token);
      console.log("4. Resultado do getUser:", user);
      
      if (user && String(user.role).toUpperCase() === "ADMIN") {
        console.log("5. É ADMIN, navegando...");
        navigate('/admin');
      } else if (user && String(user.role).toUpperCase() === "ANALISTA") {
        console.log("6. É Analista, navegando...")
        navigate('/analista')
      }else {
        console.log("Cliente")
        navigate('/')
      }
    }

    }
    catch (error: any) {

      console.error("Erro completo:", error.response?.data);
      const message = error.response?.data || "Erro interno no servidor";
      alert("Falha no login: " + message);
    }
  };


  return (
    <div className="size-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md mx-auto p-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-center mb-8">Bem-vindo</h1>
          <p className="text-center text-gray-600 mb-6">Entre na sua conta bancária</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="mr-2 rounded" />
                <span className="text-gray-600">Lembrar-me</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 transition font-medium"
            >
              Se torne Nosso Cliente
            </button>
          </form>

         
        </div>
      </div>
    </div>
  );
}


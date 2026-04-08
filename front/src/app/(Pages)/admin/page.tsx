"use client";

import { useEffect, useState } from "react";
import api from "../../../services/api";
import Button from "../../components/Button";

interface User {
  usu_id: number;
  usu_nome: string;
  usu_email: string;
  usu_senha: string;
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // GET
  const loadUsers = async () => {
    const res = await api.get("/api/Admin");
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // CREATE
  const createUser = async () => {
    await api.post("/api/Admin", {
      nome,
      email,
      senha,
    });

    setNome("");
    setEmail("");
    setSenha("");

    loadUsers();
  };

  // DELETE
  const deleteUser = async (usu_id: number) => {
    await api.delete(`/api/Admin/${usu_id}`);
    loadUsers();
  };

  // UPDATE
  const updateUser = async (usu_id: number) => {
    await api.put(`/api/Admin/${usu_id}`, {
      nome: nome,
      email: email,
    });

    loadUsers();
  };

  return (
   <div className="flex min-h-screen bg-black p-8">
  <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full">
    
    {/* Título Principal - Mais elegante, sem sombras excessivas */}
    <h1 className="text-5xl font-extrabold text-center py-6 bg-black rounded-3xl shadow-sm border border-[#FFFEA1] mb-12 text-[#FFFEA1] tracking-tight">
      DASHBOARD <span className="text-amber-100 text-2xl block font-medium mt-1 uppercase tracking-widest">Painel Administrativo</span>
    </h1>

    {/* Seção de Cadastro */}
    <div className="flex flex-col bg-white border border-gray-200 rounded-3xl p-8 shadow-xl shadow-blue-900/5 mb-10">
      <h2 className="text-xl font-bold  text-gray-800 mb-6 flex items-center gap-2">
        <span className="w-2 h-6 bg-amber-400 rounded-full"></span>
        Novo Usuário
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input 
          placeholder="Nome Completo" 
          value={nome} 
          onChange={(e) => setNome(e.target.value)} 
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all bg-gray-50 text-gray-700" 
        />
        <input 
          placeholder="E-mail" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all bg-gray-50 text-gray-700" 
        />
        <input 
          placeholder="Senha" 
          type="password" 
          value={senha} 
          onChange={(e) => setSenha(e.target.value)} 
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all bg-gray-50 text-gray-700" 
        />
      </div>

      <div className="flex justify-end">
        <Button onClick={createUser} variant="admin" className="w-full md:w-48 py-3 rounded-xl font-bold shadow-lg shadow-blue-200 transition-transform hover:scale-105">
          Cadastrar Usuário
        </Button>
      </div>
    </div>

    {/* Seção de Listagem */}
    <div className="flex flex-col bg-white border border-gray-200 rounded-3xl shadow-xl shadow-blue-900/5 overflow-hidden">
      <div className="bg-[#FFFEA1] p-6">
        <h1 className="text-2xl font-bold text-black text-center">LISTA DE USUÁRIOS ATIVOS</h1>
      </div>

      <div className="p-4">
        <ul className="w-full divide-y divide-gray-100">
          {users.map((u) => (
            <li 
              key={u.usu_id}
              className="flex flex-col md:flex-row justify-between w-full items-center p-4 hover:bg-blue-50/50 transition-colors rounded-xl group"
            >
              <div className="flex flex-col mb-3 md:mb-0">
                <span className="font-bold text-gray-800 text-lg">{u.usu_nome}</span>
                <span className="text-sm text-gray-500">{u.usu_email}</span>
              </div>

              <div className="flex gap-3 opacity-90 group-hover:opacity-100">
                <Button 
                  onClick={() => updateUser(u.usu_id)} 
                  variant="secondary" 
                  className="px-6 py-2 rounded-lg text-sm border-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
                >
                  Editar
                </Button>
                <Button 
                  onClick={() => deleteUser(u.usu_id)} 
                  variant="danger" 
                  className="px-6 py-2 rounded-lg text-sm shadow-md hover:shadow-red-200 transition-all"
                >
                  Excluir
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>

  </div>
</div>

  );  
}


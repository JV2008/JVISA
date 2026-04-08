import { Link, useLocation, useNavigate } from 'react-router';
import { Home, FileText, CreditCard, Settings, LogOut, User, Menu, X, icons, Shield } from 'lucide-react';
import { useState } from 'react';
import logoImg from '../assets/logo.png'; // Ajuste o caminho relativo se necessário
import { getUser } from '../../../utils/auth';


interface menuItems {
    path: string;
    label: string;
    icon: any;

}

const menuItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/extrato', label: 'Extrato', icon: FileText },
    { path: '/cartoes', label: 'Cartões', icon: CreditCard },
    { path: '/configuracoes', label: 'Configurações', icon: Settings },

    { path: '/admin', label: 'Painel Admin', icon: Shield }

];



export default function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();

    const user = getUser();

    const handleLogout = () => {
        navigate('/login');
    };




    return (

        <aside className="hidden lg:flex lg:flex-col w-64 bg-white border-r border-gray-200">
            <div className="p-6 border-b border-gray-200">
                <img src={logoImg} alt="logo" className='h-18 w-auto' />
            </div>

            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    <Icon size={20} />
                                    <span>{item.label}</span>
                                </Link>


                            </li>
                        );
                    })}
                </ul>

            </nav>
            <div className="p-4 border-t border-gray-200">
                <div className="flex items-center gap-3 px-4 py-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <User size={20} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                            {user?.nome}
                        </p>
                        <p className="text-xs text-gray-500">
                            {user?.email}
                        </p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition w-full"
                >
                    <LogOut size={20} />
                    <span>Sair</span>
                </button>
            </div>
        </aside>




    )
}
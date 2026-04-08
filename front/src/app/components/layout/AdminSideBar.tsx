import { Link, useLocation, useNavigate } from 'react-router';
import { Home, FileText, CreditCard, Settings, LogOut, User, Menu, X, icons, Shield } from 'lucide-react';
import logoImg from './../assets/logo - Copia.png'; // Ajuste o caminho relativo se necessário
import { RoleBased } from '../specify/ButtonAdmin';
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
    { path: '/admin', label: 'Painel Admin', icon: Shield, roles: ['ADMIN'] }

];



export default function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
    };

    const user = getUser();




    return (
        <aside className="hidden lg:flex lg:flex-col w-64 bg-black border-r border-[#FFFEA1]">
            <div className="p-6 border-b border-[#FFFEA1]">
                <img src={logoImg} alt="logo" className="h-18 w-auto" />
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
                                        ? 'bg-blue-50 text-gray-600'
                                        : 'text-[#FFFEA1] hover:bg-gray-50 hover:text-gray-950'
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
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                        <User size={20} className="text-black" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-gray-200">
                            {user?.nome}
                        </p>
                        <p className="text-xs text-gray-500">
                            {user?.email}
                        </p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg 
                    text-gray-300 hover:bg-gray-50 hover:text-gray-700 transition w-full"
                >
                    <LogOut size={20} />
                    <span>Sair</span>
                </button>
            </div>
        </aside>







    )
}
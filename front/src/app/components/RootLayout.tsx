import { Outlet, Link, useLocation, useNavigate } from 'react-router';
import { Home, FileText, CreditCard, Settings, LogOut, User, Menu, X, icons, Shield } from 'lucide-react';
import { useState } from 'react';
import logoImg from './assets/logo.png'; // Ajuste o caminho relativo se necessário
import Sidebar from './layout/Sidebar';
import AdminSideBar from './layout/AdminSideBar'
import AnalistaSideBar from './layout/AnalistaSideBar'
import { getUser } from '../../utils/auth';

export function RootLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

   const user = getUser();

  
  
  
  return (
    <div className= "size-full flex bg-gray-50">
      {/* Sidebar Desktop */}
      
      {user?.role === "ADMIN" && <AdminSideBar />}
      {user?.role === "ANALISTA" && <AnalistaSideBar />}
      {user?.role === "USUARIO" && <Sidebar />}
      
    {/* Main Content */}
        <main className="flex-1 overflow-auto pt-16 lg:pt-0">
          <Outlet />
        </main>
      </div>
      
   
  )}



'use client'

import React, { useState } from 'react';
import {
  Home,
  Users,
  ShoppingCart,
  CreditCard,
  Package,
  BarChart3,
  User,
  Clock,
  Settings,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Fuel,
  AmpersandIcon
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AcademicCapIcon } from '@heroicons/react/solid';

interface NavItem {
  name: string;
  icon: LucideIcon;
  path: string;
}

interface LayoutProps {
  children: React.ReactNode;
  currentPage?: string;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { name: 'Dashboard', icon: Home, path: '/grifo' },
    { name: 'Clientes', icon: Users, path: '/grifo-clientes' },
    { name: 'Ventas', icon: ShoppingCart, path: '/grifo-ventas' },
    { name: 'Créditos', icon: CreditCard, path: '/grifo-creditos' },
    { name: 'Inventario', icon: Package, path: '/grifo-inventario'},
    { name: 'Reportes', icon: BarChart3, path: '/grifo-reportes' },
    { name: 'Empleados', icon: User, path: '/grifo-empleados' },
    { name: 'Turnos', icon: Clock, path: '/grifo-turnos' },
    { name: 'Configuración', icon: Settings, path: '/grifo-configuracion' },
    { name: 'Super Admin', icon: User, path: '/super-admin'},
  ];

  return (
    <div className="flex h-screen bg-slate-900 text-white">
      {/* Sidebar */}
      <aside
        className={`bg-slate-800 p-4 transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        } flex flex-col justify-between`}
      >
        <div>
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mr-3">
              <Fuel size={24} />
            </div>
            {sidebarOpen && <h1 className="text-xl font-bold">Gas Station</h1>}
          </div>
          <nav>
            <ul>
              {navItems.map((item) => (
                <li key={item.name} className="mb-2">
                  <Link
                    href={item.path}
                    className={`w-full flex items-center p-2 rounded-lg hover:bg-slate-700 transition-colors
                      ${
                          pathname === item.path
                          ? 'bg-orange-500 text-white'
                          : 'text-slate-300'
                      }`}
                  >
                    <item.icon size={20} className="mr-3" />
                    {sidebarOpen && <span>{item.name}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-auto">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full p-2 rounded-lg text-slate-300 hover:bg-slate-700 flex items-center justify-center transition-colors"
          >
            {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            {sidebarOpen && <span className="ml-2">Colapsar</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Sistema de Gestión</h2>
          <div className="flex items-center">
            <div className="bg-red-500 text-white px-2 py-1 rounded-full text-sm mr-3">
              10
            </div>
            <span className="mr-3 text-slate-300">Vendedor</span>
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <User size={24} />
            </div>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
};

export default Layout;


'use client';

import React, { useState } from 'react';
import { Shield, AlertTriangle, Clock, Search, Users, CreditCard, DollarSign, UserCheck } from 'lucide-react';

interface Credit {
  name: string;
  creditLimit: string;
  creditUsed: string;
  balance: string;
  lastPayment: string;
  status: 'Activo' | 'Vencido' | 'Pendiente';
}

const GrifoCreditManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Datos de ejemplo
  const credits: Credit[] = [
    {
      name: 'Aphe.Emes',
      creditLimit: 'S/ 1,000',
      creditUsed: 'S/ 300',
      balance: 'S/ 700',
      lastPayment: '04/07/2025',
      status: 'Activo'
    },
    {
      name: 'Merc-Bzen',
      creditLimit: 'S/ 1,000',
      creditUsed: 'S/ 1,090',
      balance: 'S/ 0',
      lastPayment: '03/07/2025',
      status: 'Vencido'
    },
    {
      name: 'Rick-Pand',
      creditLimit: 'S/ 8,000',
      creditUsed: 'S/ 400',
      balance: 'S/ 7,600',
      lastPayment: '02/07/2025',
      status: 'Pendiente'
    },
    {
      name: 'Aluxu Alioxes',
      creditLimit: 'S/ 1,000',
      creditUsed: 'S/ 480',
      balance: 'S/ 520',
      lastPayment: '01/07/2025',
      status: 'Activo'
    },
    {
      name: 'Jom Cojula',
      creditLimit: 'S/ 1,000',
      creditUsed: 'S/ 1,000',
      balance: 'S/ 0',
      lastPayment: '30/06/2025',
      status: 'Vencido'
    },
    {
      name: 'Alee Santh',
      creditLimit: 'S/ 1,000',
      creditUsed: 'S/ 150',
      balance: 'S/ 850',
      lastPayment: '29/06/2025',
      status: 'Activo'
    }
  ];

  // Resúmenes estilo dashboard
  const summaryCards = [
    {
      title: 'Crédito Total Otorgado',
      value: 'S/ 13,000',
      icon: CreditCard,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Clientes con Crédito',
      value: credits.length.toString(),
      icon: Users,
      color: 'from-blue-700 to-blue-800'
    },
    {
      title: 'Créditos Vencidos',
      value: credits.filter(c => c.status === 'Vencido').length.toString(),
      icon: AlertTriangle,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  // Alertas estilo dashboard
  const alerts = [
    {
      type: 'Límite de Crédito',
      message: 'Algunos clientes han superado su límite de crédito.',
      icon: AlertTriangle,
      color: 'text-orange-400'
    },
    {
      type: 'Pagos Pendientes',
      message: 'Hay pagos próximos a vencer.',
      icon: Clock,
      color: 'text-yellow-400'
    },
    {
      type: 'Clientes en Revisión',
      message: 'Algunas cuentas requieren verificación adicional.',
      icon: Shield,
      color: 'text-blue-400'
    }
  ];

  // Colores de estado
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Activo':
        return 'bg-green-500/20 text-green-400 border-green-400';
      case 'Vencido':
        return 'bg-orange-500/20 text-orange-400 border-orange-400';
      case 'Pendiente':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-400';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-400';
    }
  };

  return (
    <div className="p-3 sm:p-4 lg:p-6 space-y-6 max-w-full">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-0">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white flex items-center gap-2">
            <CreditCard className="text-green-500" size={28} />
            Créditos
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Gestión y monitoreo de créditos a clientes
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 lg:gap-4">
          <span className="text-slate-300">Sucursal Lima</span>
          <span className="text-slate-300">Última actualización: 04/07/2025</span>
        </div>
      </div>

      {/* Tarjetas resumen - PRIMERO */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {summaryCards.map((card, idx) => (
          <div
            key={idx}
            className={`rounded-2xl p-5 flex items-center gap-4 border border-slate-700 bg-slate-800 shadow`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-tr ${card.color}`}>
              <card.icon className="text-white" size={28} />
            </div>
            <div>
              <div className="text-slate-400 text-xs font-medium">{card.title}</div>
              <div className="text-xl font-bold text-white">{card.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filtros */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Buscar cliente"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-green-500"
            />
          </div>
          <input
            type="text"
            placeholder="Crédito"
            className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-green-500"
          />
          <input
            type="text"
            placeholder="Fecha"
            className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-green-500"
          />
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Buscar
          </button>
        </div>
      </div>

      {/* Alertas horizontales debajo del buscador */}
      <div className="flex flex-col md:flex-row gap-4">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 mt-2"
          >
            <alert.icon size={20} className={alert.color} />
            <div>
              <span className={`font-semibold ${alert.color}`}>{alert.type}:</span>
              <span className="text-slate-400 ml-1">{alert.message}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Contenido principal: tabla y sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tabla de créditos */}
        <div className="lg:col-span-3">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700 sticky top-0 z-10">
                  <tr>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Cliente</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Límite</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Usado</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Saldo</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Último Pago</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {credits
                    .filter(c =>
                      c.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((credit, index) => (
                      <tr key={index} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition">
                        <td className="py-3 px-4 text-white">{credit.name}</td>
                        <td className="py-3 px-4 text-slate-300">{credit.creditLimit}</td>
                        <td className="py-3 px-4 text-slate-300">{credit.creditUsed}</td>
                        <td className="py-3 px-4 text-slate-300">{credit.balance}</td>
                        <td className="py-3 px-4 text-slate-300">{credit.lastPayment}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full border text-xs font-semibold ${getStatusColor(credit.status)}`}>
                            {credit.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Paginación visual */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-2">
              <button className="bg-green-500 text-white w-8 h-8 rounded flex items-center justify-center font-bold">1</button>
              <span className="text-slate-400">de 1</span>
            </div>
            <div className="text-slate-400 text-sm">Página 1</div>
            <button className="text-slate-400 hover:text-white">Siguiente</button>
          </div>
        </div>

        {/* Sidebar: Pago rápido + Información (NO SE MUEVE) */}
        <div className="space-y-6">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 space-y-6">
            {/* Pago rápido */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <DollarSign className="text-green-400" size={20} />
                Registrar Pago Rápido
              </h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Cliente"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-green-500"
                />
                <input
                  type="text"
                  placeholder="Monto (S/)"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-green-500"
                />
                <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                  Registrar Pago
                </button>
              </div>
            </div>
            {/* Información */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Shield className="text-blue-400" size={20} />
                Información
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Días de crédito</span>
                  <span className="text-slate-300">30</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tasa interés</span>
                  <span className="text-slate-300">2.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Turnos activos</span>
                  <span className="text-slate-300">2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Empleados</span>
                  <span className="text-slate-300">5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrifoCreditManagement;


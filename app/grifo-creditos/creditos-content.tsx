'use client';

import React, { useState } from 'react';
import { Shield, AlertTriangle, Clock } from 'lucide-react';

interface Credit {
  name: string;
  creditLimit: string;
  creditUsed: string;
  balance: string;
  lastPayment: string;
  status: 'MAEUO' | 'MAEUSA' | 'MAEUS';
}

const GrifoCreditManagement: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('Presorna');
  const [searchTerm, setSearchTerm] = useState('');

  const credits: Credit[] = [
    {
      name: 'Aphe.Emes',
      creditLimit: '$1,000',
      creditUsed: '$300',
      balance: '$000',
      lastPayment: '20/0 164024',
      status: 'MAEUO'
    },
    {
      name: 'Merc-Bzen',
      creditLimit: '$1,000',
      creditUsed: '$2,090',
      balance: '$000',
      lastPayment: '31102/20/9',
      status: 'MAEUSA'
    },
    {
      name: 'Rick-Pand',
      creditLimit: '$8,000',
      creditUsed: '$400',
      balance: '$000',
      lastPayment: '1776/2021',
      status: 'MAEUS'
    },
    {
      name: 'Aluxu Alioxes',
      creditLimit: '$1,000',
      creditUsed: '$480',
      balance: '$000',
      lastPayment: '241n19/203',
      status: 'MAEUO'
    },
    {
      name: 'Jom Cojula',
      creditLimit: '$1,000',
      creditUsed: '$2,000',
      balance: '$000',
      lastPayment: '971802/021',
      status: 'MAEUS'
    },
    {
      name: 'Alee Santh',
      creditLimit: '$1,000',
      creditUsed: '$150',
      balance: '$000',
      lastPayment: '36/027/2027',
      status: 'MAEUO'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'MAEUO':
        return 'bg-green-500';
      case 'MAEUSA':
        return 'bg-yellow-500';
      case 'MAEUS':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const summaryCards = [
    {
      title: 'Etual dos cregina Snauiernos',
      value: '$45,000',
      color: 'text-blue-400'
    },
    {
      title: 'Cnrilliss. onalados',
      value: '$8,500',
      color: 'text-red-400'
    },
    {
      title: 'Cnritos nanto.cale Spremos',
      value: '$12,000',
      color: 'text-yellow-400'
    }
  ];

  const alerts = [
    {
      type: 'Anndo de Cnalito',
      message: 'Cnriplatea Nucaoas choos cnaados',
      icon: AlertTriangle,
      color: 'text-red-400'
    },
    {
      type: 'Reoopletuono de Page',
      message: 'Aa lullnoa airatc cbtingot preaco',
      icon: Clock,
      color: 'text-yellow-400'
    },
    {
      type: 'Adivaretucor de Eamro',
      message: 'Comaltercelle ccadsaa Onfda YeNundaa',
      icon: Shield,
      color: 'text-orange-400'
    }
  ];

  return (
      <div className="p-3 sm:p-4 lg:p-6 space-y-4 lg:space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Shield size={32} className="text-orange-500" />
            <h1 className="text-3xl font-bold text-white">Gestión de Créditos</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-slate-300">Mvch</span>
            <span className="text-slate-300">Cnifima</span>
            <div className="flex items-center space-x-2">
              <span className="text-slate-400">A</span>
              <span className="text-white">Dialo</span>
              <span className="text-slate-400"></span>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {summaryCards.map((card, index) => (
            <div key={index} className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <h3 className="text-slate-400 text-sm mb-2">{card.title}</h3>
              <div className={`text-3xl font-bold ${card.color}`}>{card.value}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-slate-400 text-sm mb-1">Advanend Fittra</label>
              <input
                type="text"
                placeholder="Presorna"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Prestlo"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Pregte rarda"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                Peentio Cenoara
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Credits Table */}
          <div className="lg:col-span-3">
            <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-700">
                    <tr>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Chuma</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Meuta de soneto</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Rearie Regido</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Sealio</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Feran de Recienturos</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Eclitina</th>
                    </tr>
                  </thead>
                  <tbody>
                    {credits.map((credit, index) => (
                      <tr key={index} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                        <td className="py-3 px-4 text-white">{credit.name}</td>
                        <td className="py-3 px-4 text-slate-300">{credit.creditLimit}</td>
                        <td className="py-3 px-4 text-slate-300">{credit.creditUsed}</td>
                        <td className="py-3 px-4 text-slate-300">{credit.balance}</td>
                        <td className="py-3 px-4 text-slate-300">{credit.lastPayment}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium text-white ${getStatusColor(credit.status)}`}>
                            {credit.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-2">
                <button className="bg-orange-500 text-white w-8 h-8 rounded flex items-center justify-center">
                  1
                </button>
                <span className="text-slate-400"></span>
                <span className="text-slate-400">4</span>
              </div>
              <div className="text-slate-400 text-sm">1</div>
              <button className="text-slate-400 hover:text-white"></button>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Alerts */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
              <div className="space-y-4">
                {alerts.map((alert, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <alert.icon size={20} className={alert.color} />
                    <div>
                      <h4 className={`font-medium ${alert.color}`}>{alert.type}</h4>
                      <p className="text-slate-400 text-sm">{alert.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Payment */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4">Registran Page Repido</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Civuno"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-orange-500"
                />
                <input
                  type="text"
                  placeholder="Ratira"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-orange-500"
                />
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                  Regunuz Rage
                </button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4">Registran Page Repido</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Daintez</span>
                  <span className="text-slate-300">Predita</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">rantia</span>
                  <span className="text-slate-300">Mina</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default GrifoCreditManagement;


'use client';

import React from 'react';
import StatCard from '../../src/components/StatCard';
import FuelButton from '../../src/components/FuelButton';
import TransactionTable from '../../src/components/TransactionTable';
import QuickSearch from '../../src/components/QuickSearch';
import { DollarSign, Users, TrendingUp, Clock } from 'lucide-react';

const GrifoDashboard: React.FC = () => {
  const transactions = [
    { date: '11/6 PIA', pump: 'Bomba 6', fuel: 'Regular', amount: '$55.00' },
    { date: '1/33 PIA', pump: 'Bomba 1', fuel: 'Blenal', amount: '$133.86' },
    { date: '12/34 PV', pump: 'Bomba 3', fuel: 'Premium', amount: '$23.10' },
  ];

  const readings = [
    { type: 'Lecturas', value: '1', social: '1,435', prenglam: '$2,040', pegolaa: '$2.4/0' },
    { type: 'S', value: '5', social: '1,370', prenglam: '12,418', pegolaa: '72,678' },
  ];

  return (
      <div className="space-y-6">
        {/* Header with user info */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Gas Estacion </h1>
          <div className="flex items-center space-x-4">
            <span className="text-slate-300">Vendedor</span>
            <span className="text-slate-400">/14.FE.LT 23:21 4/78</span>
          </div>
        </div>

        {/* Fuel Selection Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FuelButton type="Diesel" />
          <FuelButton type="Premium" selected />
          <FuelButton type="Regular" />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Resumen"
            value="$1,530.25"
            subtitle="Groc Llamni ILobinn"
            icon={DollarSign}
            valueColor="text-green-400"
          />
          <StatCard
            title="Bistada de Bemibra"
            value="$1,962.75"
            subtitle="Cinc Crbla"
            icon={TrendingUp}
            valueColor="text-green-400"
          />
          <StatCard
            title="Tumo"
            value="$1,530.25"
            subtitle="Lom cabra"
            icon={Clock}
            valueColor="text-green-400"
          />
          <StatCard
            title="Tumo"
            value="$1,562.25"
            subtitle="Tlolafla Ecclos de Cue"
            icon={Users}
            valueColor="text-orange-400"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Transaction History */}
          <div className="lg:col-span-2">
            <TransactionTable
              title="Historial de Transacciones"
              transactions={transactions}
            />
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Inventory Status */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4">Bistada de Bemibra</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-green-400">● Benina 1</span>
                  <span className="text-green-400">$30420</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-green-400">● Benina 2</span>
                  <span className="text-green-400">$1842</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-green-400">● Benina 6</span>
                  <span className="text-green-400">$1276</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-green-400">● Benina 4</span>
                  <span className="text-green-400">$12301</span>
                </div>
              </div>
            </div>

            {/* Quick Search */}
            <QuickSearch placeholder="Emmina la tra" />

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                Regimno
              </button>
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                volumida
              </button>
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                $390%
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Readings Table */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Lecturas</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-2 text-slate-400">Lecturas</th>
                    <th className="text-left py-2 text-slate-400">Social</th>
                    <th className="text-left py-2 text-slate-400">Prenglam</th>
                    <th className="text-left py-2 text-slate-400">Pegolaa</th>
                  </tr>
                </thead>
                <tbody>
                  {readings.map((reading, index) => (
                    <tr key={index} className="border-b border-slate-700/50">
                      <td className="py-2 text-slate-300">{reading.value}</td>
                      <td className="py-2 text-slate-300">{reading.social}</td>
                      <td className="py-2 text-slate-300">{reading.prenglam}</td>
                      <td className="py-2 text-slate-300">{reading.pegolaa}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Status Info */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Estado</h3>
            <div className="space-y-3">
              <div className="text-slate-300">
                <span className="text-slate-400">Pregione U'Lnio:</span> Abierta
              </div>
              <div className="text-slate-300">
                <span className="text-slate-400">Lebinni:</span> $1,562.25
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default GrifoDashboard;


'use client';

import React from 'react';
import Layout from '../../src/components/Layout';

type TipoMovimiento = 'Venta' | 'Compra' | 'Gasto';

const datosDeReporte = [
  { fecha: '2025-06-24', tipo: 'Venta', producto: 'Gasohol 95', cantidad: '50 gal', monto: '750.00' },
  { fecha: '2025-06-24', tipo: 'Compra', producto: 'Diesel B5', cantidad: '200 gal', monto: '2800.00' },
  { fecha: '2025-06-23', tipo: 'Gasto', producto: 'Mantenimiento Bomba 2', cantidad: '-', monto: '150.00' },
  { fecha: '2025-06-22', tipo: 'Venta', producto: 'Gasohol 98 Premium', cantidad: '30 gal', monto: '540.00' },
];

const getTipoEstilos = (tipo: TipoMovimiento) => {
  switch (tipo) {
    case 'Venta':
      return { badge: 'bg-green-900 text-green-300', monto: 'text-green-400', signo: '+' };
    case 'Compra':
      return { badge: 'bg-blue-900 text-blue-300', monto: 'text-red-400', signo: '-' };
    case 'Gasto':
      return { badge: 'bg-red-900 text-red-300', monto: 'text-red-400', signo: '-' };
    default:
      return { badge: 'bg-gray-700 text-gray-300', monto: 'text-gray-400', signo: '' };
  }
};

export default function GrifoReportes() {
  return (
    <Layout currentPage="reportes"> 
      <main className="p-4 md:p-8 w-full">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Reportes Generales</h1>
          <button className="flex items-center bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z..." />
            </svg>
            Exportar a Excel
          </button>
        </header>

        {/* Filtros */}
        <section className="bg-[#1F2937] p-4 rounded-lg mb-6 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-sm text-[#6B7280] mb-1">Fecha Inicio</label>
              <input type="date" className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded-md p-2" />
            </div>
            <div>
              <label className="block text-sm text-[#6B7280] mb-1">Fecha Fin</label>
              <input type="date" className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded-md p-2" />
            </div>
            <div>
              <label className="block text-sm text-[#6B7280] mb-1">Tipo de Operación</label>
              <select className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded-md p-2">
                <option>Todos</option>
                <option>Venta</option>
                <option>Compra</option>
                <option>Gasto</option>
              </select>
            </div>
            <button className="bg-[#F97316] hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg w-full">
              Generar Reporte
            </button>
          </div>
        </section>

        {/* KPIs */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Ingresos */}
          <div className="bg-[#1F2937] p-6 rounded-lg shadow-lg text-white flex justify-between items-center">
            <div>
              <p className="text-sm text-[#6B7280] uppercase">Ingresos Totales</p>
              <p className="text-3xl font-bold">S/ 1,290.00</p>
            </div>
            <div className="bg-green-500/20 p-3 rounded-full">
              <svg className="h-8 w-8 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="..." /></svg>
            </div>
          </div>

          {/* Egresos */}
          <div className="bg-[#1F2937] p-6 rounded-lg shadow-lg text-white flex justify-between items-center">
            <div>
              <p className="text-sm text-[#6B7280] uppercase">Egresos Totales</p>
              <p className="text-3xl font-bold">S/ 2,950.00</p>
            </div>
            <div className="bg-red-500/20 p-3 rounded-full">
              <svg className="h-8 w-8 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="..." /></svg>
            </div>
          </div>

          {/* Balance */}
          <div className="bg-[#1F2937] p-6 rounded-lg shadow-lg text-white flex justify-between items-center">
            <div>
              <p className="text-sm text-[#6B7280] uppercase">Balance</p>
              <p className="text-3xl font-bold text-red-400">-S/ 1,660.00</p>
            </div>
            <div className="bg-[#F97316]/20 p-3 rounded-full">
              <svg className="h-8 w-8 text-[#F97316]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="..." /></svg>
            </div>
          </div>
        </section>

        {/* Tabla */}
        <section className="bg-[#111827] rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-gray-300">
              <thead className="bg-[#1F2937]">
                <tr>
                  <th className="p-4 text-sm text-[#6B7280]">Fecha</th>
                  <th className="p-4 text-sm text-[#6B7280]">Tipo</th>
                  <th className="p-4 text-sm text-[#6B7280]">Producto</th>
                  <th className="p-4 text-sm text-[#6B7280] text-right">Cantidad</th>
                  <th className="p-4 text-sm text-[#6B7280] text-right">Monto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {datosDeReporte.map((item, i) => {
                  const estilos = getTipoEstilos(item.tipo as TipoMovimiento);
                  const montoFormateado = parseFloat(item.monto).toFixed(2);
                  return (
                    <tr key={i} className="hover:bg-[#1F2937] transition">
                      <td className="p-4">{item.fecha}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 text-xs rounded-full ${estilos.badge}`}>{item.tipo}</span>
                      </td>
                      <td className="p-4">{item.producto}</td>
                      <td className="p-4 text-right">{item.cantidad}</td>
                      <td className={`p-4 text-right font-semibold ${estilos.monto}`}>
                        {estilos.signo} S/ {montoFormateado}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          <div className="p-4 bg-[#1F2937] flex justify-between items-center">
            <span className="text-sm text-[#6B7280]">Mostrando 1 a 4 de 4 resultados</span>
            <div className="flex space-x-1">
              <button disabled className="px-3 py-1 border border-gray-600 rounded-md text-sm text-gray-500">Anterior</button>
              <button className="px-3 py-1 border border-[#F97316] bg-[#F97316] rounded-md text-sm text-white">1</button>
              <button disabled className="px-3 py-1 border border-gray-600 rounded-md text-sm text-gray-500">Siguiente</button>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}



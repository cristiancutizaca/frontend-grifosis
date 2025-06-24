'use client';
import React, { useState, useRef, useEffect } from 'react';
import Layout from '../../src/components/Layout';

// Simulación de stock y movimientos
const tanks = [
  { name: 'Diesel', fill: 0.7, color: 'bg-green-400', stock: 1200, capacity: 2000 },
  { name: 'Regular', fill: 0.4, color: 'bg-yellow-300', stock: 800, capacity: 2000 },
  { name: 'Premium', fill: 0.2, color: 'bg-pink-300', stock: 300, capacity: 2000 },
];

// Simulación de historial de ingresos
const ingresos = [
  { tanque: 'Diesel', cantidad: 500, fecha: '2025-06-23 10:00' },
  { tanque: 'Regular', cantidad: 300, fecha: '2025-06-22 16:30' },
  { tanque: 'Premium', cantidad: 200, fecha: '2025-06-21 09:15' },
];

const GrifoInventario: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>(''); // Monto digitado
  const containerRef = useRef<HTMLDivElement>(null);

  // Maneja el click fuera de los tanques
  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current) {
      setSelected(null);
      setInputValue('');
    }
  };

  // Maneja la entrada por teclado
  useEffect(() => {
    if (!selected) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Backspace') {
        setInputValue((prev) => prev.slice(0, -1));
      } else if (/^[0-9.]$/.test(e.key)) {
        setInputValue((prev) => {
          // Solo un punto decimal permitido
          if (e.key === '.' && prev.includes('.')) return prev;
          // No permitir punto como primer caracter
          if (e.key === '.' && prev.length === 0) return prev;
          return prev + e.key;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selected]);

  return (
    <Layout currentPage="inventario">
      <div
        ref={containerRef}
        className="flex flex-col items-center min-h-[70vh] w-full mt-32" // <--- margen superior grande aquí
        onClick={handleContainerClick}
      >
        {/* Surtidores */}
        <div className="flex justify-center items-center gap-32 relative w-full">
          {tanks.map((tank) => {
            const isSelected = selected === tank.name;
            const porcentaje = tank.stock / tank.capacity;
            const alerta = porcentaje < 0.1;
            return (
              <React.Fragment key={tank.name}>
                <div
                  className={`flex flex-col items-center transition-all duration-300 cursor-pointer ${
                    isSelected ? 'scale-110 z-10' : 'opacity-80 hover:scale-105'
                  }`}
                  onClick={e => {
                    e.stopPropagation();
                    setSelected(tank.name);
                  }}
                  style={{ position: 'relative' }}
                >
                  {/* Surtidor grande */}
                  <div
                    className={`relative ${
                      isSelected ? 'w-64 h-[480px]' : 'w-56 h-[420px]'
                    } flex flex-col items-center justify-end transition-all duration-300`}
                  >
                    {/* Cuerpo principal */}
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 top-0 ${
                        isSelected ? 'w-48 h-96' : 'w-40 h-80'
                      } bg-white border-8 ${alerta ? 'border-red-600' : 'border-black'} rounded-sm overflow-hidden transition-all duration-300`}
                    >
                      {/* Relleno */}
                      <div
                        className={`${tank.color} absolute bottom-0 left-0 w-full`}
                        style={{
                          height: `${tank.fill * 100}%`,
                          transition: 'height 0.5s',
                          opacity: 0.7,
                        }}
                      />
                      {/* Stock actual dentro del dispensador, ancho completo */}
                      <span
                        className={`w-full block text-center text-base px-3 py-1 rounded bg-white bg-opacity-80 shadow font-bold ${alerta ? 'text-red-600' : 'text-slate-700'}`}
                        style={{ position: 'absolute', bottom: 8, left: 0, zIndex: 2 }}
                      >
                        Stock: {tank.stock} gal
                      </span>
                    </div>
                    {/* Pantalla */}
                    <div
                      className={`absolute top-8 left-1/2 -translate-x-1/2 ${
                        isSelected ? 'w-32 h-20' : 'w-24 h-16'
                      } bg-white border-8 ${alerta ? 'border-red-600' : 'border-black'} transition-all duration-300`}
                    />
                    {/* Base */}
                    <div
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 ${
                        isSelected ? 'w-56 h-10' : 'w-48 h-8'
                      } bg-white border-8 ${alerta ? 'border-red-600' : 'border-black'} rounded transition-all duration-300`}
                    />
                  </div>
                  <span
                    className={`mt-6 ${
                      isSelected ? 'text-3xl' : 'text-2xl'
                    } font-bold text-slate-800 transition-all duration-300`}
                  >
                    {tank.name}
                  </span>
                  {/* Pantalla de surtidor al costado */}
                  {isSelected && (
                    <div className="absolute left-full ml-12 flex flex-col items-center bg-white border-4 border-black rounded-lg shadow-lg p-8 top-1/2 -translate-y-1/2 transition-all duration-300"
                      style={{ minWidth: 220, minHeight: 180 }}>
                      <div className="text-2xl font-bold text-black mb-4">{tank.name}</div>
                      <div className="bg-black text-lime-400 font-mono text-3xl px-6 py-2 rounded mb-2 tracking-widest">
                        {inputValue || '0.00'} gal
                      </div>
                    </div>
                  )}
                </div>
              </React.Fragment>
            );
          })}
        </div>
        {/* Historial de ingresos */}
        <div className="w-11/12 mt-10 mx-auto">
          <h2 className="text-xl font-bold mb-4 text-black">Historial de ingresos</h2>
          <table className="w-full border border-gray-300 rounded bg-white bg-opacity-90 text-black">
            <thead>
              <tr style={{ background: '#232d3d' }}>
                <th className="py-2 px-4 border-b text-white">Tanque</th>
                <th className="py-2 px-4 border-b text-white">Cantidad (gal)</th>
                <th className="py-2 px-4 border-b text-white">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {ingresos.map((ing, idx) => (
                <tr key={idx} className="text-center">
                  <td className="py-2 px-4 border-b">{ing.tanque}</td>
                  <td className="py-2 px-4 border-b">{ing.cantidad}</td>
                  <td className="py-2 px-4 border-b">{ing.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default GrifoInventario;
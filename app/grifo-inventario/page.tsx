'use client'

import React, { useEffect,  useState } from 'react'
import moment from 'moment'
import 'moment/locale/es'
import Layout from '../../src/components/Layout'
moment.locale('es')

const GrifoReportes: React.FC = () => {
    // Variables públicas (usadas en la vista)
    const [currentTime, setCurrentTime] = useState<string | null>(null)
    const [currentMonth] = useState(moment());
    const startOfMonth = currentMonth.clone().startOf('month');
    const daysInMonth = currentMonth.daysInMonth();
    const startDay = startOfMonth.day();

    const combustibles = [
      { nombre: 'REGULAR', color: 'bg-red-500', cantidad: 100000 },
      { nombre: 'PREMIUN', color: 'bg-green-500', cantidad: 50000 },
      { nombre: 'DIESEL', color: 'bg-fuchsia-500', cantidad: 200000 },
    ];

    // Galones actuales (esto podría venir de una lógica más adelante)
    const galonesActuales = 10000;
    // Botones de galones disponibles
    const botonesGalones = [10, 20, 50, 100, 200, 300, 600, 900, '1k', '2k', '10k', '15k'];

    const historialLlenado = [
      { cantidad: '50.000 GALONES', fecha: '24/06/2025', hora: '10:30 AM' },
      { cantidad: '150.000 GALONES', fecha: '01/08/2025', hora: '12:05 PM' },
      { cantidad: '300.000 GALONES', fecha: '12/12/2025', hora: '15:26 PM' },
    ];

    useEffect(() => {
      const updateTime = () => setCurrentTime(moment().format('hh:mm:ss A'))
      updateTime()
      const interval = setInterval(updateTime, 1000)
      return () => clearInterval(interval)
    }, [])

    return (
        <Layout currentPage="reportes">
            <div className="p-6 bg-white min-h-screen">
                <div className="grid grid-cols-12 gap-4 mb-6">
                    <div className="col-span-4 flex flex-col h-full space-y-4">
                        {/* Hora */}
                        <div className="flex-1 bg-slate-800 p-4 rounded-lg flex flex-col justify-center items-center">
                        <h2 className="text-white text-xl font-bold">HORA</h2>
                        <p className="text-white text-4xl font-bold mt-2">{ currentTime ?? 'Cargando...' }</p>
                        </div>
                        {/* Inventario */}
                        <div className="flex-1 bg-slate-800 p-4 rounded-lg flex flex-col justify-center items-center">
                        <h2 className="text-white text-xl font-bold">INVENTARIO</h2>
                        </div>
                    </div>

                    {/* Calendario */}
                    <div className="col-span-8 bg-slate-800 p-4 rounded-lg">
                        <h2 className="text-green-400 text-center text-xl font-bold mb-4 ">
                          { currentMonth.format('MMMM').toUpperCase() }
                        </h2>
                        <div className="grid grid-cols-7 gap-1 text-center text-white text-sm">
                          {['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'].map(day => (
                            <div key={ day } className="font-bold text-green-400">{ day }</div>
                          ))}

                          {Array(startDay).fill(null).map((_, i) => (
                            <div key={`empty-${i}`}></div>
                          ))}

                          {/* Días del mes actual */}
                          {[...Array(daysInMonth)].map((_, i) => {
                            const day = i + 1;
                            const isToday = moment().date() === day && moment().month() === currentMonth.month();
                            return (
                              <div key={day} className={`p-1 rounded-full text-yellow-400 ${isToday ? 'bg-green-700' : ''}`} >
                                {day}
                              </div>
                            );
                          })}
                        </div>
                    </div>
                </div>

                {/* Sección Central: Combustible y Entrada de Galones */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
                    {/* Combustible */}
                    <div className="md:col-span-8 bg-slate-800 p-4 rounded-lg">
                        <h2 className="text-white text-center text-xl font-bold mb-4">COMBUSTIBLE</h2>
                        <div className="space-y-4">
                          {combustibles.map((comb, i) => {
                            const porcentaje = Math.max((comb.cantidad / 200000) * 100, 5);
                            return (
                              <div key={i}>
                                <p className="text-white text-lg mb-1">{comb.nombre}</p>
                                <div className="bg-gray-700 rounded-full h-12 flex items-center p-1">
                                  <div
                                    className={`${comb.color} h-10 rounded-full flex items-center justify-center`}
                                    style={{ width: `${porcentaje}%` }}
                                  >
                                    <span className="text-white font-bold">
                                      {comb.cantidad.toLocaleString()}K
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                    </div>

                    {/* Entrada de Galones */}
                    <div className="md:col-span-4 bg-slate-800 p-4 rounded-lg flex flex-col">
                      <div className="bg-gray-700 p-4 rounded-lg text-white text-center text-4xl font-bold mb-4 flex justify-center items-center">
                        {galonesActuales.toLocaleString()} <span className="text-lg ml-2">GAL</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center flex-grow">
                        {botonesGalones.map((amount, i) => (
                          <button
                            key={i}
                            className="bg-gray-700 text-white p-3 rounded-lg text-lg font-bold hover:bg-gray-600"
                          >
                            {amount} <span className="text-sm">GAL</span>
                          </button>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-4">
                        <button className="bg-red-600 text-white p-3 rounded-lg text-xl font-bold flex-grow hover:bg-red-700">
                          LLENAR
                        </button>
                        <button className="bg-green-600 text-white p-3 rounded-lg text-xl font-bold flex-grow hover:bg-green-700">
                          MANUAL
                        </button>
                      </div>
                    </div>
                </div>

                {/* Sección Inferior: Tabla de Cantidades */}
                <div className="bg-slate-800 p-4 rounded-lg">
                  <div className="grid grid-cols-3 gap-4 text-white font-bold text-lg mb-2 border-b border-gray-700 pb-2">
                    <div>CANTIDAD (GAL)</div>
                    <div>FECHA</div>
                    <div>HORA</div>
                  </div>
                  <div className="space-y-2 text-white text-base">
                    {historialLlenado.length > 0 ? (
                      historialLlenado.map((registro, index) => (
                        <div key={index} className="grid grid-cols-3 gap-4">
                          <div>{registro.cantidad}</div>
                          <div>{registro.fecha}</div>
                          <div>{registro.hora}</div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center col-span-3 text-gray-400">No hay registros aún.</div>
                    )}
                  </div>
                </div>
            </div>
        </Layout>
    )
}

export default GrifoReportes

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
        <Layout currentPage="inventario">
            <div className="p-3 sm:p-4 lg:p-6 bg-white min-h-screen">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 mb-4 lg:mb-6">
                    <div className="lg:col-span-4 flex flex-col lg:h-full space-y-3 lg:space-y-4">
                        {/* Hora */}
                        <div className="flex-1 bg-slate-800 p-3 lg:p-4 rounded-lg flex flex-col justify-center items-center">
                        <h2 className="text-white text-lg lg:text-xl font-bold">HORA</h2>
                        <p className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mt-2">{ currentTime ?? 'Cargando...' }</p>
                        </div>
                        {/* Inventario */}
                        <div className="flex-1 bg-slate-800 p-3 lg:p-4 rounded-lg flex flex-col justify-center items-center">
                        <h2 className="text-white text-lg lg:text-xl font-bold">INVENTARIO</h2>
                        </div>
                    </div>

                    {/* Calendario */}
                    <div className="lg:col-span-8 bg-slate-800 p-3 lg:p-4 rounded-lg">
                        <h2 className="text-green-400 text-center text-lg lg:text-xl font-bold mb-3 lg:mb-4">
                          { currentMonth.format('MMMM').toUpperCase() }
                        </h2>
                        <div className="grid grid-cols-7 gap-1 text-center text-white text-xs sm:text-sm">
                          {['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'].map(day => (
                            <div key={ day } className="font-bold text-green-400 p-1">{ day }</div>
                          ))}

                          {Array(startDay).fill(null).map((_, i) => (
                            <div key={`empty-${i}`}></div>
                          ))}

                          {/* Días del mes actual */}
                          {[...Array(daysInMonth)].map((_, i) => {
                            const day = i + 1;
                            const isToday = moment().date() === day && moment().month() === currentMonth.month();
                            return (
                              <div key={day} className={`p-1 lg:p-2 rounded-full text-yellow-400 ${isToday ? 'bg-green-700' : ''}`} >
                                {day}
                              </div>
                            );
                          })}
                        </div>
                    </div>
                </div>

                {/* Sección Central: Combustible y Entrada de Galones */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 lg:gap-4 mb-4 lg:mb-6">
                    {/* Combustible */}
                    <div className="xl:col-span-8 bg-slate-800 p-3 lg:p-4 rounded-lg">
                        <h2 className="text-white text-center text-lg lg:text-xl font-bold mb-3 lg:mb-4">COMBUSTIBLE</h2>
                        <div className="space-y-3 lg:space-y-4">
                          {combustibles.map((comb, i) => {
                            const porcentaje = Math.max((comb.cantidad / 200000) * 100, 5);
                            return (
                              <div key={i}>
                                <p className="text-white text-base lg:text-lg mb-1 lg:mb-2">{comb.nombre}</p>
                                <div className="bg-gray-700 rounded-full h-10 lg:h-12 flex items-center p-1">
                                  <div
                                    className={`${comb.color} h-8 lg:h-10 rounded-full flex items-center justify-center`}
                                    style={{ width: `${porcentaje}%` }}
                                  >
                                    <span className="text-white font-bold text-sm lg:text-base">
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
                    <div className="xl:col-span-4 bg-slate-800 p-3 lg:p-4 rounded-lg flex flex-col">
                      <div className="bg-gray-700 p-3 lg:p-4 rounded-lg text-white text-center text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 lg:mb-4 flex justify-center items-center">
                        {galonesActuales.toLocaleString()} <span className="text-sm lg:text-lg ml-2">GAL</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 lg:gap-2 text-center flex-grow">
                        {botonesGalones.map((amount, i) => (
                          <button
                            key={i}
                            className="bg-gray-700 text-white p-2 lg:p-3 rounded-lg text-sm lg:text-lg font-bold hover:bg-gray-600 transition-colors duration-200"
                          >
                            {amount} <span className="text-xs lg:text-sm">GAL</span>
                          </button>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-3 lg:mt-4">
                        <button className="bg-red-600 text-white p-2 lg:p-3 rounded-lg text-lg lg:text-xl font-bold flex-grow hover:bg-red-700 transition-colors duration-200">
                          LLENAR
                        </button>
                        <button className="bg-green-600 text-white p-2 lg:p-3 rounded-lg text-lg lg:text-xl font-bold flex-grow hover:bg-green-700 transition-colors duration-200">
                          MANUAL
                        </button>
                      </div>
                    </div>
                </div>

                {/* Sección Inferior: Tabla de Cantidades */}
                <div className="bg-slate-800 p-3 lg:p-4 rounded-lg">
                  <div className="hidden sm:grid grid-cols-3 gap-2 lg:gap-4 text-white font-bold text-base lg:text-lg mb-2 border-b border-gray-700 pb-2">
                    <div>CANTIDAD (GAL)</div>
                    <div>FECHA</div>
                    <div>HORA</div>
                  </div>
                  
                  {/* Vista móvil - tarjetas */}
                  <div className="sm:hidden space-y-3">
                    {historialLlenado.length > 0 ? (
                      historialLlenado.map((registro, index) => (
                        <div key={index} className="bg-gray-700 p-3 rounded-lg">
                          <div className="text-white font-bold text-lg mb-1">{registro.cantidad}</div>
                          <div className="flex justify-between text-gray-300 text-sm">
                            <span>{registro.fecha}</span>
                            <span>{registro.hora}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-gray-400 py-4">No hay registros aún.</div>
                    )}
                  </div>
                  
                  {/* Vista tablet/desktop - tabla */}
                  <div className="hidden sm:block space-y-2 text-white text-sm lg:text-base">
                    {historialLlenado.length > 0 ? (
                      historialLlenado.map((registro, index) => (
                        <div key={index} className="grid grid-cols-3 gap-2 lg:gap-4 py-2 hover:bg-gray-700 rounded transition-colors duration-200">
                          <div className="font-medium">{registro.cantidad}</div>
                          <div className="text-gray-300">{registro.fecha}</div>
                          <div className="text-gray-300">{registro.hora}</div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center col-span-3 text-gray-400 py-4">No hay registros aún.</div>
                    )}
                  </div>
                </div>
            </div>
        </Layout>
    )
}

export default GrifoReportes

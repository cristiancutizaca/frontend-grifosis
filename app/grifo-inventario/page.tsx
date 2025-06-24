'use client'

import React from 'react'
import Layout from '../../src/components/Layout'

const GrifoReportes: React.FC = () => {
    return (
        <Layout currentPage="reportes">
            <div className="p-6 bg-white min-h-screen"> {/* Fondo principal oscuro */}
                {/* Sección Superior: Hora, Inventario, Calendario */}
                <div className="grid grid-cols-12 gap-4 mb-6">
                    {/* Hora + Inventario */}
                    <div className="col-span-4 flex flex-col h-full space-y-4">
                        {/* Hora */}
                        <div className="flex-1 bg-blue-900 p-4 rounded-lg flex flex-col justify-center items-center">
                        <h2 className="text-white text-xl font-bold">HORA</h2>
                        <p className="text-white text-4xl font-bold mt-2">10:30 A.M.</p>
                        </div>
                        {/* Inventario */}
                        <div className="flex-1 bg-blue-900 p-4 rounded-lg flex flex-col justify-center items-center">
                        <h2 className="text-white text-xl font-bold">INVENTARIO</h2>
                        </div>
                    </div>

                    {/* Calendario */}
                    <div className="col-span-8 bg-blue-900 p-4 rounded-lg">
                        <h2 className="text-white text-center text-xl font-bold mb-4">JUNIO</h2>
                        <div className="grid grid-cols-7 gap-1 text-center text-white text-sm">
                        {['DOM', 'LUM', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'].map(day => (
                            <div key={day} className="font-bold">{day}</div>
                        ))}
                        {Array(6).fill(null).map((_, i) => <div key={`empty-${i}`}></div>)}
                        {[...Array(30).keys()].map(day => (
                            <div key={day + 1} className={`p-1 rounded-full ${day + 1 === 30 ? 'bg-blue-600' : ''}`}>
                            {day + 1}
                            </div>
                        ))}
                        {['01', '02', '03', '04', '05'].map(day => (
                            <div key={`next-month-${day}`} className="text-slate-500 p-1">{day}</div>
                        ))}
                        </div>
                    </div>
                </div>

                {/* Sección Central: Combustible y Entrada de Galones */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
                    {/* Combustible */}
                    <div className="md:col-span-8 bg-blue-900 p-4 rounded-lg">
                        <h2 className="text-white text-center text-xl font-bold mb-4">COMBUSTIBLE</h2>
                        <div className="space-y-4">
                            {/* Regular */}
                            <div>
                                <p className="text-white text-lg mb-1">REGULAR</p>
                                <div className="bg-gray-700 rounded-full h-12 flex items-center p-1">
                                    <div className="bg-red-500 h-10 rounded-full w-3/4 flex items-center justify-center">
                                        <span className="text-white font-bold">100K</span>
                                    </div>
                                </div>
                            </div>
                            {/* Premiun */}
                            <div>
                                <p className="text-white text-lg mb-1">PREMIUN</p>
                                <div className="bg-gray-700 rounded-full h-12 flex items-center p-1">
                                    <div className="bg-green-500 h-10 rounded-full w-1/2 flex items-center justify-center">
                                        <span className="text-white font-bold">50K</span>
                                    </div>
                                </div>
                            </div>
                            {/* Diesel */}
                            <div>
                                <p className="text-white text-lg mb-1">DIESEL</p>
                                <div className="bg-gray-700 rounded-full h-12 flex items-center p-1">
                                    <div className="bg-fuchsia-500 h-10 rounded-full w-full flex items-center justify-center">
                                        <span className="text-white font-bold">200K</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Entrada de Galones */}
                    <div className="md:col-span-4 bg-blue-900 p-4 rounded-lg flex flex-col">
                        <div className="bg-gray-700 p-4 rounded-lg text-white text-center text-4xl font-bold mb-4 flex justify-center items-center">
                            10.000 <span className="text-lg ml-2">GAL</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-center flex-grow">
                            {[10, 20, 50, 100, 200, 300, 600, 900, '1k', '2k', '10k', '15k'].map(amount => (
                                <button key={amount} className="bg-gray-700 text-white p-3 rounded-lg text-lg font-bold hover:bg-gray-600">
                                    {amount} <span className="text-sm">GAL</span>
                                </button>
                            ))}
                        </div>
                        <div className="flex gap-2 mt-4">
                            <button className="bg-red-600 text-white p-3 rounded-lg text-xl font-bold flex-grow hover:bg-red-700">LLENAR</button>
                            <button className="bg-green-600 text-white p-3 rounded-lg text-xl font-bold flex-grow hover:bg-green-700">MANUAL</button>
                        </div>
                    </div>
                </div>

                {/* Sección Inferior: Tabla de Cantidades */}
                <div className="bg-blue-900 p-4 rounded-lg">
                    <div className="grid grid-cols-3 gap-4 text-white font-bold text-lg mb-2 border-b border-gray-700 pb-2">
                        <div>CANTIDAD (GAL)</div>
                        <div>FECHA</div>
                        <div>HORA</div>
                    </div>
                    <div className="space-y-2 text-white text-base">
                        <div className="grid grid-cols-3 gap-4">
                            <div>50.000 GALONES</div>
                            <div>24/06/2025</div>
                            <div>10:30 AM</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div>150.000 GALONES</div>
                            <div>01/08/2025</div>
                            <div>12:05 PM</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div>300.000 GALONES</div>
                            <div>12/12/2025</div>
                            <div>15:26 PM</div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default GrifoReportes

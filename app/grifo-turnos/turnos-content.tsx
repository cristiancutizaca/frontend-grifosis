'use client'

import React, { useState } from 'react'

type TurnoType = 'manana' | 'tarde' | 'noche'

interface TurnoData {
    ventas: {
        regular: { galones: number; precio: number; nivel: string }
        premium: { galones: number; precio: number; nivel: string }
        diesel: { galones: number; precio: number; nivel: string }
    }
    total: {
        totalGalones: number
        ganancia: number
    }
    creditos: {
        regular: { galones: number; porcentaje: string }
        premium: { galones: number; porcentaje: string }
        diesel: { galones: number; porcentaje: string }
    }
    transacciones: Array<{
        cantidad: string
        fecha: string
        hora: string
    }>
}

const GrifoTurnos: React.FC = () => {
    const [selectedTurno, setSelectedTurno] = useState<TurnoType>('manana')

    // Datos específicos para cada turno
    const turnoData: Record<TurnoType, TurnoData> = {
        manana: {
            ventas: {
                regular: { galones: 50, precio: 800.00, nivel: 'h-full' },
                premium: { galones: 10, precio: 200.00, nivel: 'h-20' },
                diesel: { galones: 30, precio: 500.00, nivel: 'h-40' }
            },
            total: {
                totalGalones: 90,
                ganancia: 1500.00
            },
            creditos: {
                regular: { galones: 30, porcentaje: 'w-2/5' },
                premium: { galones: 20, porcentaje: 'w-1/4' },
                diesel: { galones: 60, porcentaje: 'w-4/5' }
            },
            transacciones: [
                { cantidad: '5 GALONES', fecha: '25/06/2025', hora: '08:15 AM' },
                { cantidad: '10 GALONES', fecha: '25/06/2025', hora: '09:30 AM' },
                { cantidad: '8 GALONES', fecha: '25/06/2025', hora: '10:45 AM' },
                { cantidad: '12 GALONES', fecha: '25/06/2025', hora: '11:20 AM' },
                { cantidad: '6 GALONES', fecha: '25/06/2025', hora: '11:55 AM' }
            ]
        },
        tarde: {
            ventas: {
                regular: { galones: 75, precio: 1200.00, nivel: 'h-full' },
                premium: { galones: 25, precio: 500.00, nivel: 'h-32' },
                diesel: { galones: 45, precio: 750.00, nivel: 'h-48' }
            },
            total: {
                totalGalones: 145,
                ganancia: 2450.00
            },
            creditos: {
                regular: { galones: 45, porcentaje: 'w-3/5' },
                premium: { galones: 35, porcentaje: 'w-2/5' },
                diesel: { galones: 80, porcentaje: 'w-full' }
            },
            transacciones: [
                { cantidad: '15 GALONES', fecha: '25/06/2025', hora: '14:20 PM' },
                { cantidad: '20 GALONES', fecha: '25/06/2025', hora: '15:45 PM' },
                { cantidad: '12 GALONES', fecha: '25/06/2025', hora: '16:30 PM' },
                { cantidad: '18 GALONES', fecha: '25/06/2025', hora: '17:15 PM' },
                { cantidad: '9 GALONES', fecha: '25/06/2025', hora: '18:00 PM' }
            ]
        },
        noche: {
            ventas: {
                regular: { galones: 35, precio: 560.00, nivel: 'h-4/5' },
                premium: { galones: 8, precio: 160.00, nivel: 'h-16' },
                diesel: { galones: 22, precio: 370.00, nivel: 'h-32' }
            },
            total: {
                totalGalones: 65,
                ganancia: 1090.00
            },
            creditos: {
                regular: { galones: 25, porcentaje: 'w-1/3' },
                premium: { galones: 15, porcentaje: 'w-1/5' },
                diesel: { galones: 40, porcentaje: 'w-3/5' }
            },
            transacciones: [
                { cantidad: '8 GALONES', fecha: '25/06/2025', hora: '20:30 PM' },
                { cantidad: '12 GALONES', fecha: '25/06/2025', hora: '21:45 PM' },
                { cantidad: '6 GALONES', fecha: '25/06/2025', hora: '22:20 PM' },
                { cantidad: '10 GALONES', fecha: '25/06/2025', hora: '23:10 PM' },
                { cantidad: '4 GALONES', fecha: '25/06/2025', hora: '23:55 PM' }
            ]
        }
    }

    const currentData = turnoData[selectedTurno]

    const handleTurnoSelect = (turno: TurnoType) => {
        setSelectedTurno(turno)
    }

    return (
            <div className="p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4 lg:space-y-6">
                {/* Indicador de Turno Seleccionado */}
                <div className="bg-slate-700 rounded-lg p-3 lg:p-4 mb-3 lg:mb-4">
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3">
                        <span className="text-white font-bold text-base lg:text-lg">TURNO ACTIVO:</span>
                        <div className={`px-3 lg:px-4 py-2 rounded-full font-bold text-white text-sm lg:text-base ${
                            selectedTurno === 'manana' ? 'bg-blue-600' :
                            selectedTurno === 'tarde' ? 'bg-orange-600' :
                            'bg-purple-600'
                        }`}>
                            {selectedTurno === 'manana' ? 'MAÑANA' :
                             selectedTurno === 'tarde' ? 'TARDE' : 'NOCHE'}
                        </div>
                        <div className="text-xl lg:text-2xl">
                            {selectedTurno === 'manana' ? '☁️' :
                             selectedTurno === 'tarde' ? '☀️' : '🌕'}
                        </div>
                    </div>
                </div>

                {/* Tarjetas de Turnos - Botones Seleccionables */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4">
                    {/* Turno Mañana */}
                    <button
                        onClick={() => handleTurnoSelect('manana')}
                        className={`rounded-2xl p-4 lg:p-6 text-white relative transition-all duration-300 transform hover:scale-105 ${
                            selectedTurno === 'manana'
                                ? 'bg-blue-600 border-4 border-blue-400 shadow-lg shadow-blue-500/50'
                                : 'bg-slate-800 hover:bg-slate-700'
                        }`}
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold leading-tight">TURNO</h3>
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold leading-tight">MAÑANA</h3>
                            </div>
                            <div className={`text-4xl sm:text-5xl lg:text-6xl transition-all duration-300 ${
                                selectedTurno === 'manana' ? 'animate-pulse' : ''
                            }`}>☁️</div>
                        </div>
                        {selectedTurno === 'manana' && (
                            <div className="absolute top-2 right-2 bg-green-500 rounded-full w-3 h-3 lg:w-4 lg:h-4 flex items-center justify-center">
                                <div className="text-white text-xs">✓</div>
                            </div>
                        )}
                    </button>

                    {/* Turno Tarde */}
                    <button
                        onClick={() => handleTurnoSelect('tarde')}
                        className={`rounded-2xl p-4 lg:p-6 text-white relative transition-all duration-300 transform hover:scale-105 ${
                            selectedTurno === 'tarde'
                                ? 'bg-orange-600 border-4 border-orange-400 shadow-lg shadow-orange-500/50'
                                : 'bg-slate-800 hover:bg-slate-700'
                        }`}
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold leading-tight">TURNO</h3>
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold leading-tight">TARDE</h3>
                            </div>
                            <div className={`text-4xl sm:text-5xl lg:text-6xl transition-all duration-300 ${
                                selectedTurno === 'tarde' ? 'animate-pulse' : ''
                            }`}>☀️</div>
                        </div>
                        {selectedTurno === 'tarde' && (
                            <div className="absolute top-2 right-2 bg-green-500 rounded-full w-3 h-3 lg:w-4 lg:h-4 flex items-center justify-center">
                                <div className="text-white text-xs">✓</div>
                            </div>
                        )}
                    </button>

                    {/* Turno Noche */}
                    <button
                        onClick={() => handleTurnoSelect('noche')}
                        className={`rounded-2xl p-4 lg:p-6 text-white relative transition-all duration-300 transform hover:scale-105 ${
                            selectedTurno === 'noche'
                                ? 'bg-purple-600 border-4 border-purple-400 shadow-lg shadow-purple-500/50'
                                : 'bg-slate-800 hover:bg-slate-700'
                        }`}
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold leading-tight">TURNO</h3>
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold leading-tight">NOCHE</h3>
                            </div>
                            <div className={`text-4xl sm:text-5xl lg:text-6xl transition-all duration-300 ${
                                selectedTurno === 'noche' ? 'animate-pulse' : ''
                            }`}>🌕</div>
                        </div>
                        {selectedTurno === 'noche' && (
                            <div className="absolute top-2 right-2 bg-green-500 rounded-full w-3 h-3 lg:w-4 lg:h-4 flex items-center justify-center">
                                <div className="text-white text-xs">✓</div>
                            </div>
                        )}
                    </button>
                </div>

                {/* Sección Principal */}
                <div className="grid grid-cols-1 xl:grid-cols-5 gap-3 lg:gap-4">
                    {/* Panel VENTAS */}
                    <div className="xl:col-span-3 bg-slate-800 rounded-2xl p-4 lg:p-6">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-3 lg:mb-4">VENTAS</h2>
                        <div className="h-1 bg-white mb-4 lg:mb-8"></div>
                        
                        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between space-y-6 lg:space-y-0">
                            {/* Columna de tanques de combustible */}
                            <div className="flex justify-center lg:justify-start space-x-4 lg:space-x-6 items-end">
                                {/* Tank Regular */}
                                <div className="relative">
                                    <div className="w-16 h-40 sm:w-18 sm:h-48 lg:w-20 lg:h-56 bg-slate-700 rounded-3xl border-4 border-white relative overflow-hidden">
                                        <div className={`absolute bottom-0 left-0 right-0 bg-red-500 rounded-2xl transition-all duration-500 ${currentData.ventas.regular.nivel}`}></div>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white font-bold z-10">
                                            <div className="text-lg sm:text-2xl lg:text-3xl">{currentData.ventas.regular.galones}</div>
                                            <div className="text-sm sm:text-base lg:text-lg">GAL</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Tank Premium */}
                                <div className="relative">
                                    <div className="w-16 h-40 sm:w-18 sm:h-48 lg:w-20 lg:h-56 bg-slate-700 rounded-3xl border-4 border-white relative overflow-hidden">
                                        <div className={`absolute bottom-0 left-0 right-0 bg-green-500 rounded-2xl transition-all duration-500 ${currentData.ventas.premium.nivel}`}></div>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white font-bold z-10">
                                            <div className="text-lg sm:text-2xl lg:text-3xl">{currentData.ventas.premium.galones}</div>
                                            <div className="text-sm sm:text-base lg:text-lg">GAL</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Tank Diesel */}
                                <div className="relative">
                                    <div className="w-16 h-40 sm:w-18 sm:h-48 lg:w-20 lg:h-56 bg-slate-700 rounded-3xl border-4 border-white relative overflow-hidden">
                                        <div className={`absolute bottom-0 left-0 right-0 bg-purple-500 rounded-2xl transition-all duration-500 ${currentData.ventas.diesel.nivel}`}></div>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white font-bold z-10">
                                            <div className="text-lg sm:text-2xl lg:text-3xl">{currentData.ventas.diesel.galones}</div>
                                            <div className="text-sm sm:text-base lg:text-lg">GAL</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Columna de precios */}
                            <div className="flex flex-col justify-center space-y-3 lg:space-y-4 flex-1 lg:ml-12 lg:h-56">
                                <div className="flex items-center justify-between border-b border-gray-500 pb-2">
                                    <span className="text-red-400 font-bold text-lg sm:text-xl lg:text-2xl">REGULAR</span>
                                    <span className="text-white font-bold text-lg sm:text-xl lg:text-2xl">S/ {currentData.ventas.regular.precio.toFixed(2)}</span>
                                </div>
                                <div className="flex items-center justify-between border-b border-gray-500 pb-2">
                                    <span className="text-green-400 font-bold text-lg sm:text-xl lg:text-2xl">PREMIUM</span>
                                    <span className="text-white font-bold text-lg sm:text-xl lg:text-2xl">S/ {currentData.ventas.premium.precio.toFixed(2)}</span>
                                </div>
                                <div className="flex items-center justify-between border-b border-gray-500 pb-2">
                                    <span className="text-purple-400 font-bold text-lg sm:text-xl lg:text-2xl">DIESEL</span>
                                    <span className="text-white font-bold text-lg sm:text-xl lg:text-2xl">S/ {currentData.ventas.diesel.precio.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Panel TOTAL */}
                    <div className="xl:col-span-2 bg-slate-800 rounded-2xl p-4 lg:p-6">
                        <h2 className="text-2xl lg:text-3xl font-bold text-white text-center mb-3 lg:mb-4">TOTAL</h2>
                        <div className="h-1 bg-slate-600 mb-4 lg:mb-6"></div>
                        
                        <div className="space-y-4 lg:space-y-6">
                            <div>
                                <div className="text-white font-bold text-base lg:text-lg mb-2">VENTAS</div>
                                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white transition-all duration-500">{currentData.total.totalGalones} GALONES</div>
                            </div>
                            
                            <div>
                                <div className="text-white font-bold text-base lg:text-lg mb-2">GANANCIA</div>
                                <div className="bg-slate-700 rounded-lg p-3 lg:p-4">
                                    <div className="text-2xl lg:text-3xl font-bold text-white transition-all duration-500">S/ {currentData.total.ganancia.toFixed(2)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sección Inferior */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                    {/* Panel CRÉDITOS */}
                    <div className="bg-slate-800 rounded-2xl p-4 lg:p-6">
                        <h2 className="text-2xl lg:text-3xl font-bold text-white text-center mb-3 lg:mb-4">CRÉDITOS</h2>
                        <div className="h-1 bg-slate-600 mb-4 lg:mb-6"></div>
                        
                        <div className="space-y-6 lg:space-y-8">
                            {/* Barra Regular */}
                            <div className="flex items-center space-x-4 lg:space-x-6">
                                <div className="flex-1 bg-slate-600 h-16 lg:h-20 rounded-xl overflow-hidden border-4 border-white">
                                    <div className={`h-full bg-red-500 transition-all duration-500 ${currentData.creditos.regular.porcentaje}`}></div>
                                </div>
                                <span className="text-white font-bold text-xl lg:text-3xl transition-all duration-500 whitespace-nowrap">{currentData.creditos.regular.galones} GAL</span>
                            </div>

                            {/* Barra Premium */}
                            <div className="flex items-center space-x-4 lg:space-x-6">
                                <div className="flex-1 bg-slate-600 h-16 lg:h-20 rounded-xl overflow-hidden border-4 border-white">
                                    <div className={`h-full bg-green-500 transition-all duration-500 ${currentData.creditos.premium.porcentaje}`}></div>
                                </div>
                                <span className="text-white font-bold text-xl lg:text-3xl transition-all duration-500 whitespace-nowrap">{currentData.creditos.premium.galones} GAL</span>
                            </div>

                            {/* Barra Diesel */}
                            <div className="flex items-center space-x-4 lg:space-x-6">
                                <div className="flex-1 bg-slate-600 h-16 lg:h-20 rounded-xl overflow-hidden border-4 border-white">
                                    <div className={`h-full bg-purple-500 transition-all duration-500 ${currentData.creditos.diesel.porcentaje}`}></div>
                                </div>
                                <span className="text-white font-bold text-xl lg:text-3xl transition-all duration-500 whitespace-nowrap">{currentData.creditos.diesel.galones} GAL</span>
                            </div>
                        </div>
                    </div>

                    {/* Tabla de Transacciones */}
                    <div className="bg-slate-800 rounded-2xl p-4 lg:p-6">
                        {/* Header de la tabla */}
                        <div className="bg-slate-700 rounded-lg p-2 lg:p-3 mb-3 lg:mb-4">
                            <div className="grid grid-cols-3 gap-2 lg:gap-4 text-white font-bold text-center text-sm sm:text-base lg:text-lg">
                                <div>CANTIDAD</div>
                                <div>FECHA</div>
                                <div>HORA</div>
                            </div>
                        </div>
                        
                        {/* Filas de datos */}
                        <div className="space-y-1 max-h-48 lg:max-h-none overflow-y-auto lg:overflow-y-visible">
                            {currentData.transacciones.map((transaccion, index) => (
                                <div key={index} className="grid grid-cols-3 gap-2 lg:gap-4 text-white font-medium text-center py-1 lg:py-2 transition-all duration-300 text-xs sm:text-sm lg:text-base">
                                    <div className="truncate">{transaccion.cantidad}</div>
                                    <div className="truncate">{transaccion.fecha}</div>
                                    <div className="truncate">{transaccion.hora}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default GrifoTurnos

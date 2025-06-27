'use client'

import React, { useState } from 'react'

const GrifoConfiguracion: React.FC = () => {
    const [activeTab, setActiveTab] = useState('datos')
    
    return (
            <div className="p-3 sm:p-4 lg:p-6 space-y-4 lg:space-y-6">
                {/* Pestañas de Navegación */}
                <div className="bg-slate-800 rounded-2xl p-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                        <button
                            onClick={() => setActiveTab('datos')}
                            className={`py-3 px-2 sm:px-4 rounded-xl font-bold text-white transition-all duration-300 text-sm sm:text-base ${
                                activeTab === 'datos'
                                    ? 'bg-blue-600 shadow-lg shadow-blue-500/50'
                                    : 'bg-slate-700 hover:bg-slate-600'
                            }`}
                        >
                            <span className="block sm:hidden">📊</span>
                            <span className="hidden sm:block">📊 DATOS DEL GRIFO</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('parametros')}
                            className={`py-3 px-2 sm:px-4 rounded-xl font-bold text-white transition-all duration-300 text-sm sm:text-base ${
                                activeTab === 'parametros'
                                    ? 'bg-green-600 shadow-lg shadow-green-500/50'
                                    : 'bg-slate-700 hover:bg-slate-600'
                            }`}
                        >
                            <span className="block sm:hidden">⚙️</span>
                            <span className="hidden sm:block">⚙️ PARÁMETROS</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('caja')}
                            className={`py-3 px-2 sm:px-4 rounded-xl font-bold text-white transition-all duration-300 text-sm sm:text-base ${
                                activeTab === 'caja'
                                    ? 'bg-orange-600 shadow-lg shadow-orange-500/50'
                                    : 'bg-slate-700 hover:bg-slate-600'
                            }`}
                        >
                            <span className="block sm:hidden">💰</span>
                            <span className="hidden sm:block">💰 CONTROL CAJA</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('backup')}
                            className={`py-3 px-2 sm:px-4 rounded-xl font-bold text-white transition-all duration-300 text-sm sm:text-base ${
                                activeTab === 'backup'
                                    ? 'bg-purple-600 shadow-lg shadow-purple-500/50'
                                    : 'bg-slate-700 hover:bg-slate-600'
                            }`}
                        >
                            <span className="block sm:hidden">💾</span>
                            <span className="hidden sm:block">💾 BACKUP</span>
                        </button>
                    </div>
                </div>

                {/* Contenido Dinámico */}
                {activeTab === 'datos' && (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
                        {/* Información del Grifo */}
                        <div className="bg-slate-800 rounded-2xl p-4 lg:p-6">
                            <h2 className="text-2xl lg:text-3xl font-bold text-white text-center mb-4 lg:mb-6">INFORMACIÓN DEL GRIFO</h2>
                            <div className="h-1 bg-white mb-4 lg:mb-6"></div>
                            
                            <div className="space-y-3 lg:space-y-4">
                                <div className="bg-slate-700 rounded-lg p-3 lg:p-4">
                                    <label className="text-white font-bold text-base lg:text-lg mb-2 block">NOMBRE DEL GRIFO</label>
                                    <input
                                        type="text"
                                        defaultValue="GRIFO SAN MARTÍN"
                                        className="w-full bg-slate-600 text-white p-2 lg:p-3 rounded-lg border-2 border-slate-500 focus:border-blue-400 focus:outline-none text-sm lg:text-base"
                                    />
                                </div>
                                
                                <div className="bg-slate-700 rounded-lg p-3 lg:p-4">
                                    <label className="text-white font-bold text-base lg:text-lg mb-2 block">RUC</label>
                                    <input
                                        type="text"
                                        defaultValue="20123456789"
                                        className="w-full bg-slate-600 text-white p-2 lg:p-3 rounded-lg border-2 border-slate-500 focus:border-blue-400 focus:outline-none text-sm lg:text-base"
                                    />
                                </div>
                                
                                <div className="bg-slate-700 rounded-lg p-3 lg:p-4">
                                    <label className="text-white font-bold text-base lg:text-lg mb-2 block">DIRECCIÓN</label>
                                    <input
                                        type="text"
                                        defaultValue="Av. Principal 123, Lima"
                                        className="w-full bg-slate-600 text-white p-2 lg:p-3 rounded-lg border-2 border-slate-500 focus:border-blue-400 focus:outline-none text-sm lg:text-base"
                                    />
                                </div>
                                
                                <div className="bg-slate-700 rounded-lg p-3 lg:p-4">
                                    <label className="text-white font-bold text-base lg:text-lg mb-2 block">TELÉFONO</label>
                                    <input
                                        type="text"
                                        defaultValue="+51 999 888 777"
                                        className="w-full bg-slate-600 text-white p-2 lg:p-3 rounded-lg border-2 border-slate-500 focus:border-blue-400 focus:outline-none text-sm lg:text-base"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Estado del Sistema */}
                        <div className="bg-slate-800 rounded-2xl p-4 lg:p-6">
                            <h2 className="text-2xl lg:text-3xl font-bold text-white text-center mb-4 lg:mb-6">ESTADO DEL SISTEMA</h2>
                            <div className="h-1 bg-slate-600 mb-4 lg:mb-6"></div>
                            
                            <div className="space-y-4 lg:space-y-6">
                                <div className="bg-slate-700 rounded-lg p-3 lg:p-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-white font-bold text-lg lg:text-xl">CONEXIÓN</span>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-3 h-3 lg:w-4 lg:h-4 bg-green-500 rounded-full animate-pulse"></div>
                                            <span className="text-green-400 font-bold text-sm lg:text-base">ACTIVA</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-slate-700 rounded-lg p-3 lg:p-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-white font-bold text-lg lg:text-xl">BASE DE DATOS</span>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-3 h-3 lg:w-4 lg:h-4 bg-green-500 rounded-full animate-pulse"></div>
                                            <span className="text-green-400 font-bold text-sm lg:text-base">OPERATIVA</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-slate-700 rounded-lg p-3 lg:p-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-white font-bold text-lg lg:text-xl">IMPRESORA</span>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-3 h-3 lg:w-4 lg:h-4 bg-yellow-500 rounded-full animate-pulse"></div>
                                            <span className="text-yellow-400 font-bold text-sm lg:text-base">ALERTA</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-slate-700 rounded-lg p-3 lg:p-4">
                                    <span className="text-white font-bold text-base lg:text-lg block mb-2">ÚLTIMO BACKUP</span>
                                    <span className="text-slate-300 text-base lg:text-lg">25/06/2025 - 08:30 AM</span>
                                </div>
                                
                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm lg:text-base">
                                    💾 GUARDAR CAMBIOS
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'parametros' && (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
                        {/* Configuración de Turnos */}
                        <div className="bg-slate-800 rounded-2xl p-4 lg:p-6">
                            <h2 className="text-2xl lg:text-3xl font-bold text-white text-center mb-4 lg:mb-6">CONFIGURACIÓN DE TURNOS</h2>
                            <div className="h-1 bg-white mb-4 lg:mb-6"></div>
                            
                            <div className="space-y-3 lg:space-y-4">
                                <div className="bg-slate-700 rounded-lg p-3 lg:p-4">
                                    <label className="text-white font-bold text-base lg:text-lg mb-2 block">🌅 TURNO Leon</label>
                                    <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                                        <input
                                            type="time"
                                            defaultValue="06:00"
                                            className="flex-1 bg-slate-600 text-white p-2 lg:p-3 rounded-lg border-2 border-slate-500 focus:border-green-400 focus:outline-none text-sm lg:text-base"
                                        />
                                        <span className="text-white self-center font-bold text-center sm:text-left">-</span>
                                        <input
                                            type="time"
                                            defaultValue="14:00"
                                            className="flex-1 bg-slate-600 text-white p-2 lg:p-3 rounded-lg border-2 border-slate-500 focus:border-green-400 focus:outline-none text-sm lg:text-base"
                                        />
                                    </div>
                                </div>
                                
                                <div className="bg-slate-700 rounded-lg p-3 lg:p-4">
                                    <label className="text-white font-bold text-base lg:text-lg mb-2 block">☀️ TURNO Lobo</label>
                                    <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                                        <input
                                            type="time"
                                            defaultValue="14:00"
                                            className="flex-1 bg-slate-600 text-white p-2 lg:p-3 rounded-lg border-2 border-slate-500 focus:border-green-400 focus:outline-none text-sm lg:text-base"
                                        />
                                        <span className="text-white self-center font-bold text-center sm:text-left">-</span>
                                        <input
                                            type="time"
                                            defaultValue="22:00"
                                            className="flex-1 bg-slate-600 text-white p-2 lg:p-3 rounded-lg border-2 border-slate-500 focus:border-green-400 focus:outline-none text-sm lg:text-base"
                                        />
                                    </div>
                                </div>
                                
                                <div className="bg-slate-700 rounded-lg p-3 lg:p-4">
                                    <label className="text-white font-bold text-base lg:text-lg mb-2 block">🌙 TURNO Buho</label>
                                    <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                                        <input
                                            type="time"
                                            defaultValue="22:00"
                                            className="flex-1 bg-slate-600 text-white p-2 lg:p-3 rounded-lg border-2 border-slate-500 focus:border-green-400 focus:outline-none text-sm lg:text-base"
                                        />
                                        <span className="text-white self-center font-bold text-center sm:text-left">-</span>
                                        <input
                                            type="time"
                                            defaultValue="06:00"
                                            className="flex-1 bg-slate-600 text-white p-2 lg:p-3 rounded-lg border-2 border-slate-500 focus:border-green-400 focus:outline-none text-sm lg:text-base"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Descuentos y Medios de Pago */}
                        <div className="bg-slate-800 rounded-2xl p-4 lg:p-6">
                            <h2 className="text-2xl lg:text-3xl font-bold text-white text-center mb-4 lg:mb-6">DESCUENTOS Y PAGOS</h2>
                            <div className="h-1 bg-slate-600 mb-4 lg:mb-6"></div>
                            
                            <div className="space-y-3 lg:space-y-4">
                                <div className="bg-slate-700 rounded-lg p-3 lg:p-4">
                                    <label className="text-white font-bold text-base lg:text-lg mb-2 block">💳 DESCUENTO EFECTIVO (%)</label>
                                    <input
                                        type="number"
                                        defaultValue="5"
                                        className="w-full bg-slate-600 text-white p-2 lg:p-3 rounded-lg border-2 border-slate-500 focus:border-green-400 focus:outline-none text-sm lg:text-base"
                                    />
                                </div>
                                
                                <div className="bg-slate-700 rounded-lg p-3 lg:p-4">
                                    <label className="text-white font-bold text-base lg:text-lg mb-2 block">💰 DESCUENTO CLIENTE FRECUENTE (%)</label>
                                    <input
                                        type="number"
                                        defaultValue="10"
                                        className="w-full bg-slate-600 text-white p-2 lg:p-3 rounded-lg border-2 border-slate-500 focus:border-green-400 focus:outline-none text-sm lg:text-base"
                                    />
                                </div>
                                
                                <div className="bg-slate-700 rounded-lg p-3 lg:p-4">
                                    <span className="text-white font-bold text-base lg:text-lg mb-3 block">MEDIOS DE PAGO ACTIVOS</span>
                                    <div className="space-y-2">
                                        <label className="flex items-center space-x-3">
                                            <input type="checkbox" defaultChecked className="w-4 h-4 lg:w-5 lg:h-5 text-green-600" />
                                            <span className="text-white text-sm lg:text-base">💵 Efectivo</span>
                                        </label>
                                        <label className="flex items-center space-x-3">
                                            <input type="checkbox" defaultChecked className="w-4 h-4 lg:w-5 lg:h-5 text-green-600" />
                                            <span className="text-white text-sm lg:text-base">💳 Tarjeta de Débito</span>
                                        </label>
                                        <label className="flex items-center space-x-3">
                                            <input type="checkbox" defaultChecked className="w-4 h-4 lg:w-5 lg:h-5 text-green-600" />
                                            <span className="text-white text-sm lg:text-base">💎 Tarjeta de Crédito</span>
                                        </label>
                                        <label className="flex items-center space-x-3">
                                            <input type="checkbox" className="w-4 h-4 lg:w-5 lg:h-5 text-green-600" />
                                            <span className="text-white text-sm lg:text-base">📱 Transferencia Digital</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'caja' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                        {/* Control de Apertura */}
                        <div className="bg-slate-800 rounded-2xl p-4 lg:p-6">
                            <h2 className="text-xl lg:text-2xl font-bold text-white text-center mb-3 lg:mb-4">🔓 APERTURA DE CAJA</h2>
                            <div className="h-1 bg-green-500 mb-4 lg:mb-6"></div>
                            
                            <div className="space-y-3 lg:space-y-4">
                                <div className="bg-slate-700 rounded-lg p-3 lg:p-4">
                                    <label className="text-white font-bold text-sm lg:text-base mb-2 block">MONTO INICIAL</label>
                                    <input
                                        type="number"
                                        placeholder="0.00"
                                        className="w-full bg-slate-600 text-white p-2 lg:p-3 rounded-lg border-2 border-slate-500 focus:border-green-400 focus:outline-none text-sm lg:text-base"
                                    />
                                </div>
                                
                                <div className="bg-slate-700 rounded-lg p-3 lg:p-4">
                                    <label className="text-white font-bold text-sm lg:text-base mb-2 block">RESPONSABLE</label>
                                    <select className="w-full bg-slate-600 text-white p-2 lg:p-3 rounded-lg border-2 border-slate-500 focus:border-green-400 focus:outline-none text-sm lg:text-base">
                                        <option>Juan Pérez - Turno Leon</option>
                                        <option>María García - Turno Lobo</option>
                                        <option>Carlos López - Turno Buho</option>
                                    </select>
                                </div>
                                
                                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 lg:py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm lg:text-base">
                                    🔓 ABRIR CAJA
                                </button>
                            </div>
                        </div>

                        {/* Estado Actual */}
                        <div className="bg-slate-800 rounded-2xl p-4 lg:p-6">
                            <h2 className="text-xl lg:text-2xl font-bold text-white text-center mb-3 lg:mb-4">📊 ESTADO ACTUAL</h2>
                            <div className="h-1 bg-blue-500 mb-4 lg:mb-6"></div>
                            
                            <div className="space-y-3 lg:space-y-4">
                                <div className="bg-slate-700 rounded-lg p-3 lg:p-4 text-center">
                                    <span className="text-slate-300 text-xs lg:text-sm">CAJA ABIERTA</span>
                                    <div className="text-xl lg:text-2xl font-bold text-green-400">✅ ACTIVA</div>
                                </div>
                                
                                <div className="bg-slate-700 rounded-lg p-3 lg:p-4 text-center">
                                    <span className="text-slate-300 text-xs lg:text-sm">MONTO INICIAL</span>
                                    <div className="text-xl lg:text-2xl font-bold text-white">S/ 500.00</div>
                                </div>
                                
                                <div className="bg-slate-700 rounded-lg p-3 lg:p-4 text-center">
                                    <span className="text-slate-300 text-xs lg:text-sm">VENTAS ACTUALES</span>
                                    <div className="text-xl lg:text-2xl font-bold text-blue-400">S/ 2,340.00</div>
                                </div>
                                
                                <div className="bg-slate-700 rounded-lg p-3 lg:p-4 text-center">
                                    <span className="text-slate-300 text-xs lg:text-sm">TOTAL EN CAJA</span>
                                    <div className="text-2xl lg:text-3xl font-bold text-green-400">S/ 2,840.00</div>
                                </div>
                            </div>
                        </div>

                        {/* Control de Cierre */}
                        <div className="bg-slate-800 rounded-2xl p-4 lg:p-6 lg:col-span-2 xl:col-span-1">
                            <h2 className="text-xl lg:text-2xl font-bold text-white text-center mb-3 lg:mb-4">🔒 CIERRE DE CAJA</h2>
                            <div className="h-1 bg-red-500 mb-4 lg:mb-6"></div>
                            
                            <div className="space-y-3 lg:space-y-4">
                                <div className="bg-slate-700 rounded-lg p-3 lg:p-4">
                                    <label className="text-white font-bold text-sm lg:text-base mb-2 block">MONTO FÍSICO</label>
                                    <input
                                        type="number"
                                        placeholder="0.00"
                                        className="w-full bg-slate-600 text-white p-2 lg:p-3 rounded-lg border-2 border-slate-500 focus:border-red-400 focus:outline-none text-sm lg:text-base"
                                    />
                                </div>
                                
                                <div className="bg-slate-700 rounded-lg p-3 lg:p-4">
                                    <label className="text-white font-bold text-sm lg:text-base mb-2 block">OBSERVACIONES</label>
                                    <textarea
                                        rows={3}
                                        placeholder="Notas del cierre..."
                                        className="w-full bg-slate-600 text-white p-2 lg:p-3 rounded-lg border-2 border-slate-500 focus:border-red-400 focus:outline-none resize-none text-sm lg:text-base"
                                    ></textarea>
                                </div>
                                
                                <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 lg:py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm lg:text-base">
                                    🔒 CERRAR CAJA
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'backup' && (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
                        {/* Backup Manual */}
                        <div className="bg-slate-800 rounded-2xl p-4 lg:p-6">
                            <h2 className="text-2xl lg:text-3xl font-bold text-white text-center mb-4 lg:mb-6">💾 BACKUP MANUAL</h2>
                            <div className="h-1 bg-white mb-4 lg:mb-6"></div>
                            
                            <div className="space-y-4 lg:space-y-6">
                                <div className="bg-slate-700 rounded-lg p-3 lg:p-4 text-center">
                                    <span className="text-slate-300 text-base lg:text-lg">ÚLTIMO BACKUP</span>
                                    <div className="text-xl lg:text-2xl font-bold text-white mt-2">25/06/2025 - 08:30 AM</div>
                                    <div className="text-green-400 font-bold mt-1 text-sm lg:text-base">✅ EXITOSO</div>
                                </div>
                                
                                <div className="bg-slate-700 rounded-lg p-3 lg:p-4">
                                    <label className="text-white font-bold text-base lg:text-lg mb-2 block">TIPO DE BACKUP</label>
                                    <select className="w-full bg-slate-600 text-white p-2 lg:p-3 rounded-lg border-2 border-slate-500 focus:border-purple-400 focus:outline-none text-sm lg:text-base">
                                        <option>Backup Completo</option>
                                        <option>Solo Ventas</option>
                                        <option>Solo Configuración</option>
                                        <option>Solo Usuarios</option>
                                    </select>
                                </div>
                                
                                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 lg:py-4 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm lg:text-base">
                                    💾 CREAR BACKUP AHORA
                                </button>
                                
                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 lg:py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm lg:text-base">
                                    📥 RESTAURAR BACKUP
                                </button>
                            </div>
                        </div>

                        {/* Configuración Automática */}
                        <div className="bg-slate-800 rounded-2xl p-4 lg:p-6">
                            <h2 className="text-2xl lg:text-3xl font-bold text-white text-center mb-4 lg:mb-6">⚙️ BACKUP AUTOMÁTICO</h2>
                            <div className="h-1 bg-slate-600 mb-4 lg:mb-6"></div>
                            
                            <div className="space-y-3 lg:space-y-4">
                                <div className="bg-slate-700 rounded-lg p-3 lg:p-4">
                                    <label className="text-white font-bold text-base lg:text-lg mb-2 block">FRECUENCIA</label>
                                    <select className="w-full bg-slate-600 text-white p-2 lg:p-3 rounded-lg border-2 border-slate-500 focus:border-purple-400 focus:outline-none text-sm lg:text-base">
                                        <option>Diario</option>
                                        <option>Semanal</option>
                                        <option>Mensual</option>
                                        <option>Desactivado</option>
                                    </select>
                                </div>
                                
                                <div className="bg-slate-700 rounded-lg p-3 lg:p-4">
                                    <label className="text-white font-bold text-base lg:text-lg mb-2 block">HORA PROGRAMADA</label>
                                    <input
                                        type="time"
                                        defaultValue="02:00"
                                        className="w-full bg-slate-600 text-white p-2 lg:p-3 rounded-lg border-2 border-slate-500 focus:border-purple-400 focus:outline-none text-sm lg:text-base"
                                    />
                                </div>
                                
                                <div className="bg-slate-700 rounded-lg p-3 lg:p-4">
                                    <span className="text-white font-bold text-base lg:text-lg mb-3 block">OPCIONES</span>
                                    <div className="space-y-2">
                                        <label className="flex items-center space-x-3">
                                            <input type="checkbox" defaultChecked className="w-4 h-4 lg:w-5 lg:h-5 text-purple-600" />
                                            <span className="text-white text-sm lg:text-base">Notificar por email</span>
                                        </label>
                                        <label className="flex items-center space-x-3">
                                            <input type="checkbox" defaultChecked className="w-4 h-4 lg:w-5 lg:h-5 text-purple-600" />
                                            <span className="text-white text-sm lg:text-base">Mantener 30 días</span>
                                        </label>
                                        <label className="flex items-center space-x-3">
                                            <input type="checkbox" className="w-4 h-4 lg:w-5 lg:h-5 text-purple-600" />
                                            <span className="text-white text-sm lg:text-base">Backup en la nube</span>
                                        </label>
                                    </div>
                                </div>
                                
                                <div className="bg-green-800 rounded-lg p-3 lg:p-4 text-center">
                                    <div className="text-green-400 font-bold text-base lg:text-lg">🟢 BACKUP AUTOMÁTICO ACTIVO</div>
                                    <div className="text-white text-xs lg:text-sm mt-1">Próximo: 26/06/2025 - 02:00 AM</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
    )
}

export default GrifoConfiguracion

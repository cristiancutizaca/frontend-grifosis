
import React, { useState, useEffect } from 'react'
import { userService } from '../../src/services/userService'
import { jwtDecode } from 'jwt-decode'

const GrifoTurnos: React.FC = () => {
    // Datos de ejemplo para el diseño original
    const [empleadoActual, setEmpleadoActual] = useState<any>(null)
    const [empleados, setEmpleados] = useState<any[]>([])
    const [ventasRecientes, setVentasRecientes] = useState<any[]>([
        { cantidad: '5 GALONES', fecha: '25/06/2025', hora: '08:15 AM' },
        { cantidad: '10 GALONES', fecha: '25/06/2025', hora: '09:30 AM' },
        { cantidad: '8 GALONES', fecha: '25/06/2025', hora: '10:45 AM' },
        { cantidad: '12 GALONES', fecha: '25/06/2025', hora: '11:20 AM' },
        { cantidad: '6 GALONES', fecha: '25/06/2025', hora: '11:55 AM' }
    ])

    // Simulación de turno activo (para mostrar el nombre del empleado)
    const turnoActivoSimulado = {
        fecha_inicio: new Date().toISOString(),
        monto_inicial: 0,
        estado: 'activo'
    }

    // Obtener información del empleado actual (si está logueado)
    useEffect(() => {
        const obtenerEmpleadoActual = async () => {
            try {
                const token = sessionStorage.getItem('token') || localStorage.getItem('token')
                if (!token) {
                    setEmpleadoActual({ full_name: 'Leon', user_id: 1 }) // Datos de ejemplo
                    return
                }

                const decoded: any = jwtDecode(token)
                const userId = decoded.user_id || decoded.sub

                if (userId) {
                    const usuarios = await userService.getUsersByRole('seller')
                    const empleado = usuarios.find(u => u.user_id === userId)
                    setEmpleadoActual(empleado || { full_name: 'Leon', user_id: 1 }) // Fallback a ejemplo
                } else {
                    setEmpleadoActual({ full_name: 'Leon', user_id: 1 }) // Fallback a ejemplo
                }
            } catch (error) {
                console.error('Error al obtener empleado actual:', error)
                setEmpleadoActual({ full_name: 'Leon', user_id: 1 }) // Fallback a ejemplo en caso de error
            }
        }

        obtenerEmpleadoActual()
    }, [])

    // Obtener lista de empleados (si está logueado)
    useEffect(() => {
        const obtenerEmpleados = async () => {
            try {
                const token = sessionStorage.getItem('token') || localStorage.getItem('token')
                if (!token) {
                    setEmpleados([
                        { full_name: 'Leon', user_id: 1 },
                        { full_name: 'Lobo', user_id: 2 },
                        { full_name: 'Buho', user_id: 3 }
                    ]) // Datos de ejemplo
                    return
                }

                const usuarios = await userService.getUsersByRole('seller')
                if (usuarios.length > 0) {
                    setEmpleados(usuarios)
                } else {
                    setEmpleados([
                        { full_name: 'Leon', user_id: 1 },
                        { full_name: 'Lobo', user_id: 2 },
                        { full_name: 'Buho', user_id: 3 }
                    ]) // Fallback a ejemplo
                }
            } catch (error) {
                console.error('Error al obtener empleados:', error)
                setEmpleados([
                    { full_name: 'Leon', user_id: 1 },
                    { full_name: 'Lobo', user_id: 2 },
                    { full_name: 'Buho', user_id: 3 }
                ]) // Fallback a ejemplo en caso de error
            }
        }

        obtenerEmpleados()
    }, [])

    // Función para formatear fecha
    const formatearFecha = (fecha: string) => {
        return new Date(fecha).toLocaleDateString('es-PE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
    }

    // Función para formatear hora
    const formatearHora = (fecha: string) => {
        return new Date(fecha).toLocaleTimeString('es-PE', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        })
    }

    // Datos de ventas por tipo (ejemplo)
    const ventasPorTipo = {
        regular: { galones: 50, total: 800 },
        premium: { galones: 10, total: 200 },
        diesel: { galones: 30, total: 500 }
    }

    // Datos de créditos (ejemplo)
    const creditos = {
        regular: 30,
        premium: 20,
        diesel: 60
    }

    const totalGalones = ventasPorTipo.regular.galones + ventasPorTipo.premium.galones + ventasPorTipo.diesel.galones
    const totalVentas = ventasPorTipo.regular.total + ventasPorTipo.premium.total + ventasPorTipo.diesel.total

    return (
        <div className="min-h-screen bg-gray-900 p-4 space-y-6">
            {/* Header con turnos activos */}
            <div className="bg-gray-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <span className="text-white text-xl font-bold">TURNO ACTIVO:</span>
                    <div className="flex items-center space-x-2">
                        <span className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold">
                            {empleadoActual?.full_name || 'Leon'}
                        </span>
                        <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
                    </div>
                </div>

                {/* Tarjetas de turnos */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {empleados.slice(0, 3).map((empleado, index) => {
                        const isActive = empleado.user_id === empleadoActual?.user_id
                        const colors = [
                            'bg-blue-600',
                            'bg-gray-700',
                            'bg-gray-700'
                        ]
                        const icons = ['☁️', '🌟', '🌙']
                        
                        return (
                            <div key={empleado.user_id} className={`${colors[index]} rounded-2xl p-6 relative`}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-white text-xl font-bold">TURNO</div>
                                        <div className="text-white text-lg">{empleado.full_name}</div>
                                    </div>
                                    <div className="text-4xl">{icons[index]}</div>
                                </div>
                                {isActive && (
                                    <div className="absolute top-4 right-4 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                        <span className="text-white text-xs">✓</span>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Sección de ventas y total */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Ventas */}
                <div className="bg-gray-800 rounded-2xl p-6">
                    <h2 className="text-white text-2xl font-bold mb-6 text-center">VENTAS</h2>
                    <div className="border-t border-gray-600 pt-6">
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            {/* Regular */}
                            <div className="text-center">
                                <div className="bg-red-500 rounded-2xl h-32 flex items-center justify-center mb-2">
                                    <div className="text-white">
                                        <div className="text-2xl font-bold">{ventasPorTipo.regular.galones}</div>
                                        <div className="text-sm">GAL</div>
                                    </div>
                                </div>
                            </div>

                            {/* Premium */}
                            <div className="text-center">
                                <div className="bg-green-500 rounded-2xl h-32 flex items-center justify-center mb-2">
                                    <div className="text-white">
                                        <div className="text-2xl font-bold">{ventasPorTipo.premium.galones}</div>
                                        <div className="text-sm">GAL</div>
                                    </div>
                                </div>
                            </div>

                            {/* Diesel */}
                            <div className="text-center">
                                <div className="bg-purple-500 rounded-2xl h-32 flex items-center justify-center mb-2">
                                    <div className="text-white">
                                        <div className="text-2xl font-bold">{ventasPorTipo.diesel.galones}</div>
                                        <div className="text-sm">GAL</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Detalles de ventas */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-red-400 font-bold">REGULAR</span>
                                <span className="text-white font-bold">S/ {ventasPorTipo.regular.total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-green-400 font-bold">PREMIUM</span>
                                <span className="text-white font-bold">S/ {ventasPorTipo.premium.total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-purple-400 font-bold">DIESEL</span>
                                <span className="text-white font-bold">S/ {ventasPorTipo.diesel.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Total */}
                <div className="bg-gray-800 rounded-2xl p-6">
                    <h2 className="text-white text-2xl font-bold mb-6 text-center">TOTAL</h2>
                    <div className="text-center space-y-6">
                        <div>
                            <div className="text-gray-400 text-lg">VENTAS</div>
                            <div className="text-white text-4xl font-bold">{totalGalones} GALONES</div>
                        </div>
                        <div>
                            <div className="text-gray-400 text-lg">GANANCIA</div>
                            <div className="bg-gray-700 rounded-xl p-4">
                                <div className="text-white text-3xl font-bold">S/ {totalVentas.toFixed(2)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sección de créditos y transacciones */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Créditos */}
                <div className="bg-gray-800 rounded-2xl p-6">
                    <h2 className="text-white text-2xl font-bold mb-6 text-center">CRÉDITOS</h2>
                    <div className="space-y-4">
                        {/* Regular */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-red-500 rounded-xl"></div>
                                <div className="flex-1 bg-gray-700 rounded-xl h-8 relative">
                                    <div 
                                        className="bg-red-500 h-full rounded-xl transition-all duration-300"
                                        style={{ width: `${(creditos.regular / 100) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                            <span className="text-white font-bold text-xl">{creditos.regular} GAL</span>
                        </div>

                        {/* Premium */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-green-500 rounded-xl"></div>
                                <div className="flex-1 bg-gray-700 rounded-xl h-8 relative">
                                    <div 
                                        className="bg-green-500 h-full rounded-xl transition-all duration-300"
                                        style={{ width: `${(creditos.premium / 100) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                            <span className="text-white font-bold text-xl">{creditos.premium} GAL</span>
                        </div>

                        {/* Diesel */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-purple-500 rounded-xl"></div>
                                <div className="flex-1 bg-gray-700 rounded-xl h-8 relative">
                                    <div 
                                        className="bg-purple-500 h-full rounded-xl transition-all duration-300"
                                        style={{ width: `${(creditos.diesel / 100) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                            <span className="text-white font-bold text-xl">{creditos.diesel} GAL</span>
                        </div>
                    </div>
                </div>

                {/* Transacciones */}
                <div className="bg-gray-800 rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-white text-2xl font-bold">TRANSACCIONES</h2>
                    </div>
                    <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4 text-gray-400 text-sm font-bold">
                            <div>CANTIDAD</div>
                            <div>FECHA</div>
                            <div>HORA</div>
                        </div>
                        {ventasRecientes.map((venta, index) => (
                            <div key={index} className="grid grid-cols-3 gap-4 text-white">
                                <div>{venta.cantidad}</div>
                                <div>{venta.fecha}</div>
                                <div>{venta.hora}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Información del turno activo (simulado) */}
            {turnoActivoSimulado && (
                <div className="bg-gray-800 rounded-2xl p-6">
                    <h3 className="text-white text-xl font-bold mb-4">Información del Turno</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
                        <div>
                            <span className="text-gray-400">Inicio:</span>
                            <div className="font-bold">{formatearFecha(turnoActivoSimulado.fecha_inicio)} - {formatearHora(turnoActivoSimulado.fecha_inicio)}</div>
                        </div>
                        <div>
                            <span className="text-gray-400">Monto Inicial:</span>
                            <div className="font-bold">S/ {turnoActivoSimulado.monto_inicial.toFixed(2)}</div>
                        </div>
                        <div>
                            <span className="text-gray-400">Estado:</span>
                            <div className="font-bold text-green-400">{turnoActivoSimulado.estado.toUpperCase()}</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Botón para finalizar turno (ejemplo) */}
            <div className="text-center">
                <button
                    onClick={() => alert('Funcionalidad de finalizar turno no implementada en esta versión de ejemplo.')}
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold transition-colors"
                >
                    Finalizar Turno (Ejemplo)
                </button>
            </div>
        </div>
    )
}

export default GrifoTurnos



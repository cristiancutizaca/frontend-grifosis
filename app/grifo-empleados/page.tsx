'use client'

import React, { useState } from 'react'
import Layout from '../../src/components/Layout'

const GrifoReportes: React.FC = () => {
    interface Employee {
        id: number;
        name: string;
        email: string;
        role: string;
        status: 'Activo' | 'Inactivo';
        }

    // Datos de ejemplo para los empleados
    const [employees, setEmployees] = useState<Employee[]>([
        { id: 1, name: 'Juan Perez', email: 'juan.perez@email.com', role: 'Vendedor', status: 'Activo' },
        { id: 2, name: 'María García', email: 'maria.garcia@email.com', role: 'Administrador', status: 'Activo' },
        { id: 3, name: 'Carlos Ruiz', email: 'carlos.ruiz@email.com', role: 'Vendedor', status: 'Inactivo' },
        { id: 4, name: 'Laura Lopez', email: 'laura.lopez@email.com', role: 'Vendedor', status: 'Inactivo' },
    ]);

    // Estado para simular la edición de un empleado
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null); // null o el objeto del empleado

    const handleEditClick = (employee: Employee) => {
        setEditingEmployee(employee);
    };

    const handleCancelEdit = () => {
        setEditingEmployee(null);
    };

    // Componente para el icono de búsqueda (simulado)
    const SearchIcon = () => (
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
    );

    // Componente para el icono de lápiz (editar, simulado)
    const EditIcon = () => (
        <svg className="w-5 h-5 text-blue-500 hover:text-blue-600 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z"></path>
        </svg>
    );

    // Componente para el icono de papelera (eliminar, simulado)
    const DeleteIcon = () => (
        <svg className="w-5 h-5 text-red-500 hover:text-red-600 cursor-pointer ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
        </svg>
    );

    return (
        <Layout currentPage="reportes">
            <div className="p-2 sm:p-4 md:p-6 bg-gray-900 min-h-screen text-white">
                <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Gestión de Empleados</h1>

                <div className={`flex flex-col md:flex-row gap-4 md:gap-6 transition-all duration-300 ${
                    editingEmployee ? 'md:gap-4' : ''
                }`}>
                    {/* Sección Principal de la Tabla */}
                    <div className={`bg-gray-800 p-2 sm:p-4 md:p-6 rounded-lg shadow-lg transition-all duration-300
                        ${editingEmployee ? 'flex-1 md:w-3/5 lg:w-2/3' : 'flex-1'}
                    `}>
                        {/* Controles Superiores */}
                        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                            <div className="relative flex-1 w-full sm:w-auto">
                                <input
                                    type="text"
                                    placeholder="Buscar empleado..."
                                    className="w-full pl-9 pr-3 py-2 text-sm sm:text-base rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
                                    <SearchIcon />
                                </div>
                            </div>
                            <select className="w-full sm:w-auto px-3 py-2 text-sm sm:text-base rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>Filtrar por Rol</option>
                                <option>Administrador</option>
                                <option>Vendedor</option>
                            </select>
                            <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 sm:px-4 rounded-lg text-sm sm:text-base transition duration-200">
                                Agregar Nuevo empleado
                            </button>
                        </div>

                        {/* Tabla de Empleados */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-700 text-xs sm:text-sm">
                                <thead className="bg-gray-700">
                                    <tr>
                                        <th className="px-2 sm:px-6 py-2 sm:py-3 text-left font-medium text-gray-300 uppercase tracking-wider">NOMBRE COMPLETO</th>
                                        <th className="px-2 sm:px-6 py-2 sm:py-3 text-left font-medium text-gray-300 uppercase tracking-wider">CORREO ELECTRONICO</th>
                                        <th className="px-2 sm:px-6 py-2 sm:py-3 text-left font-medium text-gray-300 uppercase tracking-wider">ROL</th>
                                        <th className="px-2 sm:px-6 py-2 sm:py-3 text-left font-medium text-gray-300 uppercase tracking-wider">ESTADO</th>
                                        <th className="px-2 sm:px-6 py-2 sm:py-3 text-left font-medium text-gray-300 uppercase tracking-wider">ACCIONES</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-gray-800 divide-y divide-gray-700">
                                    {employees.map((employee) => (
                                        <tr key={employee.id}>
                                            <td className="px-2 sm:px-6 py-2 whitespace-nowrap font-medium text-white">{employee.name}</td>
                                            <td className="px-2 sm:px-6 py-2 whitespace-nowrap text-gray-300">{employee.email}</td>
                                            <td className="px-2 sm:px-6 py-2 whitespace-nowrap text-gray-300">{employee.role}</td>
                                            <td className="px-2 sm:px-6 py-2 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    employee.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {employee.status}
                                                </span>
                                            </td>
                                            <td className="px-2 sm:px-6 py-2 whitespace-nowrap text-right font-medium flex items-center">
                                                <button onClick={() => handleEditClick(employee)} className="text-blue-500 hover:text-blue-600">
                                                    <EditIcon />
                                                </button>
                                                <button className="text-red-500 hover:text-red-600 ml-2">
                                                    <DeleteIcon />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Sidebar de Edición de Empleado */}
                    {editingEmployee && (
                        <div className="w-full md:w-2/5 lg:w-1/3 bg-gray-800 p-2 sm:p-4 md:p-6 rounded-lg shadow-lg transition-all duration-300 mt-4 md:mt-0">
                            <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Editar Empleado: {editingEmployee.name}</h2>

                            {/* Información General */}
                            <div className="mb-4 sm:mb-6">
                                <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Información General</h3>
                                <div className="space-y-3 sm:space-y-4">
                                    <div>
                                        <label htmlFor="nombre" className="block text-xs sm:text-sm font-medium text-gray-300">Nombre</label>
                                        <input
                                            type="text"
                                            id="nombre"
                                            className="mt-1 block w-full px-2 py-1 sm:px-3 sm:py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-xs sm:text-sm"
                                            defaultValue={editingEmployee.name.split(' ')[0]}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="apellido" className="block text-xs sm:text-sm font-medium text-gray-300">Apellido</label>
                                        <input
                                            type="text"
                                            id="apellido"
                                            className="mt-1 block w-full px-2 py-1 sm:px-3 sm:py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-xs sm:text-sm"
                                            defaultValue={editingEmployee.name.split(' ')[1] || ''}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="correo" className="block text-xs sm:text-sm font-medium text-gray-300">Correo Electronico</label>
                                        <input
                                            type="email"
                                            id="correo"
                                            className="mt-1 block w-full px-2 py-1 sm:px-3 sm:py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-xs sm:text-sm"
                                            defaultValue={editingEmployee.email}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="telefono" className="block text-xs sm:text-sm font-medium text-gray-300">Teléfono</label>
                                        <input
                                            type="text"
                                            id="telefono"
                                            className="mt-1 block w-full px-2 py-1 sm:px-3 sm:py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-xs sm:text-sm"
                                            placeholder="Ej: +1234567890"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Estado de Cuenta y Permisos */}
                            <div className="mb-4 sm:mb-6">
                                <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Estado de Cuenta</h3>
                                <div className="space-y-2 sm:space-y-3">
                                    {/* Permisos por módulo */}
                                    <div className="grid grid-cols-4 gap-1 sm:gap-2 text-xs sm:text-sm items-center">
                                        <div className="font-bold">Módulo</div>
                                        <div className="font-bold">Lectura</div>
                                        <div className="font-bold">Escritura</div>
                                        <div className="font-bold">Eliminación</div>

                                        {/* Configuración */}
                                        <div>Config.</div>
                                        <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded" />
                                        <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded" />
                                        <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded" />

                                        {/* Usuarios */}
                                        <div>Usuarios</div>
                                        <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded" />
                                        <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded" />
                                        <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded" />

                                        {/* Clientes */}
                                        <div>Clientes</div>
                                        <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded" />
                                        <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded" />
                                        <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded" />

                                        {/* Ventas */}
                                        <div>Ventas</div>
                                        <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded" />
                                        <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded" />
                                        <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded" />

                                        {/* Créditos */}
                                        <div>Créditos</div>
                                        <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded" />
                                        <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded" />
                                        <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded" />

                                        {/* Pagos */}
                                        <div>Pagos</div>
                                        <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded" />
                                        <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded" />
                                        <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded" />

                                        {/* Almacén */}
                                        <div>Almacén</div>
                                        <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded" />
                                        <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded" />
                                        <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded" />

                                        {/* Gastos */}
                                        <div>Gastos</div>
                                        <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded" />
                                        <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded" />
                                        <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded" />

                                        {/* Reportes */}
                                        <div>Reportes</div>
                                        <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded" />
                                        <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded" />
                                        <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded" />
                                    </div>

                                    {/* Toggle de Estado de Cuenta */}
                                    <div className="flex items-center justify-between mt-2 sm:mt-4 pt-2 sm:pt-4 border-t border-gray-700">
                                        <span className="text-xs sm:text-base font-medium text-gray-300">Estado de Cuenta</span>
                                        <label htmlFor="toggle-status" className="flex items-center cursor-pointer">
                                            <div className="relative">
                                                <input
                                                    type="checkbox"
                                                    id="toggle-status"
                                                    className="sr-only"
                                                    checked={editingEmployee.status === 'Activo'}
                                                    onChange={() => { /* Lógica para cambiar el estado */ }}
                                                />
                                                <div className="block bg-gray-600 w-10 h-6 sm:w-14 sm:h-8 rounded-full"></div>
                                                <div className="dot absolute left-1 top-1 bg-white w-4 h-4 sm:w-6 sm:h-6 rounded-full transition transform"
                                                    style={{ transform: editingEmployee.status === 'Activo' ? 'translateX(100%)' : 'translateX(0)' }}></div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Botones de Acción */}
                            <div className="flex justify-end gap-2 sm:gap-3 mt-4 sm:mt-6">
                                <button
                                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-base transition duration-200"
                                >
                                    Guardar Cambios
                                </button>
                                <button
                                    onClick={handleCancelEdit}
                                    className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-base transition duration-200"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    )
}

export default GrifoReportes

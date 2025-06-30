'use client'

import React, { useState } from 'react'

const GrifoReportes: React.FC = () => {
    interface Employee {
        id: number;
        name: string;
        paternalName: string;
        maternalName: string;
        email: string;
        role: string;
        telefono: string;
        status: 'Activo' | 'Inactivo';
        }

    // Datos de ejemplo para los empleados
    const [employees, setEmployees] = useState<Employee[]>([
        { id: 1, name: 'Juan Perez', paternalName: 'Alvaro', maternalName: 'Gonzales', email: 'juan.perez@email.com', role: 'Vendedor', telefono: '900000000', status: 'Activo' },
        { id: 2, name: 'María García', paternalName: 'Alvaro', maternalName: 'Gonzales', email: 'maria.garcia@email.com', role: 'Administrador', telefono: '900000000', status: 'Activo' },
        { id: 3, name: 'María García', paternalName: 'Alvaro', maternalName: 'Gonzales', email: 'maria.garcia@email.com', role: 'Administrador', telefono: '900000000', status: 'Activo' },
        { id: 4, name: 'María García', paternalName: 'Alvaro', maternalName: 'Gonzales', email: 'maria.garcia@email.com', role: 'Administrador', telefono: '900000000', status: 'Activo' },
        { id: 5, name: 'María García', paternalName: 'Alvaro', maternalName: 'Gonzales', email: 'maria.garcia@email.com', role: 'Administrador', telefono: '900000000', status: 'Activo' },
        { id: 6, name: 'Carlos Ruiz', paternalName: 'Alvaro', maternalName: 'Gonzales', email: 'carlos.ruiz@email.com', role: 'Vendedor', telefono: '900000000', status: 'Inactivo' },
        { id: 7, name: 'Laura Lopez', paternalName: 'Alvaro', maternalName: 'Gonzales', email: 'laura.lopez@email.com', role: 'Vendedor', telefono: '900000000', status: 'Inactivo' },
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
    <div className="p-2 sm:p-4 md:p-6 bg-white min-h-screen text-white">
        <h1 className="text-2xl sm:text-3xl text-gray-800 font-bold mb-4 sm:mb-6">Gestión de Empleados</h1>

        <div className="bg-gray-800 p-4 rounded-lg shadow-lg transition-all duration-300">
        {/* Controles superiores */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mb-6">
            <div className="relative flex-1 w-full sm:w-auto">
                <input
                type="text"
                placeholder="Buscar empleado..."
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
                <SearchIcon />
                </div>
            </div>
            <select className="w-full sm:w-auto px-3 py-2 text-sm rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Filtrar por Rol</option>
                <option>Administrador</option>
                <option>Vendedor</option>
            </select>
            <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200">
                Agregar Nuevo Empleado
            </button>
        </div>

        {/* Tabla de empleados */}
        <div
            className={`${
            employees.length > 6 ? 'max-h-[420px] overflow-y-auto' : ''
            } overflow-x-auto`}
        >
            <table className="min-w-full divide-y divide-gray-700 text-sm">
                <thead className="bg-gray-700">
                    <tr className="sticky top-0 z-10 bg-gray-700">
                        <th className="px-4 py-3 text-left font-medium text-gray-300 uppercase tracking-wider">Nombre</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-300 uppercase tracking-wider">Correo</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-300 uppercase tracking-wider">Rol</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-300 uppercase tracking-wider">Teléfono</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-300 uppercase tracking-wider">Estado</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-300 uppercase tracking-wider">Acciones</th>
                    </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {employees.map((emp) => (
                        <tr key={emp.id}>
                            <td className="px-4 py-2 text-white">{emp.name} {emp.paternalName} {emp.maternalName}</td>
                            <td className="px-4 py-2 text-gray-300">{emp.email}</td>
                            <td className="px-4 py-2 text-gray-300">{emp.role}</td>
                            <td className="px-4 py-2 text-gray-300">{emp.telefono}</td>
                            <td className="px-4 py-2">
                                <span className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                                    emp.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                    {emp.status}
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <div className="flex items-center justify-center gap-2 h-full">
                                    <button onClick={() => handleEditClick(emp)} className="text-blue-500 hover:text-blue-600 flex items-center"><EditIcon /></button>
                                    <button className="text-red-500 hover:text-red-600 flex items-center"><DeleteIcon /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>

    {/* Sidebar de edición */}
    {editingEmployee && (
    <div className="mt-6 bg-gray-800 p-4 rounded-lg shadow-lg transition-all duration-300">
        <h2 className="text-xl font-bold mb-4 text-white">
        Editar Empleado: {editingEmployee.name}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
            <div>
                <label className="text-sm text-gray-300">Nombre</label>
                <input
                type="text"
                defaultValue={editingEmployee.name}
                className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 text-white rounded"
                />
            </div>
            <div>
                <label className="text-sm text-gray-300">Apellido Paterno</label>
                <input
                type="text"
                defaultValue={editingEmployee.paternalName}
                className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 text-white rounded"
                />
            </div>
            <div>
                <label className="text-sm text-gray-300">Apellido Materno</label>
                <input
                type="text"
                defaultValue={editingEmployee.maternalName}
                className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 text-white rounded"
                />
            </div>
        </div>
        <div className="flex flex-col gap-4">
            <div>
                <label className="text-sm text-gray-300">Correo</label>
                <input
                type="email"
                defaultValue={editingEmployee.email}
                className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 text-white rounded"
                />
            </div>
            <div>
                <label className="text-sm text-gray-300">Teléfono</label>
                <input
                type="text"
                defaultValue={editingEmployee.telefono}
                className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 text-white rounded"
                />
            </div>
            <div>
                <label className="text-sm text-gray-300">Rol</label>
                <input
                type="text"
                defaultValue={editingEmployee.role}
                className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 text-white rounded"
                disabled
                />
            </div>
            <div>
                <label className="text-sm text-gray-300 mb-1 block">Estado</label>
                <div className="flex gap-2">
                    <button
                        type="button"
                        className={`px-4 py-2 rounded ${editingEmployee.status === 'Activo' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300 border border-gray-600'}`}
                        onClick={() =>
                            setEditingEmployee({ ...editingEmployee, status: 'Activo' })
                        }
                    >
                        Activo
                    </button>
                    <button
                        type="button"
                        className={`px-4 py-2 rounded ${editingEmployee.status === 'Inactivo' ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300 border border-gray-600'}`}
                        onClick={() =>
                            setEditingEmployee({ ...editingEmployee, status: 'Inactivo' })
                        }
                    >
                        Inactivo
                    </button>
                </div>
            </div>
            </div>
            </div>



            {/* Botones */}
            <div className="flex justify-end mt-6 gap-3">
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
            Guardar Cambios
            </button>
            <button
            onClick={handleCancelEdit}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg"
            >
            Cancelar
            </button>
        </div>
    </div>
    )}
    </div>

    )
}

export default GrifoReportes

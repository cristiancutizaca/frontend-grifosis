'use client'

import React, { useState } from 'react'

const GrifoReportes: React.FC = () => {
    interface Employee {
        id: number;
        dni: string;
        name: string;
        paternalName: string;
        maternalName: string;
        role: string;
        birthDate: string; // formato ISO o YYYY-MM-DD
        address: string;
        telefono: string;
        email: string;
        hireDate: string;
        terminationDate: string | null;
        filePath?: string;
        files?: File[];
        status: 'Activo' | 'Inactivo';
        createdAt?: string;
        updatedAt?: string;
    }

    // Datos de ejemplo para los empleados
    const [employees, setEmployees] = useState<Employee[]>([
    { id: 1, dni: '12345678', name: 'Juan', paternalName: 'Pérez', maternalName: 'Gonzales', role: 'Vendedor', birthDate: '1990-05-10', address: 'Av. Siempre Viva 123', telefono: '900000001', email: 'juan.perez@email.com', hireDate: '2023-01-15', terminationDate: null, filePath: '', status: 'Activo', createdAt: '2023-01-15T08:00:00Z', updatedAt: '2023-01-15T08:00:00Z', },
    { id: 2, dni: '23456789', name: 'María', paternalName: 'García', maternalName: 'Fernández', role: 'Administrador', birthDate: '1985-09-20', address: 'Calle Falsa 456', telefono: '900000002', email: 'maria.garcia@email.com', hireDate: '2022-07-01', terminationDate: null, filePath: '', status: 'Activo', createdAt: '2022-07-01T08:00:00Z', updatedAt: '2022-07-01T08:00:00Z', },
    { id: 3, dni: '34567890', name: 'Carlos', paternalName: 'Ruiz', maternalName: 'López', role: 'Vendedor', birthDate: '1992-02-12', address: 'Jr. Los Laureles 789', telefono: '900000003', email: 'carlos.ruiz@email.com', hireDate: '2021-11-20', terminationDate: null, filePath: '', status: 'Inactivo', createdAt: '2021-11-20T08:00:00Z', updatedAt: '2021-11-20T08:00:00Z', },
    { id: 4, dni: '45678901', name: 'Laura', paternalName: 'Lopez', maternalName: 'Delgado', role: 'Vendedor', birthDate: '1993-07-18', address: 'Mz. A Lt. 12 San Pedro', telefono: '900000004', email: 'laura.lopez@email.com', hireDate: '2022-03-10', terminationDate: null, filePath: '', status: 'Inactivo', createdAt: '2022-03-10T08:00:00Z', updatedAt: '2022-03-10T08:00:00Z', }
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Columna izquierda */}
            <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold mb-1 text-white">
                Editar Empleado: {editingEmployee.name} {editingEmployee.paternalName} {editingEmployee.paternalName}
                </h2>
            </div>
            {/* Columna derecha */}
            <div className="flex flex-col gap-4">
                <div className="text-xs text-gray-400 text-right">
                    <p>
                    📅 <span className="font-semibold">Creado:</span>{' '}
                    {new Date(editingEmployee.createdAt ?? '').toLocaleString('es-PE', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                    </p>
                    <p>
                    🔁 <span className="font-semibold">Actualizado:</span>{' '}
                    {new Date(editingEmployee.updatedAt ?? '').toLocaleString('es-PE', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                    </p>
                </div>
            </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Columna izquierda */}
        <div className="flex flex-col gap-4">
            <div>
            <label className="text-sm text-gray-300">DNI</label>
            <input
                type="text"
                defaultValue={editingEmployee.dni}
                className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 text-white rounded"
            />
            </div>
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
            <div>
            <label className="text-sm text-gray-300">Fecha de Nacimiento</label>
            <input
                type="date"
                defaultValue={editingEmployee.birthDate}
                className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 text-white rounded"
            />
            </div>
            <div>
            <label className="text-sm text-gray-300">Dirección</label>
            <input
                type="text"
                defaultValue={editingEmployee.address}
                className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 text-white rounded"
            />
            </div>
        </div>

        {/* Columna derecha */}
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
            <label className="text-sm text-gray-300">Fecha de Contratación</label>
            <input
                type="date"
                defaultValue={editingEmployee.hireDate}
                className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 text-white rounded"
            />
            </div>
            <div>
            <label className="text-sm text-gray-300">Fecha de Terminación</label>
            <input
                type="date"
                defaultValue={editingEmployee.terminationDate || ''}
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
                className={`px-4 py-2 rounded ${editingEmployee.status === 'Activo'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-700 text-gray-300 border border-gray-600'
                    }`}
                onClick={() =>
                    setEditingEmployee({ ...editingEmployee, status: 'Activo' })
                }
                >
                Activo
                </button>
                <button
                type="button"
                className={`px-4 py-2 rounded ${editingEmployee.status === 'Inactivo'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-700 text-gray-300 border border-gray-600'
                    }`}
                onClick={() =>
                    setEditingEmployee({ ...editingEmployee, status: 'Inactivo' })
                }
                >
                Inactivo
                </button>
            </div>
            </div>
        </div>
        
        {/* Seleccionar archivos */}
        <div className="col-span-1 sm:col-span-2">
        <label className="text-sm text-gray-300">Documentos adjuntos (opcional)</label>
        <input
            type="file"
            multiple
            onChange={(e) => {
            const newFiles = Array.from(e.target.files ?? []);
            setEditingEmployee((prev) => ({
                ...prev!,
                files: [...(prev?.files ?? []), ...newFiles],
            }));
            }}
            className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 text-white rounded cursor-pointer"
        />
        </div>
        {/* Lista de archivos subidos */}
        {editingEmployee.files && editingEmployee.files.length > 0 && (
        <div className="col-span-1 sm:col-span-2 mt-2">
            <label className="text-sm text-gray-300 mb-1 block">Archivos Adjuntos:</label>
            <ul className="space-y-2">
            {editingEmployee.files.map((file, index) => (
                <li
                key={index}
                className="bg-gray-700 px-4 py-2 rounded flex items-center justify-between"
                >
                <span className="text-white text-sm truncate">{file.name}</span>
                <div className="flex items-center gap-2">
                    <a
                    href={URL.createObjectURL(file)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 text-sm hover:underline"
                    >
                    Ver
                    </a>
                    <button
                    onClick={() => {
                        const updatedFiles = [...(editingEmployee.files ?? [])];
                        updatedFiles.splice(index, 1);
                        setEditingEmployee({
                        ...editingEmployee,
                        files: updatedFiles,
                        });
                    }}
                    className="text-red-400 hover:text-red-600 text-sm"
                    >
                    Eliminar
                    </button>
                </div>
                </li>
            ))}
            </ul>
        </div>
        )}
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

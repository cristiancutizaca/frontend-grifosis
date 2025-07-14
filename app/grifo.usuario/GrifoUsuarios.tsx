
'use client'

import React, { useState } from 'react'
import EditUserModal from './modal/EditUserModal'

const GrifoUsuarios: React.FC = () => {
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

    // Datos de ejemplo para los empleados (necesarios para relacionar usuarios con empleados)
    const [employees, setEmployees] = useState<Employee[]>([
        { id: 1, dni: '12345678', name: 'Juan', paternalName: 'Pérez', maternalName: 'Gonzales', role: 'Vendedor', birthDate: '1990-05-10', address: 'Av. Siempre Viva 123', telefono: '900000001', email: 'juan.perez@email.com', hireDate: '2023-01-15', terminationDate: null, filePath: '', status: 'Activo', createdAt: '2023-01-15T08:00:00Z', updatedAt: '2023-01-15T08:00:00Z', },
        { id: 2, dni: '23456789', name: 'María', paternalName: 'García', maternalName: 'Fernández', role: 'Administrador', birthDate: '1985-09-20', address: 'Calle Falsa 456', telefono: '900000002', email: 'maria.garcia@email.com', hireDate: '2022-07-01', terminationDate: null, filePath: '', status: 'Activo', createdAt: '2022-07-01T08:00:00Z', updatedAt: '2022-07-01T08:00:00Z', },
        { id: 3, dni: '34567890', name: 'Carlos', paternalName: 'Ruiz', maternalName: 'López', role: 'Vendedor', birthDate: '1992-02-12', address: 'Jr. Los Laureles 789', telefono: '900000003', email: 'carlos.ruiz@email.com', hireDate: '2021-11-20', terminationDate: null, filePath: '', status: 'Inactivo', createdAt: '2021-11-20T08:00:00Z', updatedAt: '2021-11-20T08:00:00Z', },
        { id: 4, dni: '45678901', name: 'Laura', paternalName: 'Lopez', maternalName: 'Delgado', role: 'Vendedor', birthDate: '1993-07-18', address: 'Mz. A Lt. 12 San Pedro', telefono: '900000004', email: 'laura.lopez@email.com', hireDate: '2022-03-10', terminationDate: null, filePath: '', status: 'Inactivo', createdAt: '2022-03-10T08:00:00Z', updatedAt: '2022-03-10T08:00:00Z', }
    ]);

    // Estados para filtros
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    // Datos de ejemplo para los usuarios
    interface User {
        id: number;
        employee_id: number;
        user_name: string;
        password: string;
        role: string;
        status: 'Activo' | 'Inactivo';
        createdAt?: string;
        updatedAt?: string;
        permissionsObj?: {
            [modulo: string]: ('view' | 'create' | 'edit' | 'delete')[];
        };
    }

    const [users, setUsers] = useState<User[]>([
        { id: 1, employee_id: 1, user_name: 'JuanPérez', password: 'juan.perez', role: 'Administrador', status: 'Activo', createdAt: '2023-01-15T08:00:00Z', updatedAt: '2023-06-10T10:00:00Z' },
        { id: 2, employee_id: 2, user_name: 'MaríaGarcía', password: 'maria.garcia', role: 'Vendedor', status: 'Activo', createdAt: '2023-02-20T09:30:00Z', updatedAt: '2023-05-05T14:45:00Z' },
        { id: 3, employee_id: 3, user_name: 'CarlosRuiz', password: 'carlos.ruiz', role: 'Vendedor', status: 'Inactivo', createdAt: '2022-12-01T11:20:00Z', updatedAt: '2023-01-01T16:10:00Z' }
    ]);

    // Filtrar usuarios
    const filteredUsers = users.filter(user => {
        const relatedEmployee = employees.find(emp => emp.id === user.employee_id);
        const matchesSearch =
            user.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (relatedEmployee && (
                relatedEmployee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                relatedEmployee.paternalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                relatedEmployee.maternalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                relatedEmployee.dni.includes(searchTerm) ||
                relatedEmployee.email.toLowerCase().includes(searchTerm.toLowerCase())
            ));
        const matchesRole = roleFilter === '' || user.role === roleFilter;
        const matchesStatus = statusFilter === '' || user.status === statusFilter;
        return matchesSearch && matchesRole && matchesStatus;
    });

    const [editingUser, setEditingUser] = useState<User | null>(null);

    const handleEditUser = (user: User) => {
        setEditingUser(user);
    };

    const handleUpdateUser = (updatedUser: User) => {
        setUsers(users.map(u => 
            u.id === updatedUser.id ? updatedUser : u
        ));
    };

    const handleDeleteUser = (userId: number) => {
        // Implementar lógica de eliminación de usuario aquí
        setUsers((prev) => prev.filter((u) => u.id !== userId));
    };

    // Componente para el icono de búsqueda (simulado)
    const SearchIcon = () => (
        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
    );

    // Componente para el icono de lápiz (editar, simulado)
    const EditIcon = () => (
        <svg className="w-5 h-5 text-blue-400 hover:text-blue-300 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z"></path>
        </svg>
    );

    // Componente para el icono de papelera (eliminar, simulado)
    const DeleteIcon = () => (
        <svg className="w-5 h-5 text-red-400 hover:text-red-300 cursor-pointer ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
        </svg>
    );

    // Iconos adicionales
    const UsersIcon = () => (
        <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
        </svg>
    );

    const FilterIcon = () => (
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"></path>
        </svg>
    );

    return (
        <div className="p-3 sm:p-4 lg:p-6 bg-slate-900 min-h-screen space-y-4 lg:space-y-6">
            {/* Usuarios */}
            <div>
                {/* Header */}
                <div className="bg-slate-800 rounded-2xl p-4 lg:p-6 border border-slate-700">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                            <UsersIcon />
                        </div>
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold text-white">Gestión de Usuarios</h1>
                            <p className="text-sm text-slate-400">Administra los usuarios del sistema</p>
                        </div>
                    </div>
                    
                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                        <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
                            <div className="text-2xl font-bold text-white">{users.length}</div>
                            <div className="text-sm text-slate-400">Total Usuarios</div>
                        </div>
                        <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
                            <div className="text-2xl font-bold text-green-400">{users.filter(e => e.status === 'Activo').length}</div>
                            <div className="text-sm text-slate-400">Activos</div>
                        </div>
                        <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
                            <div className="text-2xl font-bold text-red-400">{users.filter(e => e.status === 'Inactivo').length}</div>
                            <div className="text-sm text-slate-400">Inactivos</div>
                        </div>
                        <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
                            <div className="text-2xl font-bold text-blue-400">{users.filter(e => e.role === 'Administrador').length}</div>
                            <div className="text-sm text-slate-400">Administradores</div>
                        </div>
                    </div>
                </div>        

                {/* Body Content */}
                <div className="bg-slate-800 rounded-2xl p-4 lg:p-6 border border-slate-700">
                    {/* Controles superiores */}
                    <div className="flex flex-col lg:flex-row items-center gap-3 mb-6">
                        {/* Barra de búsqueda */}
                        <div className="relative flex-1 w-full">
                            <input
                                type="text"
                                placeholder="Buscar usuario nombre"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 text-sm rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-slate-400"
                            />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                <SearchIcon />
                            </div>
                        </div>

                        {/* Filtros */}
                        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                            <div className="relative">
                                <select 
                                    value={roleFilter}
                                    onChange={(e) => setRoleFilter(e.target.value)}
                                    className="w-full sm:w-auto pl-10 pr-8 py-3 text-sm rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500 text-white appearance-none cursor-pointer min-w-[160px]"
                                >
                                    <option value="">Todos los Roles</option>
                                    <option value="Administrador">Administrador</option>
                                    <option value="Vendedor">Vendedor</option>
                                    <option value="Super Admin">Super Admin</option>
                                </select>
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                    <FilterIcon />
                                </div>
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </div>
                            </div>

                            <div className="relative">
                                <select 
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="w-full sm:w-auto pl-10 pr-8 py-3 text-sm rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500 text-white appearance-none cursor-pointer min-w-[160px]"
                                >
                                    <option value="">Todos los Estados</option>
                                    <option value="Activo">Activo</option>
                                    <option value="Inactivo">Inactivo</option>
                                </select>
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="3"></circle>
                                        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"></path>
                                    </svg>
                                </div>
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabla de usuarios */}
                    <div className={`${filteredUsers.length > 6 ? 'max-h-[500px] overflow-y-auto' : ''} overflow-x-auto rounded-lg border border-slate-600`}>
                        <table className="min-w-full divide-y divide-slate-600">
                            <thead className="bg-slate-700/50">
                                <tr className="sticky top-0 z-10 bg-slate-700/50 backdrop-blur">
                                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Usuario</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Correo</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Rol</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Estado</th>
                                    <th className="px-6 py-4 text-center text-xs font-medium text-slate-300 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="bg-slate-800 divide-y divide-slate-700">
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-slate-700/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
                                                        <span className="text-sm font-medium text-white">
                                                            {user.user_name.charAt(0)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-sm text-slate-400">{user.user_name}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-white">
                                                    {(() => {
                                                        const relatedEmployee = employees.find(emp => emp.id === user.employee_id);
                                                        return relatedEmployee ? relatedEmployee.email : 'Correo no encontrado';
                                                    })()}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                                                user.role === 'Administrador' 
                                                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
                                                    : user.role === 'Super Admin'
                                                    ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                                                    : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                            }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                                                user.status === 'Activo' 
                                                    ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                                                    : 'bg-red-500/20 text-red-300 border border-red-500/30'
                                            }`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-3">
                                                <button 
                                                    onClick={() => handleEditUser(user)} 
                                                    className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 transition-colors"
                                                    title="Editar usuario"
                                                >
                                                    <EditIcon />
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteUser(user.id)}
                                                    className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors"
                                                    title="Eliminar usuario"
                                                >
                                                    <DeleteIcon />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mensaje cuando no hay resultados */}
                    {filteredUsers.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-slate-400 text-lg mb-2">No se encontraron usuarios</div>
                            <div className="text-slate-500 text-sm">Prueba ajustando los filtros de búsqueda</div>
                        </div>
                    )}
                </div>

                {/* Modal Editar Usuario */}
                <EditUserModal 
                    user={editingUser}
                    onClose={() => setEditingUser(null)}
                    onSave={handleUpdateUser}
                />

            </div>
        </div>
    )
}

export default GrifoUsuarios



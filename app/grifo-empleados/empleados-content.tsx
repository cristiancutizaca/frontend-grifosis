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

    // Estados para filtros
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    // Estado para simular la edición de un empleado 
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

    // Estado para el modal de agregar empleado
    const [showAddModal, setShowAddModal] = useState(false);

    // Estado para nuevo empleado
    const [newEmployee, setNewEmployee] = useState<Partial<Employee>>({
        dni: '',
        name: '',
        paternalName: '',
        maternalName: '',
        role: 'Vendedor',
        birthDate: '',
        address: '',
        telefono: '',
        email: '',
        hireDate: new Date().toISOString().split('T')[0],
        terminationDate: null,
        status: 'Activo',
        files: []
    });

    const handleEditClick = (employee: Employee) => {
        setEditingEmployee(employee);
    };

    const handleCancelEdit = () => {
        setEditingEmployee(null);
    };

    const handleAddEmployee = () => {
        setShowAddModal(true);
    };

    const handleCancelAdd = () => {
        setShowAddModal(false);
        setNewEmployee({
            dni: '',
            name: '',
            paternalName: '',
            maternalName: '',
            role: 'Vendedor',
            birthDate: '',
            address: '',
            telefono: '',
            email: '',
            hireDate: new Date().toISOString().split('T')[0],
            terminationDate: null,
            status: 'Activo',
            files: []
        });
    };

    const handleSaveNewEmployee = () => {
        // Verificar que hay empleados para calcular el ID
        const id = employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;
        const now = new Date().toISOString();
        
        const employeeToAdd: Employee = {
            id,
            dni: newEmployee.dni || '',
            name: newEmployee.name || '',
            paternalName: newEmployee.paternalName || '',
            maternalName: newEmployee.maternalName || '',
            role: newEmployee.role || 'Vendedor',
            birthDate: newEmployee.birthDate || '',
            address: newEmployee.address || '',
            telefono: newEmployee.telefono || '',
            email: newEmployee.email || '',
            hireDate: newEmployee.hireDate || new Date().toISOString().split('T')[0],
            terminationDate: newEmployee.terminationDate ?? null,
            status: newEmployee.status || 'Activo',
            files: newEmployee.files || [],
            createdAt: now,
            updatedAt: now
        };

        setEmployees([...employees, employeeToAdd]);
        handleCancelAdd();
    };

    // Filtrar empleados
    const filteredEmployees = employees.filter(emp => {
        const matchesSearch = 
            emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.paternalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.maternalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.dni.includes(searchTerm) ||
            emp.email.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesRole = roleFilter === '' || emp.role === roleFilter;
        const matchesStatus = statusFilter === '' || emp.status === statusFilter;
        
        return matchesSearch && matchesRole && matchesStatus;
    });

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

    const PlusIcon = () => (
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
        </svg>
    );

    const FilterIcon = () => (
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"></path>
        </svg>
    );

    const CloseIcon = () => (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
    );

    return (
    <div className="p-3 sm:p-4 lg:p-6 bg-slate-900 min-h-screen space-y-4 lg:space-y-6">
        {/* Header */}
        <div className="bg-slate-800 rounded-2xl p-4 lg:p-6 border border-slate-700">
            <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <UsersIcon />
                </div>
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-white">Gestión de Empleados</h1>
                    <p className="text-sm text-slate-400">Administra el personal del grifo</p>
                </div>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
                    <div className="text-2xl font-bold text-white">{employees.length}</div>
                    <div className="text-sm text-slate-400">Total Empleados</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
                    <div className="text-2xl font-bold text-green-400">{employees.filter(e => e.status === 'Activo').length}</div>
                    <div className="text-sm text-slate-400">Activos</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
                    <div className="text-2xl font-bold text-red-400">{employees.filter(e => e.status === 'Inactivo').length}</div>
                    <div className="text-sm text-slate-400">Inactivos</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
                    <div className="text-2xl font-bold text-blue-400">{employees.filter(e => e.role === 'Administrador').length}</div>
                    <div className="text-sm text-slate-400">Administradores</div>
                </div>
            </div>
        </div>

        {/* Main Content */}
        <div className="bg-slate-800 rounded-2xl p-4 lg:p-6 border border-slate-700">
            {/* Controles superiores */}
            <div className="flex flex-col lg:flex-row items-center gap-3 mb-6">
                {/* Barra de búsqueda */}
                <div className="relative flex-1 w-full">
                    <input
                        type="text"
                        placeholder="Buscar empleado por nombre, DNI o email..."
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

                {/* Botón Agregar */}
                <button 
                    onClick={handleAddEmployee}
                    className="group relative w-full sm:w-auto bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3.5 px-8 rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl hover:shadow-orange-500/30 min-w-[200px] transform hover:scale-105 active:scale-95"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                            </svg>
                        </div>
                        <span className="text-sm font-bold tracking-wide">Agregar Empleado</span>
                    </div>
                    
                    {/* Efecto de brillo */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300"></div>
                    
                    {/* Borde animado */}
                    <div className="absolute inset-0 rounded-xl border border-orange-300/20 group-hover:border-orange-300/40 transition-colors"></div>
                </button>
            </div>

            {/* Tabla de empleados */}
            <div className={`${filteredEmployees.length > 6 ? 'max-h-[500px] overflow-y-auto' : ''} overflow-x-auto rounded-lg border border-slate-600`}>
                <table className="min-w-full divide-y divide-slate-600">
                    <thead className="bg-slate-700/50">
                        <tr className="sticky top-0 z-10 bg-slate-700/50 backdrop-blur">
                            <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Empleado</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Contacto</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Rol</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Estado</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Fecha Ingreso</th>
                            <th className="px-6 py-4 text-center text-xs font-medium text-slate-300 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-slate-800 divide-y divide-slate-700">
                        {filteredEmployees.map((emp) => (
                            <tr key={emp.id} className="hover:bg-slate-700/30 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
                                                <span className="text-sm font-medium text-white">
                                                    {emp.name.charAt(0)}{emp.paternalName.charAt(0)}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-white">
                                                {emp.name} {emp.paternalName} {emp.maternalName}
                                            </div>
                                            <div className="text-sm text-slate-400">DNI: {emp.dni}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-white">{emp.email}</div>
                                    <div className="text-sm text-slate-400">{emp.telefono}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                                        emp.role === 'Administrador' 
                                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
                                            : emp.role === 'Super Admin'
                                            ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                                            : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                    }`}>
                                        {emp.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                                        emp.status === 'Activo' 
                                            ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                                            : 'bg-red-500/20 text-red-300 border border-red-500/30'
                                    }`}>
                                        {emp.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-300">
                                    {new Date(emp.hireDate).toLocaleDateString('es-PE')}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-center gap-3">
                                        <button 
                                            onClick={() => handleEditClick(emp)} 
                                            className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 transition-colors"
                                            title="Editar empleado"
                                        >
                                            <EditIcon />
                                        </button>
                                        <button 
                                            className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors"
                                            title="Eliminar empleado"
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
            {filteredEmployees.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-slate-400 text-lg mb-2">No se encontraron empleados</div>
                    <div className="text-slate-500 text-sm">Prueba ajustando los filtros de búsqueda</div>
                </div>
            )}
        </div>

        {/* Modal Agregar Empleado */}
        {showAddModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-slate-800 rounded-2xl border border-slate-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                    {/* Header del Modal */}
                    <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                                <PlusIcon />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">Agregar Nuevo Empleado</h2>
                                <p className="text-sm text-slate-400">Complete la información del nuevo empleado</p>
                            </div>
                        </div>
                        <button 
                            onClick={handleCancelAdd}
                            className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white"
                        >
                            <CloseIcon />
                        </button>
                    </div>

                    {/* Contenido del Modal */}
                    <div className="p-6">
                        {/* Formulario */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Columna izquierda */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">DNI *</label>
                                    <input
                                        type="text"
                                        value={newEmployee.dni}
                                        onChange={(e) => setNewEmployee({...newEmployee, dni: e.target.value})}
                                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        placeholder="Ingrese el DNI"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Nombre *</label>
                                    <input
                                        type="text"
                                        value={newEmployee.name}
                                        onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        placeholder="Ingrese el nombre"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Apellido Paterno *</label>
                                    <input
                                        type="text"
                                        value={newEmployee.paternalName}
                                        onChange={(e) => setNewEmployee({...newEmployee, paternalName: e.target.value})}
                                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        placeholder="Ingrese el apellido paterno"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Apellido Materno *</label>
                                    <input
                                        type="text"
                                        value={newEmployee.maternalName}
                                        onChange={(e) => setNewEmployee({...newEmployee, maternalName: e.target.value})}
                                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        placeholder="Ingrese el apellido materno"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Fecha de Nacimiento *</label>
                                    <input
                                        type="date"
                                        value={newEmployee.birthDate}
                                        onChange={(e) => setNewEmployee({...newEmployee, birthDate: e.target.value})}
                                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Dirección *</label>
                                    <textarea
                                        value={newEmployee.address}
                                        onChange={(e) => setNewEmployee({...newEmployee, address: e.target.value})}
                                        rows={3}
                                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                                        placeholder="Ingrese la dirección completa"
                                    />
                                </div>
                            </div>

                            {/* Columna derecha */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Correo Electrónico *</label>
                                    <input
                                        type="email"
                                        value={newEmployee.email}
                                        onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        placeholder="ejemplo@correo.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Teléfono *</label>
                                    <input
                                        type="text"
                                        value={newEmployee.telefono}
                                        onChange={(e) => setNewEmployee({...newEmployee, telefono: e.target.value})}
                                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        placeholder="999 000 000"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Fecha de Contratación *</label>
                                    <input
                                        type="date"
                                        value={newEmployee.hireDate}
                                        onChange={(e) => setNewEmployee({...newEmployee, hireDate: e.target.value})}
                                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-3">Rol *</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        <button
                                            type="button"
                                            className={`group relative p-4 rounded-xl transition-all duration-200 border-2 ${
                                                newEmployee.role === 'Vendedor'
                                                    ? 'border-blue-500 bg-blue-500/20 shadow-lg shadow-blue-500/25'
                                                    : 'border-slate-600 bg-slate-700/50 hover:border-blue-400 hover:bg-blue-500/10'
                                            }`}
                                            onClick={() => setNewEmployee({...newEmployee, role: 'Vendedor'})}
                                        >
                                            <div className="flex flex-col items-center gap-2">
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                                    newEmployee.role === 'Vendedor' 
                                                        ? 'bg-blue-500 text-white' 
                                                        : 'bg-slate-600 text-slate-300 group-hover:bg-blue-500 group-hover:text-white'
                                                } transition-colors`}>
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                                    </svg>
                                                </div>
                                                <div className="text-center">
                                                    <div className={`text-sm font-semibold ${
                                                        newEmployee.role === 'Vendedor' ? 'text-blue-300' : 'text-slate-300'
                                                    }`}>
                                                        Vendedor
                                                    </div>
                                                    <div className="text-xs text-slate-400 mt-1">Ventas y atención</div>
                                                </div>
                                            </div>
                                            {newEmployee.role === 'Vendedor' && (
                                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                                    </svg>
                                                </div>
                                            )}
                                        </button>

                                        <button
                                            type="button"
                                            className={`group relative p-4 rounded-xl transition-all duration-200 border-2 ${
                                                newEmployee.role === 'Administrador'
                                                    ? 'border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/25'
                                                    : 'border-slate-600 bg-slate-700/50 hover:border-purple-400 hover:bg-purple-500/10'
                                            }`}
                                            onClick={() => setNewEmployee({...newEmployee, role: 'Administrador'})}
                                        >
                                            <div className="flex flex-col items-center gap-2">
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                                    newEmployee.role === 'Administrador' 
                                                        ? 'bg-purple-500 text-white' 
                                                        : 'bg-slate-600 text-slate-300 group-hover:bg-purple-500 group-hover:text-white'
                                                } transition-colors`}>
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                                    </svg>
                                                </div>
                                                <div className="text-center">
                                                    <div className={`text-sm font-semibold ${
                                                        newEmployee.role === 'Administrador' ? 'text-purple-300' : 'text-slate-300'
                                                    }`}>
                                                        Administrador
                                                    </div>
                                                    <div className="text-xs text-slate-400 mt-1">Gestión total</div>
                                                </div>
                                            </div>
                                            {newEmployee.role === 'Administrador' && (
                                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                                    </svg>
                                                </div>
                                            )}
                                        </button>

                                        <button
                                            type="button"
                                            className={`group relative p-4 rounded-xl transition-all duration-200 border-2 ${
                                                newEmployee.role === 'Super Admin'
                                                    ? 'border-yellow-500 bg-yellow-500/20 shadow-lg shadow-yellow-500/25'
                                                    : 'border-slate-600 bg-slate-700/50 hover:border-yellow-400 hover:bg-yellow-500/10'
                                            }`}
                                            onClick={() => setNewEmployee({...newEmployee, role: 'Super Admin'})}
                                        >
                                            <div className="flex flex-col items-center gap-2">
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                                    newEmployee.role === 'Super Admin' 
                                                        ? 'bg-yellow-500 text-white' 
                                                        : 'bg-slate-600 text-slate-300 group-hover:bg-yellow-500 group-hover:text-white'
                                                } transition-colors`}>
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                                                    </svg>
                                                </div>
                                                <div className="text-center">
                                                    <div className={`text-sm font-semibold ${
                                                        newEmployee.role === 'Super Admin' ? 'text-yellow-300' : 'text-slate-300'
                                                    }`}>
                                                        Super Admin
                                                    </div>
                                                    <div className="text-xs text-slate-400 mt-1">Control total</div>
                                                </div>
                                            </div>
                                            {newEmployee.role === 'Super Admin' && (
                                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                                    </svg>
                                                </div>
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-3">Estado *</label>
                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                                                newEmployee.status === 'Activo'
                                                    ? 'bg-green-500 text-white shadow-lg'
                                                    : 'bg-slate-700 text-slate-300 border border-slate-600 hover:bg-slate-600'
                                            }`}
                                            onClick={() => setNewEmployee({...newEmployee, status: 'Activo'})}
                                        >
                                            Activo
                                        </button>
                                        <button
                                            type="button"
                                            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                                                newEmployee.status === 'Inactivo'
                                                    ? 'bg-red-500 text-white shadow-lg'
                                                    : 'bg-slate-700 text-slate-300 border border-slate-600 hover:bg-slate-600'
                                            }`}
                                            onClick={() => setNewEmployee({...newEmployee, status: 'Inactivo'})}
                                        >
                                            Inactivo
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sección de archivos */}
                        <div className="mt-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Documentos Adjuntos (Opcional)</label>
                                <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center bg-slate-700/30">
                                    <input
                                        type="file"
                                        multiple
                                        onChange={(e) => {
                                            const files = Array.from(e.target.files ?? []);
                                            setNewEmployee({...newEmployee, files: [...(newEmployee.files ?? []), ...files]});
                                        }}
                                        className="hidden"
                                        id="new-file-upload"
                                    />
                                    <label htmlFor="new-file-upload" className="cursor-pointer">
                                        <div className="text-slate-400 mb-2">
                                            <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <div className="text-sm text-slate-300">
                                            <span className="font-medium text-orange-400">Haz clic para subir</span> o arrastra archivos aquí
                                        </div>
                                        <div className="text-xs text-slate-500 mt-1">PDF, DOC, DOCX hasta 10MB</div>
                                    </label>
                                </div>
                            </div>

                            {/* Lista de archivos */}
                            {newEmployee.files && newEmployee.files.length > 0 && (
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-300">Archivos Adjuntos:</label>
                                    <div className="space-y-2">
                                        {newEmployee.files.map((file, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between bg-slate-700/50 p-3 rounded-lg border border-slate-600"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-blue-500/20 rounded flex items-center justify-center">
                                                        <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    <span className="text-white text-sm truncate max-w-xs">{file.name}</span>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        const updatedFiles = [...(newEmployee.files ?? [])];
                                                        updatedFiles.splice(index, 1);
                                                        setNewEmployee({...newEmployee, files: updatedFiles});
                                                    }}
                                                    className="text-red-400 hover:text-red-300 text-sm font-medium"
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Botones de acción */}
                        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8 pt-6 border-t border-slate-700">
                            <button 
                                onClick={handleCancelAdd}
                                className="px-6 py-3 bg-slate-600 hover:bg-slate-500 text-white font-medium rounded-lg transition-colors"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={handleSaveNewEmployee}
                                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium rounded-lg transition-all shadow-lg"
                            >
                                Guardar Empleado
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* Sidebar de edición */}
        {editingEmployee && (
        <div className="bg-slate-800 rounded-2xl p-4 lg:p-6 border border-slate-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Header del formulario */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                            <span className="text-sm font-medium text-white">
                                {editingEmployee.name.charAt(0)}{editingEmployee.paternalName.charAt(0)}
                            </span>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">
                                Editar Empleado
                            </h2>
                            <p className="text-sm text-slate-400">
                                {editingEmployee.name} {editingEmployee.paternalName} {editingEmployee.maternalName}
                            </p>
                        </div>
                    </div>
                </div>
                {/* Información de fechas */}
                <div className="flex flex-col gap-4">
                    <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600">
                        <div className="text-xs text-slate-400 space-y-1">
                            <p className="flex items-center gap-2">
                                📅 <span className="font-medium">Creado:</span>
                                <span className="text-slate-300">
                                    {new Date(editingEmployee.createdAt ?? '').toLocaleString('es-PE', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </span>
                            </p>
                            <p className="flex items-center gap-2">
                                🔄 <span className="font-medium">Actualizado:</span>
                                <span className="text-slate-300">
                                    {new Date(editingEmployee.updatedAt ?? '').toLocaleString('es-PE', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Formulario */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                {/* Columna izquierda */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">DNI</label>
                        <input
                            type="text"
                            defaultValue={editingEmployee.dni}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Nombre</label>
                        <input
                            type="text"
                            defaultValue={editingEmployee.name}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Apellido Paterno</label>
                        <input
                            type="text"
                            defaultValue={editingEmployee.paternalName}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Apellido Materno</label>
                        <input
                            type="text"
                            defaultValue={editingEmployee.maternalName}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Fecha de Nacimiento</label>
                        <input
                            type="date"
                            defaultValue={editingEmployee.birthDate}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Dirección</label>
                        <textarea
                            defaultValue={editingEmployee.address}
                            rows={3}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                        />
                    </div>
                </div>

                {/* Columna derecha */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Correo Electrónico</label>
                        <input
                            type="email"
                            defaultValue={editingEmployee.email}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Teléfono</label>
                        <input
                            type="text"
                            defaultValue={editingEmployee.telefono}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Fecha de Contratación</label>
                        <input
                            type="date"
                            defaultValue={editingEmployee.hireDate}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Fecha de Terminación (Opcional)</label>
                        <input
                            type="date"
                            defaultValue={editingEmployee.terminationDate || ''}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Rol</label>
                        <select
                            defaultValue={editingEmployee.role}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        >
                            <option>Administrador</option>
                            <option>Vendedor</option>
                            <option>Super Admin</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-3">Estado</label>
                        <div className="flex gap-3">
                            <button
                                type="button"
                                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                                    editingEmployee.status === 'Activo'
                                        ? 'bg-green-500 text-white shadow-lg'
                                        : 'bg-slate-700 text-slate-300 border border-slate-600 hover:bg-slate-600'
                                }`}
                                onClick={() =>
                                    setEditingEmployee({ ...editingEmployee, status: 'Activo' })
                                }
                            >
                                Activo
                            </button>
                            <button
                                type="button"
                                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                                    editingEmployee.status === 'Inactivo'
                                        ? 'bg-red-500 text-white shadow-lg'
                                        : 'bg-slate-700 text-slate-300 border border-slate-600 hover:bg-slate-600'
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
            </div>
            
            {/* Sección de archivos */}
            <div className="mt-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Documentos Adjuntos (Opcional)</label>
                    <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center bg-slate-700/30">
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
                            className="hidden"
                            id="file-upload"
                        />
                        <label htmlFor="file-upload" className="cursor-pointer">
                            <div className="text-slate-400 mb-2">
                                <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div className="text-sm text-slate-300">
                                <span className="font-medium text-orange-400">Haz clic para subir</span> o arrastra archivos aquí
                            </div>
                            <div className="text-xs text-slate-500 mt-1">PDF, DOC, DOCX hasta 10MB</div>
                        </label>
                    </div>
                </div>

                {/* Lista de archivos */}
                {editingEmployee.files && editingEmployee.files.length > 0 && (
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-300">Archivos Adjuntos:</label>
                        <div className="space-y-2">
                            {editingEmployee.files.map((file, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between bg-slate-700/50 p-3 rounded-lg border border-slate-600"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-blue-500/20 rounded flex items-center justify-center">
                                            <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-white text-sm truncate max-w-xs">{file.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <a
                                            href={URL.createObjectURL(file)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-400 hover:text-blue-300 text-sm font-medium"
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
                                            className="text-red-400 hover:text-red-300 text-sm font-medium"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8 pt-6 border-t border-slate-700">
                <button 
                    onClick={handleCancelEdit}
                    className="px-6 py-3 bg-slate-600 hover:bg-slate-500 text-white font-medium rounded-lg transition-colors"
                >
                    Cancelar
                </button>
                <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors shadow-lg">
                    Guardar Cambios
                </button>
            </div>
        </div>
        )}
    </div>
    )
}

export default GrifoReportes

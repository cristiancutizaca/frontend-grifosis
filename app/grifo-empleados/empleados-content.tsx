'use client'
import userService from '../../src/services/userService';

import React, { useState, useEffect } from 'react';
import AddEmployeeModal from './modal/AddEmployeeModal'
import EditEmployeeModal from './modal/EditEmployeeModal'

const GrifoEmpleados: React.FC = () => {
    interface Employee {
        user_id: number;
        employee_id?: number;
        username: string;
        role: string;
        permissions?: string;
        is_active: boolean;
        created_at: string;
        updated_at: string;
        full_name?: string;
        // Campos adicionales para compatibilidad con la UI existente
        id: number;
        dni: string;
        name: string;
        paternalName: string;
        maternalName: string;
        birthDate: string;
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

    // Estado para los empleados (solo vendedores)
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                setLoading(true);
                // Obtener solo usuarios con rol 'seller'
                const data = await userService.getUsersByRole('seller');
                
                // Mapear los datos del backend a la estructura esperada por la UI
                const mappedEmployees = data.map(user => ({
                    // Datos del backend
                    user_id: user.user_id,
                    employee_id: user.employee_id,
                    username: user.username,
                    role: user.role,
                    permissions: user.permissions,
                    is_active: user.is_active,
                    created_at: user.created_at,
                    updated_at: user.updated_at,
                    full_name: user.full_name,
                    
                    // Mapeo para compatibilidad con la UI existente
                    id: user.user_id,
                    dni: user.employee_id?.toString() || '',
                    name: user.full_name?.split(' ')[0] || user.username,
                    paternalName: user.full_name?.split(' ')[1] || '',
                    maternalName: user.full_name?.split(' ')[2] || '',
                    birthDate: '',
                    address: '',
                    telefono: '',
                    email: user.username, // Asumiendo que username puede ser email
                    hireDate: user.created_at,
                    terminationDate: null,
                    status: user.is_active ? 'Activo' : 'Inactivo' as 'Activo' | 'Inactivo',
                    createdAt: user.created_at,
                    updatedAt: user.updated_at
                }));
                
                setEmployees(mappedEmployees);
            } catch (error) {
                console.error("Error al obtener empleados:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEmployees();
    }, []);

    // Estados para filtros
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    // Estado para simular la edición de un empleado 
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

    // Estado para el modal de agregar empleado
    const [showAddModal, setShowAddModal] = useState(false);

    const handleEditClick = (employee: Employee) => {
        setEditingEmployee(employee);
    };

    const handleCancelEdit = () => {
        setEditingEmployee(null);
    };

    const handleAddEmployee = () => {
        setShowAddModal(true);
    };

    const handleSaveEmployee = async (employee: Employee) => {
        try {
            // Crear nuevo usuario con rol 'seller'
            const newUserData = {
                username: employee.email || employee.username,
                password: 'defaultPassword123', // Deberías manejar esto de forma más segura
                role: 'seller',
                full_name: `${employee.name} ${employee.paternalName} ${employee.maternalName}`.trim(),
                employee_id: employee.employee_id
            };
            
            const createdUser = await userService.create(newUserData);
            
            // Mapear el usuario creado a la estructura de empleado
            const mappedEmployee = {
                ...employee,
                user_id: createdUser.user_id,
                id: createdUser.user_id,
                created_at: createdUser.created_at,
                updated_at: createdUser.updated_at
            };
            
            setEmployees([...employees, mappedEmployee]);
        } catch (error) {
            console.error("Error al crear empleado:", error);
        }
    };

    const handleUpdateEmployee = async (updatedEmployee: Employee) => {
        try {
            // Actualizar usuario en el backend
            const updateData = {
                username: updatedEmployee.email || updatedEmployee.username,
                full_name: `${updatedEmployee.name} ${updatedEmployee.paternalName} ${updatedEmployee.maternalName}`.trim(),
                employee_id: updatedEmployee.employee_id,
                is_active: updatedEmployee.status === 'Activo'
            };
            
            await userService.update(updatedEmployee.user_id, updateData);
            
            setEmployees(employees.map((emp: Employee) =>
                emp.id === updatedEmployee.id ? updatedEmployee : emp
            ));
        } catch (error) {
            console.error("Error al actualizar empleado:", error);
        }
    };

    const handleDeleteEmployee = async (employeeId: number) => {
        try {
            const employee = employees.find(emp => emp.id === employeeId);
            if (employee) {
                await userService.delete(employee.user_id);
                setEmployees(employees.filter(emp => emp.id !== employeeId));
            }
        } catch (error) {
            console.error("Error al eliminar empleado:", error);
        }
    };

    const handleToggleStatus = async (employeeId: number) => {
        try {
            const employee = employees.find(emp => emp.id === employeeId);
            if (employee) {
                if (employee.status === 'Activo') {
                    await userService.deactivate(employee.user_id);
                } else {
                    await userService.activate(employee.user_id);
                }
                
                setEmployees(employees.map(emp => 
                    emp.id === employeeId 
                        ? { ...emp, status: emp.status === 'Activo' ? 'Inactivo' : 'Activo' as 'Activo' | 'Inactivo' }
                        : emp
                ));
            }
        } catch (error) {
            console.error("Error al cambiar estado del empleado:", error);
        }
    };

    // Filtrar empleados (solo vendedores)
    const filteredEmployees = employees.filter((emp: Employee) => {
        const matchesSearch =
            emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.paternalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.maternalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.dni.includes(searchTerm) ||
            emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.username.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === '' || emp.status === statusFilter;

        return matchesSearch && matchesStatus;
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

    const FilterIcon = () => (
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"></path>
        </svg>
    );

    if (loading) {
        return (
            <div className="p-3 sm:p-4 lg:p-6 bg-slate-900 min-h-screen flex items-center justify-center">
                <div className="text-white text-lg">Cargando empleados...</div>
            </div>
        );
    }

    return (
        <div className="p-3 sm:p-4 lg:p-6 bg-slate-900 min-h-screen space-y-4 lg:space-y-6">
            {/* Empleados */}
            <div>
                {/* Header */}
                <div className="bg-slate-800 rounded-2xl p-4 lg:p-6 border border-slate-700">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                            <UsersIcon />
                        </div>
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold text-white">Gestión de Empleados</h1>
                            <p className="text-sm text-slate-400">Administra los vendedores del grifo</p>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                        <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
                            <div className="text-2xl font-bold text-white">{employees.length}</div>
                            <div className="text-sm text-slate-400">Total Empleados</div>
                        </div>
                        <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
                            <div className="text-2xl font-bold text-green-400">{employees.filter((e: Employee) => e.status === 'Activo').length}</div>
                            <div className="text-sm text-slate-400">Activos</div>
                        </div>
                        <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
                            <div className="text-2xl font-bold text-red-400">{employees.filter((e: Employee) => e.status === 'Inactivo').length}</div>
                            <div className="text-sm text-slate-400">Inactivos</div>
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
                                placeholder="Buscar empleado por nombre, DNI, email o usuario..."
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
                                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Usuario</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">ID Empleado</th>
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
                                                            {emp.name.charAt(0)}{emp.paternalName.charAt(0) || emp.username.charAt(0)}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-white">
                                                        {emp.full_name || `${emp.name} ${emp.paternalName} ${emp.maternalName}`.trim() || emp.username}
                                                    </div>
                                                    <div className="text-sm text-slate-400">Vendedor</div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="text-sm text-white">{emp.username}</div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="text-sm text-slate-400">{emp.employee_id || 'N/A'}</div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${emp.status === 'Activo'
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
                                                    onClick={() => handleToggleStatus(emp.id)}
                                                    className={`p-2 rounded-lg transition-colors ${emp.status === 'Activo' 
                                                        ? 'bg-red-500/20 hover:bg-red-500/30' 
                                                        : 'bg-green-500/20 hover:bg-green-500/30'
                                                    }`}
                                                    title={emp.status === 'Activo' ? 'Desactivar empleado' : 'Activar empleado'}
                                                >
                                                    {emp.status === 'Activo' ? <DeleteIcon /> : 
                                                        <svg className="w-5 h-5 text-green-400 hover:text-green-300 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                        </svg>
                                                    }
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
                <AddEmployeeModal
                    isOpen={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    onSave={handleSaveEmployee}
                    employees={employees}
                />

                {/* Modal Editar Empleado */}
                {editingEmployee && (
                    <EditEmployeeModal
                        employee={editingEmployee}
                        onClose={handleCancelEdit}
                        onSave={handleUpdateEmployee}
                    />
                )}

            </div>
        </div>
    )
}

export default GrifoEmpleados


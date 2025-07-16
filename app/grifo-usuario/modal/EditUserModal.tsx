'use client'

import React, { useState, useEffect } from 'react'

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

interface EditUserModalProps {
    user: User | null;
    onClose: () => void;
    onSave: (user: User) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ user, onClose, onSave }) => {
    const [editingUser, setEditingUser] = useState<User | null>(null);

    useEffect(() => {
        if (user) {
            setEditingUser({ ...user });
        }
    }, [user]);

    const handleSave = () => {
        if (!editingUser) return;
        
        const updatedUser = {
            ...editingUser,
            updatedAt: new Date().toISOString()
        };
        
        onSave(updatedUser);
        onClose();
    };

    const handleClose = () => {
        setEditingUser(null);
        onClose();
    };

    if (!user || !editingUser) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl border border-slate-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                {/* Header del Modal */}
                <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">Editar Usuario</h2>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                {/* Contenido del Modal */}
                <div className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Usuario */}
                        <div>
                            <label className="text-sm text-gray-300">Usuario</label>
                            <input
                                type="text"
                                value={editingUser.user_name}
                                onChange={(e) => setEditingUser({ ...editingUser, user_name: e.target.value })}
                                className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 text-white rounded"
                            />
                        </div>
                        {/* Contraseña */}
                        <div>
                            <label className="text-sm text-gray-300">Contraseña</label>
                            <input
                                type="text"
                                value={editingUser.password}
                                onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
                                className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 text-white rounded"
                            />
                        </div>
                        {/* Rol */}
                        <div>
                            <label className="text-sm text-gray-300">Rol</label>
                            <select
                                value={editingUser.role}
                                onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                                className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 text-white rounded"
                            >
                                <option value="Administrador">Administrador</option>
                                <option value="Vendedor">Vendedor</option>
                                <option value="Super Admin">Super Admin</option>
                            </select>
                        </div>
                        {/* Estado */}
                        <div>
                            <label className="text-sm text-gray-300 mb-1 block">Estado</label>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    className={`px-4 py-2 rounded ${
                                        editingUser.status === 'Activo'
                                            ? 'bg-green-600 text-white'
                                            : 'bg-gray-700 text-gray-300 border border-gray-600'
                                    }`}
                                    onClick={() => setEditingUser({ ...editingUser, status: 'Activo' })}
                                >
                                    Activo
                                </button>
                                <button
                                    type="button"
                                    className={`px-4 py-2 rounded ${
                                        editingUser.status === 'Inactivo'
                                            ? 'bg-red-600 text-white'
                                            : 'bg-gray-700 text-gray-300 border border-gray-600'
                                    }`}
                                    onClick={() => setEditingUser({ ...editingUser, status: 'Inactivo' })}
                                >
                                    Inactivo
                                </button>
                            </div>
                        </div>
                        {/* Permisos detallados por módulo */}
                        <div className="sm:col-span-2 mt-4">
                            <h3 className="text-white font-semibold text-sm mb-2">Permisos por módulo</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    'Dashboard',
                                    'Clientes',
                                    'Ventas',
                                    'Créditos',
                                    'Inventario',
                                    'Reportes',
                                    'Empleados',
                                    'Turnos',
                                    'Configuración',
                                    'Super Admin',
                                ].map((modulo) => {
                                    const permisos = editingUser.permissionsObj?.[modulo] || [];
                                    const allPerms: ('view' | 'create' | 'edit' | 'delete')[] = [
                                        'view',
                                        'create',
                                        'edit',
                                        'delete',
                                    ];
                                    return (
                                        <div key={modulo} className="flex flex-col mb-2">
                                            <label className="text-gray-300 text-sm font-medium mb-1">
                                                {modulo}
                                            </label>
                                            <div className="flex gap-2 flex-wrap">
                                                {allPerms.map((perm) => (
                                                    <button
                                                        key={perm}
                                                        type="button"
                                                        className={`px-3 py-1 rounded text-xs font-semibold border transition
                                                            ${
                                                                permisos.includes(perm)
                                                                    ? 'bg-blue-600 text-white border-blue-700'
                                                                    : 'bg-gray-700 text-gray-300 border-gray-600'
                                                            }
                                                        `}
                                                        onClick={() => {
                                                            setEditingUser((prev) => {
                                                                if (!prev) return prev;
                                                                const current = prev.permissionsObj?.[modulo] || [];
                                                                const updated = current.includes(perm)
                                                                    ? current.filter((p) => p !== perm)
                                                                    : [...current, perm];
                                                                return {
                                                                    ...prev,
                                                                    permissionsObj: {
                                                                        ...prev.permissionsObj,
                                                                        [modulo]: updated,
                                                                    },
                                                                };
                                                            });
                                                        }}
                                                    >
                                                        {perm === 'view'
                                                            ? 'Ver'
                                                            : perm === 'create'
                                                            ? 'Crear'
                                                            : perm === 'edit'
                                                            ? 'Editar'
                                                            : 'Eliminar'}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        {/* Fechas */}
                        <div className="sm:col-span-2 flex flex-col gap-1 mt-2">
                            <span className="text-xs text-gray-400">
                                📅 <span className="font-semibold">Creado:</span>{' '}
                                {editingUser.createdAt
                                    ? new Date(editingUser.createdAt).toLocaleString('es-PE', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        })
                                    : 'N/A'}
                            </span>
                            <span className="text-xs text-gray-400">
                                🔁 <span className="font-semibold">Actualizado:</span>{' '}
                                {editingUser.updatedAt
                                    ? new Date(editingUser.updatedAt).toLocaleString('es-PE', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        })
                                    : 'N/A'}
                            </span>
                        </div>
                    </div>
                    {/* Botones */}
                    <div className="mt-6 flex justify-end gap-2">
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Guardar
                        </button>
                        <button
                            onClick={handleClose}
                            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditUserModal;


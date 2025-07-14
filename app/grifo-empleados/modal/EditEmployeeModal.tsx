'use client'

import React, { useState, useEffect } from 'react'

interface Employee {
    id: number;
    dni: string;
    name: string;
    paternalName: string;
    maternalName: string;
    role: string;
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

interface EditEmployeeModalProps {
    employee: Employee | null;
    onClose: () => void;
    onSave: (employee: Employee) => void;
}

const EditEmployeeModal: React.FC<EditEmployeeModalProps> = ({ employee, onClose, onSave }) => {
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

    useEffect(() => {
        if (employee) {
            setEditingEmployee({ ...employee });
        }
    }, [employee]);

    const handleSave = () => {
        if (!editingEmployee) return;
        
        const updatedEmployee = {
            ...editingEmployee,
            updatedAt: new Date().toISOString()
        };
        
        onSave(updatedEmployee);
        onClose();
    };

    const handleClose = () => {
        setEditingEmployee(null);
        onClose();
    };

    if (!employee || !editingEmployee) return null;

    return (
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
                            value={editingEmployee.dni}
                            onChange={(e) => setEditingEmployee({...editingEmployee, dni: e.target.value})}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Nombre</label>
                        <input
                            type="text"
                            value={editingEmployee.name}
                            onChange={(e) => setEditingEmployee({...editingEmployee, name: e.target.value})}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Apellido Paterno</label>
                        <input
                            type="text"
                            value={editingEmployee.paternalName}
                            onChange={(e) => setEditingEmployee({...editingEmployee, paternalName: e.target.value})}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Apellido Materno</label>
                        <input
                            type="text"
                            value={editingEmployee.maternalName}
                            onChange={(e) => setEditingEmployee({...editingEmployee, maternalName: e.target.value})}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Fecha de Nacimiento</label>
                        <input
                            type="date"
                            value={editingEmployee.birthDate}
                            onChange={(e) => setEditingEmployee({...editingEmployee, birthDate: e.target.value})}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Dirección</label>
                        <textarea
                            value={editingEmployee.address}
                            onChange={(e) => setEditingEmployee({...editingEmployee, address: e.target.value})}
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
                            value={editingEmployee.email}
                            onChange={(e) => setEditingEmployee({...editingEmployee, email: e.target.value})}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Teléfono</label>
                        <input
                            type="text"
                            value={editingEmployee.telefono}
                            onChange={(e) => setEditingEmployee({...editingEmployee, telefono: e.target.value})}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Fecha de Contratación</label>
                        <input
                            type="date"
                            value={editingEmployee.hireDate}
                            onChange={(e) => setEditingEmployee({...editingEmployee, hireDate: e.target.value})}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Fecha de Terminación (Opcional)</label>
                        <input
                            type="date"
                            value={editingEmployee.terminationDate || ''}
                            onChange={(e) => setEditingEmployee({...editingEmployee, terminationDate: e.target.value || null})}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Rol</label>
                        <select
                            value={editingEmployee.role}
                            onChange={(e) => setEditingEmployee({...editingEmployee, role: e.target.value})}
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
                    onClick={handleClose}
                    className="px-6 py-3 bg-slate-600 hover:bg-slate-500 text-white font-medium rounded-lg transition-colors"
                >
                    Cancelar
                </button>
                <button 
                    onClick={handleSave}
                    className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors shadow-lg"
                >
                    Guardar Cambios
                </button>
            </div>
        </div>
    );
};

export default EditEmployeeModal;


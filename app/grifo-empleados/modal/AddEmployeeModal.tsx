'use client'

import React, { useState } from 'react'

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

interface AddEmployeeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (employee: Employee) => void;
    employees: Employee[];
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({ isOpen, onClose, onSave, employees }) => {
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

    const handleSave = () => {
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

        onSave(employeeToAdd);
        handleClose();
    };

    const handleClose = () => {
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
        onClose();
    };

    // Iconos
    const PlusIcon = () => (
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
        </svg>
    );

    const CloseIcon = () => (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
    );

    if (!isOpen) return null;

    return (
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
                        onClick={handleClose}
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
                            onClick={handleClose}
                            className="px-6 py-3 bg-slate-600 hover:bg-slate-500 text-white font-medium rounded-lg transition-colors"
                        >
                            Cancelar
                        </button>
                        <button 
                            onClick={handleSave}
                            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium rounded-lg transition-all shadow-lg"
                        >
                            Guardar Empleado
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEmployeeModal;


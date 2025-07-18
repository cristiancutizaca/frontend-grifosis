'use client'

import React, { useState } from 'react'
import { X, User, Lock, Mail, UserCheck, Eye, EyeOff, ShieldCheck } from 'lucide-react'
import userService, { CreateUserDto } from '../../../src/services/userService'

interface AddUserModalProps {
  isOpen: boolean
  onClose: () => void
  onUserCreated: () => void
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, onUserCreated }) => {
  // PERMISOS POR DEFECTO PARA SUPERADMIN
  const [formData, setFormData] = useState<CreateUserDto>({
    username: '',
    password: '',
    role: 'seller',
    full_name: '',
    employee_id: undefined,
    permissions: {}
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  // Permiso rápido, lo puedes cambiar por más campos en el futuro
  const [fullAccess, setFullAccess] = useState(false)

  const roles = [
    { value: 'superadmin', label: 'Super Administrador', color: 'bg-purple-500' },
    { value: 'admin', label: 'Administrador', color: 'bg-red-500' },
    { value: 'seller', label: 'Vendedor', color: 'bg-blue-500' },
    // Puedes agregar más roles aquí si tu backend los soporta
  ]

  // Si seleccionan superadmin, marcamos full_access automáticamente
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setFormData(prev => ({
      ...prev,
      role: value,
    }))
    if (value === 'superadmin') setFullAccess(true)
    else setFullAccess(false)
  }

  // Control de input normal
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'employee_id' ? (value ? parseInt(value) : undefined) : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validaciones básicas
    if (!formData.username.trim()) return setError('El nombre de usuario es requerido')
    if (!formData.password.trim()) return setError('La contraseña es requerida')
    if (formData.password.length < 6) return setError('La contraseña debe tener al menos 6 caracteres')
    if (formData.password !== confirmPassword) return setError('Las contraseñas no coinciden')
    if (!formData.full_name || !formData.full_name.trim()) return setError('El nombre completo es requerido')

    // PREPARAR PERMISOS
    let permissions: any = {}
    if (fullAccess) permissions.full_access = true
    // Aquí puedes agregar más flags a permissions, según tu UI

    // Si no es superadmin y no marcó permisos, envía undefined para usar defaults en el backend
    if (!Object.keys(permissions).length) permissions = undefined

    try {
      setLoading(true)
      await userService.create({
        ...formData,
        permissions,
      })

      // Limpiar formulario
      setFormData({
        username: '',
        password: '',
        role: 'seller',
        full_name: '',
        employee_id: undefined,
        permissions: {}
      })
      setConfirmPassword('')
      setFullAccess(false)
      onUserCreated()
      onClose()
    } catch (err: any) {
      console.error('Error al crear usuario:', err)
      setError(err.message || 'Error al crear el usuario')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setFormData({
      username: '',
      password: '',
      role: 'seller',
      full_name: '',
      employee_id: undefined,
      permissions: {}
    })
    setConfirmPassword('')
    setFullAccess(false)
    setError(null)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Agregar Usuario</h2>
              <p className="text-sm text-slate-400">Crear un nuevo usuario del sistema</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-lg bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Nombre completo */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Nombre Completo *</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-400"
                placeholder="Ingrese el nombre completo"
                required
              />
            </div>
          </div>

          {/* Username */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Nombre de Usuario *</label>
            <div className="relative">
              <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-400"
                placeholder="Ingrese el nombre de usuario"
                required
              />
            </div>
          </div>

          {/* Employee ID */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">ID de Empleado</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="number"
                name="employee_id"
                value={formData.employee_id || ''}
                onChange={handleInputChange}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-400"
                placeholder="ID del empleado (opcional)"
              />
            </div>
          </div>

          {/* Rol */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Rol del Usuario *</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleRoleChange}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white"
              required
            >
              {roles.map(role => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>

          {/* Permiso full_access */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="fullAccess"
              checked={fullAccess}
              onChange={(e) => setFullAccess(e.target.checked)}
              className="accent-orange-500 w-4 h-4"
              disabled={formData.role === 'superadmin'}
            />
            <label htmlFor="fullAccess" className="text-sm text-slate-300 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> Acceso completo (full_access)
              {formData.role === 'superadmin' && (
                <span className="ml-2 text-xs text-orange-400">(Siempre activo para superadmin)</span>
              )}
            </label>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Contraseña *</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-12 py-3 text-white placeholder-slate-400"
                placeholder="Ingrese la contraseña"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Confirmar Contraseña *</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-400"
                placeholder="Confirme la contraseña"
                required
              />
            </div>
          </div>

          {/* Botones */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium py-3 px-4 rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-slate-600 disabled:to-slate-600 text-white font-medium py-3 px-4 rounded-lg transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Creando...</span>
                </div>
              ) : (
                'Crear Usuario'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddUserModal

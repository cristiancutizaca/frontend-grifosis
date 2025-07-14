// types.ts
export interface Employee {
  id: number
  dni: string
  name: string
  paternalName: string
  maternalName: string
  role: string
  birthDate: string
  address: string
  telefono: string
  email: string
  hireDate: string
  terminationDate: string | null
  filePath?: string
  files?: File[]
  status: 'Activo' | 'Inactivo'
  createdAt?: string
  updatedAt?: string
}

export interface User {
  id: number
  employee_id: number
  user_name: string
  password: string
  role: string
  status: 'Activo' | 'Inactivo'
  createdAt?: string
  updatedAt?: string
  permissionsObj?: {
    [modulo: string]: ('view' | 'create' | 'edit' | 'delete')[]
  }
}

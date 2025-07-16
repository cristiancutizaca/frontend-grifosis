// userService.ts - Servicio para gestionar usuarios usando ApiService
import ApiService from './apiService';

export interface User {
  user_id: number;
  employee_id?: number;
  username: string;
  role: string;
  permissions?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  full_name?: string;
}

export interface CreateUserDto {
  username: string;
  password: string;
  role: string;
  employee_id?: number;
  full_name?: string;
  permissions?: any;
}

export interface UpdateUserDto {
  username?: string;
  password?: string;
  role?: string;
  employee_id?: number;
  full_name?: string;
  permissions?: any;
  is_active?: boolean;
}

class UserService {
  private readonly endpoint = '/users';

  // Obtener todos los usuarios
  async getAll(): Promise<User[]> {
    try {
      return await ApiService.get<User[]>(this.endpoint);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw error;
    }
  }

  // Obtener usuarios activos
  async getActiveUsers(): Promise<User[]> {
    try {
      return await ApiService.get<User[]>(`${this.endpoint}?active=true`);
    } catch (error) {
      console.error('Error al obtener usuarios activos:', error);
      throw error;
    }
  }

  // Obtener usuarios por rol
  async getUsersByRole(role: string): Promise<User[]> {
    try {
      return await ApiService.get<User[]>(`${this.endpoint}?role=${role}`);
    } catch (error) {
      console.error('Error al obtener usuarios por rol:', error);
      throw error;
    }
  }

  // Obtener usuario por ID
  async getById(id: number): Promise<User> {
    try {
      return await ApiService.get<User>(`${this.endpoint}/${id}`);
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      throw error;
    }
  }

  // Crear nuevo usuario
  async create(userData: CreateUserDto): Promise<User> {
    try {
      return await ApiService.post<User>(this.endpoint, userData);
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw error;
    }
  }

  // Actualizar usuario
  async update(id: number, userData: UpdateUserDto): Promise<User> {
    try {
      return await ApiService.patch<User>(`${this.endpoint}/${id}`, userData);
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      throw error;
    }
  }

  // Eliminar usuario
  async delete(id: number): Promise<void> {
    try {
      await ApiService.delete(`${this.endpoint}/${id}`);
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      throw error;
    }
  }

  // Activar usuario
  async activate(id: number): Promise<User> {
    try {
      return await ApiService.patch<User>(`${this.endpoint}/${id}/activate`, {});
    } catch (error) {
      console.error('Error al activar usuario:', error);
      throw error;
    }
  }

  // Desactivar usuario
  async deactivate(id: number): Promise<User> {
    try {
      return await ApiService.patch<User>(`${this.endpoint}/${id}/deactivate`, {});
    } catch (error) {
      console.error('Error al desactivar usuario:', error);
      throw error;
    }
  }

  // Obtener permisos de un usuario
  async getUserPermissions(id: number): Promise<any> {
    try {
      return await ApiService.get(`${this.endpoint}/${id}/permissions`);
    } catch (error) {
      console.error('Error al obtener permisos del usuario:', error);
      throw error;
    }
  }

  // Actualizar permisos de un usuario
  async updatePermissions(id: number, permissions: any): Promise<User> {
    try {
      return await ApiService.patch<User>(`${this.endpoint}/${id}/permissions`, permissions);
    } catch (error) {
      console.error('Error al actualizar permisos del usuario:', error);
      throw error;
    }
  }

  // Verificar si un usuario tiene un permiso específico
  async checkPermission(id: number, module: string, action: string): Promise<boolean> {
    try {
      const result = await ApiService.get<{ hasPermission: boolean }>(`${this.endpoint}/${id}/permissions/check?module=${module}&action=${action}`);
      return result.hasPermission;
    } catch (error) {
      console.error('Error al verificar permisos:', error);
      throw error;
    }
  }

  // Validar credenciales de usuario
  async validateUser(username: string, password: string): Promise<any> {
    try {
      return await ApiService.post(`${this.endpoint}/validate`, { username, password });
    } catch (error) {
      console.error('Error al validar usuario:', error);
      throw error;
    }
  }
}

export default new UserService();


// userService.ts - Servicio para gestionar usuarios con autenticación mejorada
import ApiService from './apiService'; // Usar el ApiService corregido

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

  // Método para configurar el token de autenticación
  setAuthToken(token: string): void {
    ApiService.setAuthToken(token);
  }

  // Método para verificar si está autenticado
  isAuthenticated(): boolean {
    return ApiService.isAuthenticated();
  }

  // Método para obtener información del usuario actual
  getCurrentUserInfo(): any | null {
    return ApiService.getCurrentUserInfo();
  }

  // Método para limpiar la autenticación
  clearAuth(): void {
    ApiService.clearAuth();
  }

  // Método para verificar la conexión con el backend
  async testConnection(): Promise<boolean> {
    return ApiService.testConnection();
  }

  // Obtener todos los usuarios
  async getAll(): Promise<User[]> {
    try {
      console.log('🔍 UserService: Obteniendo todos los usuarios...');
      
      // Verificar autenticación antes de hacer la petición
      if (!this.isAuthenticated()) {
        throw new Error('No está autenticado. Inicie sesión primero.');
      }

      const users = await ApiService.get<User[]>(this.endpoint);
      console.log(`✅ UserService: Se obtuvieron ${users.length} usuarios`);
      return users;
    } catch (error) {
      console.error('❌ UserService: Error al obtener usuarios:', error);
      
      // Re-lanzar el error para que el componente lo maneje
      if (error instanceof Error) {
        throw error;
      }
      
      throw new Error('Error desconocido al obtener usuarios');
    }
  }

  // Obtener usuarios activos
  async getActiveUsers(): Promise<User[]> {
    try {
      console.log('🔍 UserService: Obteniendo usuarios activos...');
      
      if (!this.isAuthenticated()) {
        throw new Error('No está autenticado. Inicie sesión primero.');
      }

      return await ApiService.get<User[]>(`${this.endpoint}?active=true`);
    } catch (error) {
      console.error('❌ UserService: Error al obtener usuarios activos:', error);
      throw error;
    }
  }

  // Obtener usuarios por rol
  async getUsersByRole(role: string): Promise<User[]> {
    try {
      console.log(`🔍 UserService: Obteniendo usuarios con rol ${role}...`);
      
      if (!this.isAuthenticated()) {
        throw new Error('No está autenticado. Inicie sesión primero.');
      }

      return await ApiService.get<User[]>(`${this.endpoint}?role=${role}`);
    } catch (error) {
      console.error('❌ UserService: Error al obtener usuarios por rol:', error);
      throw error;
    }
  }

  // Obtener usuario por ID
  async getById(id: number): Promise<User> {
    try {
      console.log(`🔍 UserService: Obteniendo usuario con ID ${id}...`);
      
      if (!this.isAuthenticated()) {
        throw new Error('No está autenticado. Inicie sesión primero.');
      }

      return await ApiService.get<User>(`${this.endpoint}/${id}`);
    } catch (error) {
      console.error('❌ UserService: Error al obtener usuario:', error);
      throw error;
    }
  }

  // Crear nuevo usuario
  async create(userData: CreateUserDto): Promise<User> {
    try {
      console.log('🔍 UserService: Creando nuevo usuario...');
      
      if (!this.isAuthenticated()) {
        throw new Error('No está autenticado. Inicie sesión primero.');
      }

      const newUser = await ApiService.post<User>(this.endpoint, userData);
      console.log('✅ UserService: Usuario creado exitosamente');
      return newUser;
    } catch (error) {
      console.error('❌ UserService: Error al crear usuario:', error);
      throw error;
    }
  }

  // Actualizar usuario
  async update(id: number, userData: UpdateUserDto): Promise<User> {
    try {
      console.log(`🔍 UserService: Actualizando usuario con ID ${id}...`);
      
      if (!this.isAuthenticated()) {
        throw new Error('No está autenticado. Inicie sesión primero.');
      }

      const updatedUser = await ApiService.patch<User>(`${this.endpoint}/${id}`, userData);
      console.log('✅ UserService: Usuario actualizado exitosamente');
      return updatedUser;
    } catch (error) {
      console.error('❌ UserService: Error al actualizar usuario:', error);
      throw error;
    }
  }

  // Eliminar usuario
  async delete(id: number): Promise<void> {
    try {
      console.log(`🔍 UserService: Eliminando usuario con ID ${id}...`);
      
      if (!this.isAuthenticated()) {
        throw new Error('No está autenticado. Inicie sesión primero.');
      }

      await ApiService.delete(`${this.endpoint}/${id}`);
      console.log('✅ UserService: Usuario eliminado exitosamente');
    } catch (error) {
      console.error('❌ UserService: Error al eliminar usuario:', error);
      throw error;
    }
  }

  // Activar usuario
  async activate(id: number): Promise<User> {
    try {
      console.log(`🔍 UserService: Activando usuario con ID ${id}...`);
      
      if (!this.isAuthenticated()) {
        throw new Error('No está autenticado. Inicie sesión primero.');
      }

      const activatedUser = await ApiService.patch<User>(`${this.endpoint}/${id}/activate`, {});
      console.log('✅ UserService: Usuario activado exitosamente');
      return activatedUser;
    } catch (error) {
      console.error('❌ UserService: Error al activar usuario:', error);
      throw error;
    }
  }

  // Desactivar usuario
  async deactivate(id: number): Promise<User> {
    try {
      console.log(`🔍 UserService: Desactivando usuario con ID ${id}...`);
      
      if (!this.isAuthenticated()) {
        throw new Error('No está autenticado. Inicie sesión primero.');
      }

      const deactivatedUser = await ApiService.patch<User>(`${this.endpoint}/${id}/deactivate`, {});
      console.log('✅ UserService: Usuario desactivado exitosamente');
      return deactivatedUser;
    } catch (error) {
      console.error('❌ UserService: Error al desactivar usuario:', error);
      throw error;
    }
  }

  // Obtener permisos de un usuario
  async getUserPermissions(id: number): Promise<any> {
    try {
      console.log(`🔍 UserService: Obteniendo permisos del usuario con ID ${id}...`);
      
      if (!this.isAuthenticated()) {
        throw new Error('No está autenticado. Inicie sesión primero.');
      }

      return await ApiService.get(`${this.endpoint}/${id}/permissions`);
    } catch (error) {
      console.error('❌ UserService: Error al obtener permisos del usuario:', error);
      throw error;
    }
  }

  // Actualizar permisos de un usuario
  async updatePermissions(id: number, permissions: any): Promise<User> {
    try {
      console.log(`🔍 UserService: Actualizando permisos del usuario con ID ${id}...`);
      
      if (!this.isAuthenticated()) {
        throw new Error('No está autenticado. Inicie sesión primero.');
      }

      const updatedUser = await ApiService.patch<User>(`${this.endpoint}/${id}/permissions`, permissions);
      console.log('✅ UserService: Permisos actualizados exitosamente');
      return updatedUser;
    } catch (error) {
      console.error('❌ UserService: Error al actualizar permisos del usuario:', error);
      throw error;
    }
  }

  // Verificar si un usuario tiene un permiso específico
  async checkPermission(id: number, module: string, action: string): Promise<boolean> {
    try {
      console.log(`🔍 UserService: Verificando permiso ${module}:${action} para usuario ${id}...`);
      
      if (!this.isAuthenticated()) {
        throw new Error('No está autenticado. Inicie sesión primero.');
      }

      const result = await ApiService.get<{ hasPermission: boolean }>(`${this.endpoint}/${id}/permissions/check?module=${module}&action=${action}`);
      return result.hasPermission;
    } catch (error) {
      console.error('❌ UserService: Error al verificar permisos:', error);
      throw error;
    }
  }

  // Validar credenciales de usuario
  async validateUser(username: string, password: string): Promise<any> {
    try {
      console.log(`🔍 UserService: Validando credenciales para usuario ${username}...`);
      
      const result = await ApiService.post(`${this.endpoint}/validate`, { username, password });
      console.log('✅ UserService: Credenciales validadas exitosamente');
      return result;
    } catch (error) {
      console.error('❌ UserService: Error al validar usuario:', error);
      throw error;
    }
  }

  // Método de diagnóstico para verificar el estado del servicio
  async diagnose(): Promise<{
    isAuthenticated: boolean;
    hasToken: boolean;
    userInfo: any;
    connectionTest: boolean;
  }> {
    const hasToken = !!ApiService.getAuthToken();
    const isAuthenticated = this.isAuthenticated();
    const userInfo = this.getCurrentUserInfo();
    
    let connectionTest = false;
    try {
      connectionTest = await this.testConnection();
    } catch (error) {
      console.error('Error en test de conexión:', error);
    }

    const diagnosis = {
      isAuthenticated,
      hasToken,
      userInfo,
      connectionTest
    };

    console.log('🔧 UserService Diagnosis:', diagnosis);
    return diagnosis;
  }
}

export default new UserService();


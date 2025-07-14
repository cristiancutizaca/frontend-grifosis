import apiService from './apiService';

export interface User {
  id: number;
  username: string;
  email: string;
  rol: string;
  estado: 'activo' | 'inactivo';
  fecha_creacion: string;
}

class UserService {
  private endpoint = '/users';

  async getAll(): Promise<User[]> {
    return apiService.get<User[]>(this.endpoint);
  }
}

export default new UserService();

import apiService from './apiService';

export interface Employee {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  cargo: string;
  estado: 'activo' | 'inactivo';
  fecha_creacion: string;
}

class EmployeeService {
  private endpoint = '/employees';

  async getAll(): Promise<Employee[]> {
    return apiService.get<Employee[]>(this.endpoint);
  }
}

export default new EmployeeService();

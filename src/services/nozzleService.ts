import apiService from './apiService';

export interface Nozzle {
  id: number;
  numero: string;
  bomba_id: number;
  producto_id: number;
  estado: 'activo' | 'inactivo' | 'mantenimiento';
  fecha_creacion: string;
  fecha_actualizacion: string;
  bomba?: { id: number; numero: string; estado: string };
  producto?: { id: number; nombre: string; precio: number; tipo: string };
}

export interface CreateNozzleData {
  numero: string;
  bomba_id: number;
  producto_id: number;
  estado?: 'activo' | 'inactivo' | 'mantenimiento';
}

export interface UpdateNozzleData extends Partial<CreateNozzleData> {
  id: number;
}

class NozzleService {
  private endpoint = '/nozzles';

  getAllNozzles() {
    return apiService.get<Nozzle[]>(this.endpoint);
  }
  getNozzleById(id: number) {
    return apiService.get<Nozzle>(`${this.endpoint}/${id}`);
  }
  createNozzle(data: CreateNozzleData) {
    return apiService.post<Nozzle>(this.endpoint, data);
  }
  
  deleteNozzle(id: number) {
    return apiService.delete<void>(`${this.endpoint}/${id}`);
  }
  getNozzlesByPump(pumpId: number) {
    return apiService.get<Nozzle[]>(`${this.endpoint}?bomba_id=${pumpId}`);
  }
  getActiveNozzles() {
    return apiService.get<Nozzle[]>(`${this.endpoint}?estado=activo`);
  }
  getNozzlesByProduct(productId: number) {
    return apiService.get<Nozzle[]>(`${this.endpoint}?producto_id=${productId}`);
  }
}

export default new NozzleService();


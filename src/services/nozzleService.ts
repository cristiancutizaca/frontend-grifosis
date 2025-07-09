import apiService from './apiService';

export interface Nozzle {
  id: number;
  numero: string;
  bomba_id: number;
  producto_id: number;
  estado: 'activo' | 'inactivo' | 'mantenimiento';
  fecha_creacion: string;
  fecha_actualizacion: string;
  bomba?: {
    id: number;
    numero: string;
    estado: string;
  };
  producto?: {
    id: number;
    nombre: string;
    precio: number;
    tipo: string;
  };
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

  async getAllNozzles(): Promise<Nozzle[]> {
    const data = await apiService.get<Nozzle[]>(this.endpoint);
    console.log('Nozzles from API:', data); // <-- Aquí pon el console.log
    return data;
  }

  async getNozzleById(id: number): Promise<Nozzle> {
    return apiService.get<Nozzle>(`${this.endpoint}/${id}`);
  }

  async createNozzle(nozzleData: CreateNozzleData): Promise<Nozzle> {
    return apiService.post<Nozzle>(this.endpoint, nozzleData);
  }

  async updateNozzle(nozzleData: UpdateNozzleData): Promise<Nozzle> {
    const { id, ...data } = nozzleData;
    return apiService.put<Nozzle>(`${this.endpoint}/${id}`, data);
  }

  async deleteNozzle(id: number): Promise<void> {
    return apiService.delete<void>(`${this.endpoint}/${id}`);
  }

  async getNozzlesByPump(pumpId: number): Promise<Nozzle[]> {
    return apiService.get<Nozzle[]>(`${this.endpoint}?bomba_id=${pumpId}`);
  }

  async getActiveNozzles(): Promise<Nozzle[]> {
    return apiService.get<Nozzle[]>(`${this.endpoint}?estado=activo`);
  }

  async getNozzlesByProduct(productId: number): Promise<Nozzle[]> {
    return apiService.get<Nozzle[]>(`${this.endpoint}?producto_id=${productId}`);
  }
}

export default new NozzleService();


import api from './apiService';

export interface Nozzle {
  id: number;
  numero: string;
  bomba_id: number;
  producto?: {
    id: number;
    nombre: string;
    precio: number;
    tipo: string;
  };
}

class NozzleService {
  getAll() {
    return api.get<Nozzle[]>('/nozzles');
  }
  getByPump(pumpId: number) {
    return api.get<Nozzle[]>(`/nozzles?bomba_id=${pumpId}`);
  }

  getAllNozzles() {
    return this.getAll();
  }
  getNozzlesByPump(pumpId: number) {
    return this.getByPump(pumpId);
  }
  getActiveNozzles() {
    return api.get<Nozzle[]>('/nozzles?estado=activo');
  }
  getPumps(): Promise<number[]> {
    return api.get<number[]>('/nozzles/pumps');
  }
}

export default new NozzleService();


import apiService from './apiService';

export interface Client {
  id: number;
  nombre: string;
  apellido: string;
  documento: string;
  tipo_documento: string;
  telefono: string;
  email: string;
  direccion: string;
  tipo_cliente: 'persona' | 'empresa';
  limite_credito: number;
  credito_disponible: number;
  estado: 'activo' | 'inactivo' | 'suspendido';
  fecha_registro: string;
  fecha_actualizacion: string;
}

export interface CreateClientData {
  nombre: string;
  apellido: string;
  documento: string;
  tipo_documento: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  tipo_cliente: 'persona' | 'empresa';
  limite_credito?: number;
}

export interface UpdateClientData extends Partial<CreateClientData> {
  id: number;
}

class ClientService {
  private endpoint = '/clientes';

  async getAllClients(): Promise<Client[]> {
    return apiService.get<Client[]>(this.endpoint);
  }

  async getClientById(id: number): Promise<Client> {
    return apiService.get<Client>(`${this.endpoint}/${id}`);
  }

  async createClient(clientData: CreateClientData): Promise<Client> {
    return apiService.post<Client>(this.endpoint, clientData);
  }

  async updateClient(clientData: UpdateClientData): Promise<Client> {
    const { id, ...data } = clientData;
    return apiService.put<Client>(`${this.endpoint}/${id}`, data);
  }

  async deleteClient(id: number): Promise<void> {
    return apiService.delete<void>(`${this.endpoint}/${id}`);
  }

  async searchClients(query: string): Promise<Client[]> {
    return apiService.get<Client[]>(`${this.endpoint}/search?q=${encodeURIComponent(query)}`);
  }

  async getClientsByType(tipo: 'persona' | 'empresa'): Promise<Client[]> {
    return apiService.get<Client[]>(`${this.endpoint}?tipo_cliente=${tipo}`);
  }

  async getClientsWithCredit(): Promise<Client[]> {
    return apiService.get<Client[]>(`${this.endpoint}?con_credito=true`);
  }

  async updateClientCredit(id: number, nuevoLimite: number): Promise<Client> {
    return apiService.put<Client>(`${this.endpoint}/${id}/credito`, {
      limite_credito: nuevoLimite
    });
  }

  async getClientTransactions(id: number): Promise<any[]> {
    return apiService.get<any[]>(`${this.endpoint}/${id}/transacciones`);
  }
}

export default new ClientService();


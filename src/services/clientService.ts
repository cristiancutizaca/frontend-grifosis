import apiService from './apiService';

// Ahora el tipo Client incluye TODO (lo tuyo y lo nuevo del backend)
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
  // NUEVOS CAMPOS
  first_name?: string;
  last_name?: string;
  company_name?: string;
  category?: string;
  document_type?: string;
  document_number?: string;
  address?: string;
  phone?: string;
  birth_date?: string;
  notes?: string;
  client_type?: 'persona' | 'empresa';
  created_at?: string;
  updated_at?: string;
}

// Ahora CreateClientData incluye lo viejo + lo nuevo, ¡sin romper nada!
export interface CreateClientData {
  first_name?: string;
  last_name?: string;
  company_name?: string;
  category?: string;
  document_type?: string;
  document_number?: string;
  address?: string;
  phone?: string;
  email?: string;
  birth_date?: string;
  notes?: string;
  client_type?: 'persona' | 'empresa';
  // Tus campos antiguos siguen aquí:
  tipo_documento?: string;
  limite_credito?: number;
}

export interface UpdateClientData extends Partial<CreateClientData> {
  id: number;
}

// ------------------
// NO MODIFICAMOS LOS MÉTODOS, SOLO TIPOS
// ------------------

class ClientService {
  private endpoint = '/clients';

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

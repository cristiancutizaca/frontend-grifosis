import { APP_CONFIG, isOnlineMode, isOfflineMode, getDemoData } from '../config/appConfig';

// Función para simular delay de red en modo offline
const simulateNetworkDelay = (min = 300, max = 800): Promise<void> => {
  const delay = Math.random() * (max - min) + min;
  return new Promise(resolve => setTimeout(resolve, delay));
};

// API Base Service con soporte para modo offline/online
class ApiService {
  private baseURL: string;

  constructor(baseURL: string = process.env.REACT_APP_API_URL || 'http://localhost:8000/api') {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    // Si estamos en modo offline, manejar la petición localmente
    if (isOfflineMode()) {
      return this.handleOfflineRequest<T>(endpoint, options);
    }

    // Modo online - comportamiento original
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      // Leer body SOLO UNA VEZ
      const contentType = response.headers.get('content-type');
      let data: any;
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        // Si la respuesta fue error, lanza el mensaje que venga, si existe
        let errorText = typeof data === 'string' ? data : (data?.message || JSON.stringify(data));
        throw new Error(errorText || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }

  }

  private getAuthHeaders(): Record<string, string> {
    const token = typeof window !== 'undefined' ? sessionStorage.getItem('token') : null;
    if (token && isOnlineMode()) {
      return { 'Authorization': `Bearer ${token}` };
    }
    return {};
  }

  private async handleOfflineRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    // Simular delay de red
    await simulateNetworkDelay();

    const method = options.method || 'GET';
    const body = options.body ? JSON.parse(options.body as string) : null;

    // Parsear el endpoint para determinar el recurso y acción
    const [, resource, id] = endpoint.split('/');

    switch (method.toUpperCase()) {
      case 'GET':
        return this.handleOfflineGet<T>(resource, id);
      case 'POST':
        return this.handleOfflinePost<T>(resource, body);
      case 'PUT':
        return this.handleOfflinePut<T>(resource, id, body);
      case 'DELETE':
        return this.handleOfflineDelete<T>(resource, id);
      default:
        throw new Error(`Método ${method} no soportado en modo offline`);
    }
  }

  private handleOfflineGet<T>(resource: string, id?: string): T {
    const data = getDemoData(resource);

    if (id) {
      // Buscar un elemento específico por ID
      const item = data.find((item: any) => item.id.toString() === id);
      if (!item) {
        throw new Error(`Elemento con ID ${id} no encontrado`);
      }
      return item as T;
    }

    // Retornar todos los elementos
    return data as T;
  }

  private handleOfflinePost<T>(resource: string, body: any): T {
    const newItem = {
      ...body,
      id: Date.now(), // ID simulado
      createdAt: new Date().toISOString(),
    };

    // Agregar campos específicos según el recurso
    switch (resource) {
      case 'ventas':
        newItem.fecha = new Date().toISOString().split('T')[0];
        break;
      case 'creditos':
        newItem.estado = 'Activo';
        break;
      case 'turnos':
        newItem.fecha = newItem.fecha || new Date().toISOString().split('T')[0];
        break;
    }

    return newItem as T;
  }

  private handleOfflinePut<T>(resource: string, id: string, body: any): T {
    const updatedItem = {
      ...body,
      id: parseInt(id),
      updatedAt: new Date().toISOString(),
    };

    return updatedItem as T;
  }

  private handleOfflineDelete<T>(resource: string, id: string): T {
    return { success: true, id: parseInt(id) } as T;
  }

  // Métodos públicos - mantienen la misma interfaz
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // Métodos específicos para recursos comunes
  async getClientes<T>(): Promise<T> {
    return this.get<T>('/clientes');
  }

  async createCliente<T>(cliente: any): Promise<T> {
    return this.post<T>('/clientes', cliente);
  }

  async updateCliente<T>(id: number, cliente: any): Promise<T> {
    return this.put<T>(`/clientes/${id}`, cliente);
  }

  async deleteCliente<T>(id: number): Promise<T> {
    return this.delete<T>(`/clientes/${id}`);
  }

  async getVentas<T>(): Promise<T> {
    return this.get<T>('/ventas');
  }

  async createVenta<T>(venta: any): Promise<T> {
    return this.post<T>('/ventas', venta);
  }

  async updateVenta<T>(id: number, venta: any): Promise<T> {
    return this.put<T>(`/ventas/${id}`, venta);
  }

  async deleteVenta<T>(id: number): Promise<T> {
    return this.delete<T>(`/ventas/${id}`);
  }

  async getInventario<T>(): Promise<T> {
    return this.get<T>('/inventario');
  }

  async createInventario<T>(item: any): Promise<T> {
    return this.post<T>('/inventario', item);
  }

  async updateInventario<T>(id: number, item: any): Promise<T> {
    return this.put<T>(`/inventario/${id}`, item);
  }

  async deleteInventario<T>(id: number): Promise<T> {
    return this.delete<T>(`/inventario/${id}`);
  }

  async getEmpleados<T>(): Promise<T> {
    return this.get<T>('/empleados');
  }

  async createEmpleado<T>(empleado: any): Promise<T> {
    return this.post<T>('/empleados', empleado);
  }

  async updateEmpleado<T>(id: number, empleado: any): Promise<T> {
    return this.put<T>(`/empleados/${id}`, empleado);
  }

  async deleteEmpleado<T>(id: number): Promise<T> {
    return this.delete<T>(`/empleados/${id}`);
  }

  async getCreditos<T>(): Promise<T> {
    return this.get<T>('/creditos');
  }

  async createCredito<T>(credito: any): Promise<T> {
    return this.post<T>('/creditos', credito);
  }

  async updateCredito<T>(id: number, credito: any): Promise<T> {
    return this.put<T>(`/creditos/${id}`, credito);
  }

  async deleteCredito<T>(id: number): Promise<T> {
    return this.delete<T>(`/creditos/${id}`);
  }

  async getTurnos<T>(): Promise<T> {
    return this.get<T>('/turnos');
  }

  async createTurno<T>(turno: any): Promise<T> {
    return this.post<T>('/turnos', turno);
  }

  async updateTurno<T>(id: number, turno: any): Promise<T> {
    return this.put<T>(`/turnos/${id}`, turno);
  }

  async deleteTurno<T>(id: number): Promise<T> {
    return this.delete<T>(`/turnos/${id}`);
  }

  async getConfiguracion<T>(): Promise<T> {
    if (isOfflineMode()) {
      await simulateNetworkDelay(200, 400);
      return getDemoData('configuracion') as T;
    }
    return this.get<T>('/configuracion');
  }

  async updateConfiguracion<T>(config: any): Promise<T> {
    return this.put<T>('/configuracion', config);
  }

  async getReportes<T>(tipo: string, fechaInicio?: string, fechaFin?: string): Promise<T> {
    if (isOfflineMode()) {
      await simulateNetworkDelay(800, 1200);
      const reporteDemo = {
        tipo,
        fechaInicio,
        fechaFin,
        datos: [
          { fecha: '2024-01-01', ventas: 1500, clientes: 25, productos: 45 },
          { fecha: '2024-01-02', ventas: 1800, clientes: 30, productos: 52 },
          { fecha: '2024-01-03', ventas: 1200, clientes: 20, productos: 38 },
          { fecha: '2024-01-04', ventas: 2100, clientes: 35, productos: 60 },
          { fecha: '2024-01-05', ventas: 1650, clientes: 28, productos: 48 },
        ],
        resumen: {
          totalVentas: 8250,
          totalClientes: 138,
          promedioDiario: 1650,
          productoMasVendido: 'Gasolina Regular'
        }
      };
      return reporteDemo as T;
    }

    const params = new URLSearchParams();
    if (fechaInicio) params.append('fechaInicio', fechaInicio);
    if (fechaFin) params.append('fechaFin', fechaFin);

    return this.get<T>(`/reportes/${tipo}?${params.toString()}`);
  }

  async getDashboardStats<T>(): Promise<T> {
    if (isOfflineMode()) {
      await simulateNetworkDelay(400, 700);
      const stats = {
        ventasHoy: 2450,
        clientesAtendidos: 45,
        inventarioTotal: 2450,
        empleadosActivos: 3,
        ventasSemana: [
          { dia: 'Lun', ventas: 1200 },
          { dia: 'Mar', ventas: 1800 },
          { dia: 'Mie', ventas: 1500 },
          { dia: 'Jue', ventas: 2100 },
          { dia: 'Vie', ventas: 2450 },
          { dia: 'Sab', ventas: 1900 },
          { dia: 'Dom', ventas: 1600 },
        ],
        productosPopulares: [
          { producto: 'Gasolina Regular', ventas: 45 },
          { producto: 'Diesel', ventas: 32 },
          { producto: 'Gasolina Premium', ventas: 28 },
          { producto: 'Aceite Motor', ventas: 15 },
        ]
      };
      return stats as T;
    }
    return this.get<T>('/dashboard/stats');
  }

  // Método para verificar el estado de la conexión
  isOnline(): boolean {
    return isOnlineMode();
  }

  // Método para obtener el modo actual
  getCurrentMode(): string {
    return APP_CONFIG.mode;
  }
}

export default new ApiService();


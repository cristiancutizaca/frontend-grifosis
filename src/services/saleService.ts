import apiService from './apiService';

export interface Sale {
  id: number;
  cliente_id: number;
  empleado_id: number;
  bomba_id: number;
  producto_id: number;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
  descuento: number;
  total: number;
  metodo_pago: 'efectivo' | 'tarjeta' | 'credito' | 'transferencia';
  estado: 'completada' | 'pendiente' | 'cancelada';
  fecha_venta: string;
  observaciones?: string;
}

export interface CreateSaleData {
  cliente_id: number;
  empleado_id: number;
  bomba_id: number;
  producto_id: number;
  cantidad: number;
  precio_unitario: number;
  descuento?: number;
  metodo_pago: 'efectivo' | 'tarjeta' | 'credito' | 'transferencia';
  observaciones?: string;
}

export interface SaleFilters {
  fecha_inicio?: string;
  fecha_fin?: string;
  cliente_id?: number;
  empleado_id?: number;
  bomba_id?: number;
  producto_id?: number;
  metodo_pago?: string;
  estado?: string;
}

export interface SaleStats {
  total_ventas: number;
  total_cantidad: number;
  total_ingresos: number;
  ventas_por_producto: Array<{
    producto_id: number;
    nombre_producto: string;
    cantidad_vendida: number;
    ingresos: number;
  }>;
  ventas_por_bomba: Array<{
    bomba_id: number;
    numero_bomba: string;
    cantidad_vendida: number;
    ingresos: number;
  }>;
}

class SaleService {
  private endpoint = '/ventas';

  async getAllSales(filters?: SaleFilters): Promise<Sale[]> {
    const queryParams = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const queryString = queryParams.toString();
    const url = queryString ? `${this.endpoint}?${queryString}` : this.endpoint;
    
    return apiService.get<Sale[]>(url);
  }

  async getSaleById(id: number): Promise<Sale> {
    return apiService.get<Sale>(`${this.endpoint}/${id}`);
  }

  async createSale(saleData: CreateSaleData): Promise<Sale> {
    // Calcular subtotal y total
    const subtotal = saleData.cantidad * saleData.precio_unitario;
    const descuento = saleData.descuento || 0;
    const total = subtotal - descuento;

    const saleWithCalculations = {
      ...saleData,
      subtotal,
      total,
      descuento
    };

    return apiService.post<Sale>(this.endpoint, saleWithCalculations);
  }

  async updateSale(id: number, saleData: Partial<CreateSaleData>): Promise<Sale> {
    return apiService.put<Sale>(`${this.endpoint}/${id}`, saleData);
  }

  async cancelSale(id: number): Promise<Sale> {
    return apiService.put<Sale>(`${this.endpoint}/${id}/cancelar`, {});
  }

  async getSalesByClient(clientId: number): Promise<Sale[]> {
    return apiService.get<Sale[]>(`${this.endpoint}/cliente/${clientId}`);
  }

  async getSalesByEmployee(employeeId: number): Promise<Sale[]> {
    return apiService.get<Sale[]>(`${this.endpoint}/empleado/${employeeId}`);
  }

  async getSalesByPump(pumpId: number): Promise<Sale[]> {
    return apiService.get<Sale[]>(`${this.endpoint}/bomba/${pumpId}`);
  }

  async getDailySales(fecha?: string): Promise<Sale[]> {
    const date = fecha || new Date().toISOString().split('T')[0];
    return apiService.get<Sale[]>(`${this.endpoint}/diarias?fecha=${date}`);
  }

  async getSalesStats(filters?: SaleFilters): Promise<SaleStats> {
    const queryParams = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const queryString = queryParams.toString();
    const url = queryString ? `${this.endpoint}/estadisticas?${queryString}` : `${this.endpoint}/estadisticas`;
    
    return apiService.get<SaleStats>(url);
  }

  async getRecentSales(limit: number = 10): Promise<Sale[]> {
    return apiService.get<Sale[]>(`${this.endpoint}/recientes?limit=${limit}`);
  }
}

export default new SaleService();


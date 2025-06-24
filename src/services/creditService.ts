import apiService from './apiService';

export interface Credit {
  id: number;
  cliente_id: number;
  limite_credito: number;
  credito_usado: number;
  credito_disponible: number;
  estado: 'activo' | 'suspendido' | 'vencido';
  fecha_vencimiento?: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
}

export interface CreditPayment {
  id: number;
  credito_id: number;
  monto: number;
  fecha_pago: string;
  metodo_pago: 'efectivo' | 'tarjeta' | 'transferencia';
  referencia?: string;
  observaciones?: string;
}

export interface CreateCreditData {
  cliente_id: number;
  limite_credito: number;
  fecha_vencimiento?: string;
}

export interface CreatePaymentData {
  credito_id: number;
  monto: number;
  metodo_pago: 'efectivo' | 'tarjeta' | 'transferencia';
  referencia?: string;
  observaciones?: string;
}

export interface CreditAlert {
  id: number;
  cliente_id: number;
  nombre_cliente: string;
  tipo_alerta: 'limite_excedido' | 'pago_vencido' | 'credito_agotado';
  mensaje: string;
  fecha_alerta: string;
  estado: 'activa' | 'resuelta';
}

export interface CreditStats {
  total_creditos: number;
  credito_total_otorgado: number;
  credito_total_usado: number;
  credito_total_disponible: number;
  creditos_vencidos: number;
  creditos_por_vencer: number;
  pagos_pendientes: number;
}

class CreditService {
  private endpoint = '/creditos';

  async getAllCredits(): Promise<Credit[]> {
    return apiService.get<Credit[]>(this.endpoint);
  }

  async getCreditById(id: number): Promise<Credit> {
    return apiService.get<Credit>(`${this.endpoint}/${id}`);
  }

  async getCreditByClientId(clientId: number): Promise<Credit> {
    return apiService.get<Credit>(`${this.endpoint}/cliente/${clientId}`);
  }

  async createCredit(creditData: CreateCreditData): Promise<Credit> {
    return apiService.post<Credit>(this.endpoint, creditData);
  }

  async updateCreditLimit(id: number, nuevoLimite: number): Promise<Credit> {
    return apiService.put<Credit>(`${this.endpoint}/${id}/limite`, {
      limite_credito: nuevoLimite
    });
  }

  async suspendCredit(id: number): Promise<Credit> {
    return apiService.put<Credit>(`${this.endpoint}/${id}/suspender`, {});
  }

  async activateCredit(id: number): Promise<Credit> {
    return apiService.put<Credit>(`${this.endpoint}/${id}/activar`, {});
  }

  async deleteCredit(id: number): Promise<void> {
    return apiService.delete<void>(`${this.endpoint}/${id}`);
  }

  // Pagos de crédito
  async getCreditPayments(creditId: number): Promise<CreditPayment[]> {
    return apiService.get<CreditPayment[]>(`${this.endpoint}/${creditId}/pagos`);
  }

  async createPayment(paymentData: CreatePaymentData): Promise<CreditPayment> {
    return apiService.post<CreditPayment>(`${this.endpoint}/pagos`, paymentData);
  }

  async getPaymentById(paymentId: number): Promise<CreditPayment> {
    return apiService.get<CreditPayment>(`${this.endpoint}/pagos/${paymentId}`);
  }

  // Alertas de crédito
  async getCreditAlerts(): Promise<CreditAlert[]> {
    return apiService.get<CreditAlert[]>(`${this.endpoint}/alertas`);
  }

  async getActiveAlerts(): Promise<CreditAlert[]> {
    return apiService.get<CreditAlert[]>(`${this.endpoint}/alertas?estado=activa`);
  }

  async resolveAlert(alertId: number): Promise<CreditAlert> {
    return apiService.put<CreditAlert>(`${this.endpoint}/alertas/${alertId}/resolver`, {});
  }

  // Estadísticas
  async getCreditStats(): Promise<CreditStats> {
    return apiService.get<CreditStats>(`${this.endpoint}/estadisticas`);
  }

  async getExpiredCredits(): Promise<Credit[]> {
    return apiService.get<Credit[]>(`${this.endpoint}/vencidos`);
  }

  async getCreditsAboutToExpire(days: number = 7): Promise<Credit[]> {
    return apiService.get<Credit[]>(`${this.endpoint}/por-vencer?dias=${days}`);
  }

  async getOverduePayments(): Promise<Credit[]> {
    return apiService.get<Credit[]>(`${this.endpoint}/pagos-vencidos`);
  }

  // Reportes
  async getCreditReport(filters?: {
    fecha_inicio?: string;
    fecha_fin?: string;
    cliente_id?: number;
    estado?: string;
  }): Promise<any> {
    const queryParams = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const queryString = queryParams.toString();
    const url = queryString ? `${this.endpoint}/reporte?${queryString}` : `${this.endpoint}/reporte`;
    
    return apiService.get<any>(url);
  }
}

export default new CreditService();


// API Base Service - Versión corregida con autenticación JWT
class ApiService {
  private baseURL: string;
  private authToken: string | null = null;

  constructor(baseURL: string = process.env.REACT_APP_API_URL || 'http://localhost:8000/api') {
    this.baseURL = baseURL;
    // Intentar obtener el token del sessionStorage al inicializar
    this.initializeToken();
  }

  // Inicializar token desde sessionStorage
  private initializeToken(): void {
    if (typeof window !== 'undefined') {
      this.authToken = sessionStorage.getItem('token');
    }
  }

  // Método para establecer el token de autenticación
  setAuthToken(token: string | null): void {
    this.authToken = token;
  }

  // Método para obtener el token actual
  getAuthToken(): string | null {
    // Si no hay token en memoria, intentar obtenerlo del sessionStorage
    if (!this.authToken && typeof window !== 'undefined') {
      this.authToken = sessionStorage.getItem('token');
    }
    return this.authToken;
  }

  // Método para verificar si está autenticado
  isAuthenticated(): boolean {
    const token = this.getAuthToken();
    return !!token;
  }

  // Método para limpiar la autenticación
  clearAuth(): void {
    this.authToken = null;
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('app_mode');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    // Obtener el token actual
    const token = this.getAuthToken();

    // Configurar headers base
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers as Record<string, string>,
    };

    // Agregar token de autorización si está disponible
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      headers,
      ...options,
    };

    try {
      console.log(`🔗 API Request: ${options.method || 'GET'} ${url}`);
      console.log(`🔑 Auth Token: ${token ? 'Present' : 'Missing'}`);
      
      const response = await fetch(url, config);

      console.log(`📡 Response Status: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        // Manejo específico de errores de autenticación
        if (response.status === 401) {
          console.error('❌ Error 401: Token inválido o expirado');
          this.clearAuth();
          throw new Error('Usuario no autenticado o sin rol');
        } else if (response.status === 403) {
          console.error('❌ Error 403: Sin permisos para esta operación');
          throw new Error('No tiene permisos para ver los usuarios. Verifique que esté autenticado correctamente.');
        } else if (response.status === 404) {
          console.error('❌ Error 404: Endpoint no encontrado');
          throw new Error('El endpoint solicitado no fue encontrado en el servidor');
        } else if (response.status >= 500) {
          console.error('❌ Error del servidor:', response.status);
          throw new Error('Error interno del servidor. Contacte al administrador.');
        } else {
          throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
        }
      }

      // Verificar si la respuesta tiene contenido
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        console.log('✅ Response Data:', data);
        return data;
      } else {
        // Para respuestas sin contenido (como DELETE)
        return {} as T;
      }
    } catch (error) {
      console.error('💥 API request failed:', error);
      
      // Re-lanzar errores conocidos
      if (error instanceof Error) {
        throw error;
      }
      
      // Para errores de red u otros
      throw new Error('Error de conexión: No se puede conectar al servidor. Verifique que el backend esté funcionando.');
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async patch<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
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

  // Método para hacer una petición de prueba y verificar la conectividad
  async testConnection(): Promise<boolean> {
    try {
      // Intentar hacer una petición simple al backend
      await this.get('/health');
      return true;
    } catch (error) {
      console.error('Test de conexión falló:', error);
      return false;
    }
  }

  // Método para obtener información del usuario actual desde el token
  getCurrentUserInfo(): any | null {
    const token = this.getAuthToken();
    if (!token) return null;

    try {
      // Verificar si es un token JWT real o uno simulado
      if (token.includes('.')) {
        // Es un JWT real, decodificarlo
        const { jwtDecode } = require('jwt-decode');
        return jwtDecode(token);
      } else {
        // Es un token simulado (modo offline), decodificarlo como base64
        return JSON.parse(atob(token));
      }
    } catch (error) {
      console.error('Error al decodificar token:', error);
      return null;
    }
  }
}

export default new ApiService();


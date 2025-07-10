import apiService from './apiService';

// Define la interfaz Product según lo que retorna tu backend
export interface Product {
  id: number;
  nombre: string;
  precio: number;
  tipo: string; // Ej: 'diesel', 'gasolina', etc.
  // Puedes agregar más campos si tu backend retorna más info
}

class ProductService {
  private endpoint = '/products';

  async getAllProducts(): Promise<Product[]> {
    return apiService.get<Product[]>(this.endpoint);
  }

  async getProductById(id: number): Promise<Product> {
    return apiService.get<Product>(`${this.endpoint}/${id}`);
  }

  // Puedes agregar más métodos si necesitas crear, editar, etc.
}

export default new ProductService();

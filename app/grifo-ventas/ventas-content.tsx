
'use client';

import React, { useState, useEffect } from 'react';
import FuelButton from '../../src/components/FuelButton';
import { ArrowLeft, User, Search, Plus } from 'lucide-react';
import saleService, { CreateSaleData } from '../../src/services/saleService';
import clientService, { Client } from '../../src/services/clientService';
import nozzleService, { Nozzle } from '../../src/services/nozzleService';
import CreateClientModal from './components/CreateClientModal'; // Importar el nuevo componente

interface Product {
  id: number;
  nombre: 'Diesel' | 'Premium' | 'Regular';
  precio: number;
  tipo: string;
}

interface SaleFormData {
  client_id: number;
  pump_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  discount_amount: number;
  payment_method: string;
  notes: string;
}

const VentasContent: React.FC = () => {
  // Estados del formulario
  const [formData, setFormData] = useState<SaleFormData>({
    client_id: 0,
    pump_id: 0,
    product_id: 0,
    quantity: 0,
    unit_price: 0,
    discount_amount: 0,
    payment_method: 'efectivo',
    notes: ''
  });

  // Estados para datos del servidor
  const [clients, setClients] = useState<Client[]>([]);
  const [nozzles, setNozzles] = useState<Nozzle[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [clientSearchTerm, setClientSearchTerm] = useState('');
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [selectedNozzle, setSelectedNozzle] = useState<Nozzle | null>(null);

  // Estados de UI
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isCreateClientModalOpen, setIsCreateClientModalOpen] = useState(false); // Estado para el modal

  // Productos disponibles (esto debería venir de una API también)
  const [products] = useState<Product[]>([
    { id: 1, nombre: 'Diesel', precio: 3.00, tipo: 'diesel' },
    { id: 2, nombre: 'Premium', precio: 4.01, tipo: 'gasolina' },
    { id: 3, nombre: 'Regular', precio: 4.00, tipo: 'gasolina' },
  ]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Cargar datos iniciales
  useEffect(() => {
    loadInitialData();
  }, []);

  // Filtrar clientes cuando cambia el término de búsqueda
  useEffect(() => {
    if (clientSearchTerm.trim() === '') {
      setFilteredClients(clients.slice(0, 10)); // Mostrar solo los primeros 10
    } else {
      const filtered = clients.filter(client =>
        `${client.nombre} ${client.apellido}`.toLowerCase().includes(clientSearchTerm.toLowerCase()) ||
        client.documento.includes(clientSearchTerm)
      );
      setFilteredClients(filtered.slice(0, 10));
    }
  }, [clientSearchTerm, clients]);

  // Calcular total cuando cambian cantidad, precio o descuento
  useEffect(() => {
    if (formData.quantity > 0 && formData.unit_price > 0) {
      const subtotal = formData.quantity * formData.unit_price;
      // El total se calcula automáticamente en el componente
    }
  }, [formData.quantity, formData.unit_price, formData.discount_amount]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [clientsData, nozzlesData] = await Promise.all([
        clientService.getAllClients(),
        nozzleService.getAllNozzles()
      ]);

      setClients(clientsData);
      setNozzles(nozzlesData);
      setFilteredClients(clientsData.slice(0, 10));
    } catch (err) {
      setError('Error al cargar los datos iniciales');
      console.error('Error loading initial data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClientSelect = (client: Client) => {
    setSelectedClient(client);
    setClientSearchTerm(`${client.nombre} ${client.apellido}`);
    setShowClientDropdown(false);
    setFormData(prev => ({ ...prev, client_id: client.id }));
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setFormData(prev => ({
      ...prev,
      product_id: product.id,
      unit_price: product.precio
    }));
  };

  const handleNozzleSelect = (nozzle: Nozzle) => {
    setSelectedNozzle(nozzle);
    setFormData(prev => ({ ...prev, pump_id: nozzle.bomba_id }));
  };

  const handleInputChange = (field: keyof SaleFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateTotal = () => {
    const subtotal = formData.quantity * formData.unit_price;
    return Math.max(0, subtotal - formData.discount_amount);
  };

  const handleSubmit = async () => {
    try {
      // Validaciones
      if (!selectedClient) {
        setError('Debe seleccionar un cliente');
        return;
      }
      if (!selectedProduct) {
        setError('Debe seleccionar un producto');
        return;
      }
      if (!selectedNozzle) {
        setError('Debe seleccionar una boquilla');
        return;
      }
      if (formData.quantity <= 0) {
        setError('La cantidad debe ser mayor a 0');
        return;
      }

      setLoading(true);
      setError(null);

      const totalAmount = calculateTotal();
      const saleData: CreateSaleData = {
        client_id: selectedClient.id,
        employee_id: 1, // Esto debería venir del usuario logueado
        pump_id: formData.pump_id,
        product_id: formData.product_id,
        quantity: formData.quantity,
        unit_price: formData.unit_price,
        total_amount: totalAmount,
        discount_amount: formData.discount_amount,
        payment_method: formData.payment_method,
        notes: formData.notes
      };

      await saleService.createSale(saleData);
      setSuccess('Venta registrada exitosamente');

      // Limpiar formulario
      resetForm();

    } catch (err) {
      setError('Error al registrar la venta');
      console.error('Error creating sale:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      client_id: 0,
      pump_id: 0,
      product_id: 0,
      quantity: 0,
      unit_price: 0,
      discount_amount: 0,
      payment_method: 'efectivo',
      notes: ''
    });
    setSelectedClient(null);
    setSelectedProduct(null);
    setSelectedNozzle(null);
    setClientSearchTerm('');
  };

  const handleCancel = () => {
    if (window.confirm('¿Seguro que desea cancelar la venta?')) {
      resetForm();
    }
  };

  const handleClientCreated = (newClient: Client) => {
    setClients(prevClients => [...prevClients, newClient]);
    setFilteredClients(prevFilteredClients => [...prevFilteredClients, newClient]);
    setSelectedClient(newClient);
    setClientSearchTerm(`${newClient.nombre} ${newClient.apellido}`);
    setIsCreateClientModalOpen(false);
  };

  if (loading && clients.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-3 md:p-4 lg:p-6">
      {/* Mensajes de error y éxito */}
      {error && (
        <div className="bg-red-500 text-white p-3 rounded-lg mb-4">
          {error}
          <button
            onClick={() => setError(null)}
            className="float-right text-white hover:text-gray-200"
          >
            ×
          </button>
        </div>
      )}

      {success && (
        <div className="bg-green-500 text-white p-3 rounded-lg mb-4">
          {success}
          <button
            onClick={() => setSuccess(null)}
            className="float-right text-white hover:text-gray-200"
          >
            ×
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Sale Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Client Selection */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Cliente</h3>
            <div className="relative">
              <div className="flex items-center space-x-3">
                <User size={20} className="text-slate-400" />
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={clientSearchTerm}
                    onChange={(e) => {
                      setClientSearchTerm(e.target.value);
                      setShowClientDropdown(true);
                    }}
                    onFocus={() => setShowClientDropdown(true)}
                    placeholder="Buscar cliente por nombre o documento..."
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                  />
                  {showClientDropdown && filteredClients.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-slate-700 border border-slate-600 rounded-lg max-h-60 overflow-y-auto">
                      {filteredClients.map((client) => (
                        <div
                          key={client.id}
                          onClick={() => handleClientSelect(client)}
                          className="px-3 py-2 hover:bg-slate-600 cursor-pointer text-white"
                        >
                          <div className="font-medium">{client.nombre} {client.apellido}</div>
                          <div className="text-sm text-slate-400">{client.documento}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setIsCreateClientModalOpen(true)}
                  className="ml-2 p-2 bg-green-600 rounded-full text-white hover:bg-green-700 transition-colors"
                  title="Crear nuevo cliente"
                >
                  <Plus size={20} />
                </button>
              </div>
              {selectedClient && (
                <div className="mt-2 p-2 bg-slate-700 rounded text-sm text-slate-300">
                  Cliente seleccionado: {selectedClient.nombre} {selectedClient.apellido}
                </div>
              )}
            </div>
          </div>

          {/* Fuel Type Selection */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Tipo de combustible</h3>
            <div className="grid grid-cols-3 gap-4">
              {products.map((product) => (
                <FuelButton
                  key={product.id}
                  type={product.nombre}
                  selected={selectedProduct?.id === product.id}
                  onClick={() => handleProductSelect(product)}
                />
              ))}
            </div>
            {selectedProduct && (
              <div className="mt-2 p-2 bg-slate-700 rounded text-sm text-slate-300">
                Producto seleccionado: {selectedProduct.nombre} - ${selectedProduct.precio.toFixed(2)}
              </div>
            )}
          </div>

          {/* Nozzle Selection */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Boquilla</h3>
            <select
              value={selectedNozzle?.id || ''}
              onChange={(e) => {
                const nozzle = nozzles.find(n => n.id === parseInt(e.target.value));
                if (nozzle) handleNozzleSelect(nozzle);
              }}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500"
            >
              <option value="">Seleccionar boquilla...</option>
              {Array.isArray(nozzles) &&
                nozzles.filter(n => n.estado === 'activo').map(nozzle => (
                  <option key={nozzle.id} value={nozzle.id}>
                    Boquilla {nozzle.numero} - Bomba {nozzle.bomba?.numero || nozzle.bomba_id}
                  </option>
                ))
              }

            </select>
          </div>

          {/* Quantity and Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 flex flex-col gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Cantidad de galones</h3>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.quantity || ''}
                  onChange={(e) => handleInputChange('quantity', parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                  placeholder="Ingrese cantidad"
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Tipo de galón seleccionado</h3>
                <div className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white font-semibold text-center">
                  {selectedProduct?.nombre || 'Ninguno'}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">Precio unitario</h3>
                <div className="text-2xl font-bold text-white">
                  ${formData.unit_price.toFixed(2)}
                </div>
              </div>

              <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">Total</h3>
                <div className="text-2xl font-bold text-green-400">
                  ${calculateTotal().toFixed(2)}
                </div>
                <div className="text-sm text-slate-400">
                  Galones seleccionados: {formData.quantity}
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Método de pago</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { value: 'credito', label: 'Crédito' },
                { value: 'efectivo', label: 'Efectivo' },
                { value: 'tarjeta', label: 'Tarjeta' },
                { value: 'transferencia', label: 'Transferencia' }
              ].map((method) => (
                <button
                  key={method.value}
                  onClick={() => handleInputChange('payment_method', method.value)}
                  className={`py-2 px-4 rounded-lg font-medium transition-colors ${formData.payment_method === method.value
                    ? 'bg-orange-500 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                >
                  {method.label}
                </button>
              ))}
            </div>
          </div>

          {/* Discount and Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4">Descuento ($)</h3>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.discount_amount || ''}
                onChange={(e) => handleInputChange('discount_amount', parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                placeholder="0.00"
              />
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4">Observaciones</h3>
              <input
                type="text"
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                placeholder="Observaciones adicionales..."
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleCancel}
              disabled={loading}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 px-6 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {loading ? 'Registrando...' : 'Registrar Venta'}
            </button>
          </div>
        </div>

        {/* Right Column - Info Panels */}
        <div className="space-y-6">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Precios de Combustible</h3>
            <div className="space-y-3">
              {products.map((product) => (
                <div key={product.id} className="flex justify-between items-center">
                  <span className="text-slate-300">{product.nombre}</span>
                  <span className="text-white font-medium">${product.precio.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Boquillas Disponibles</h3>
            <div className="space-y-3">

              console.log('Nozzles en el render:', nozzles);

              {
                Array.isArray(nozzles) ? (
                  nozzles
                    .filter(n => n.estado === 'activo')
                    .slice(0, 5)
                    .map((nozzle) => (
                      <div key={nozzle.id} className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-slate-300">Boquilla {nozzle.numero}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-green-400">Activa</div>
                          <div className="text-slate-400 text-sm">Bomba {nozzle.bomba?.numero || nozzle.bomba_id}</div>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="text-red-400 text-xs">
                    Nozzles no es un array: {JSON.stringify(nozzles)}
                  </div>
                )
              }

            </div>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Resumen de Venta</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Cliente:</span>
                <span className="text-white">{selectedClient ? `${selectedClient.nombre} ${selectedClient.apellido}` : 'No seleccionado'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Producto:</span>
                <span className="text-white">{selectedProduct?.nombre || 'No seleccionado'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Cantidad:</span>
                <span className="text-white">{formData.quantity} gal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Precio unitario:</span>
                <span className="text-white">${formData.unit_price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Subtotal:</span>
                <span className="text-white">${(formData.quantity * formData.unit_price).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Descuento:</span>
                <span className="text-white">-${formData.discount_amount.toFixed(2)}</span>
              </div>
              <hr className="border-slate-600" />
              <div className="flex justify-between font-bold">
                <span className="text-slate-300">Total:</span>
                <span className="text-green-400">${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreateClientModal
        isOpen={isCreateClientModalOpen}
        onClose={() => setIsCreateClientModalOpen(false)}
        onClientCreated={handleClientCreated}
      />
    </div>
  );
};

export default VentasContent;
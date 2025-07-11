'use client';

import React, { useState, useEffect } from 'react';
// import FuelButton from '../../src/components/FuelButton'; // Comentar temporalmente
import { User, CreditCard, DollarSign, Fuel } from 'lucide-react';
// Importar servicios del backend - USAR LOS REALES
import saleService, { CreateSaleData } from '../../src/services/saleService';
import clientService, { Client } from '../../src/services/clientService';
import nozzleService, { Nozzle } from '../../src/services/nozzleService';

// Eliminar imports no usados:
// import { ArrowLeft, ClipboardList, Search, Plus } from 'lucide-react';
// import Select from 'react-select';
const mapClient = (c: any) => ({
  ...c,
  nombre: c.nombre || c.first_name || '',
  apellido: c.apellido || c.last_name || '',
  documento: c.documento || c.document_number || '',
  direccion: c.direccion || c.address || '',
  telefono: c.telefono || c.phone || '',
  email: c.email || '',
});

type FuelType = 'Diesel' | 'Premium' | 'Regular';

interface Product {
  id: number;
  nombre: 'Diesel' | 'Premium' | 'Regular';
  precio: number;
  tipo: string;
}

// Remover SaleFormData duplicada, usar CreateSaleData del servicio

const GrifoNewSale: React.FC = () => {
  // Estados del formulario original
  const [selectedFuel, setSelectedFuel] = useState<FuelType>('Premium');
  const [quantity, setQuantity] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('efectivo');
  const [selectedNozzle, setSelectedNozzle] = useState<string>('1');
  const [discount, setDiscount] = useState<string>('0');
  const [observations, setObservations] = useState<string>('');
  const [taxRate, setTaxRate] = useState<number>(0.18);
  const [taxAmount, setTaxAmount] = useState<number>(0);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [showClientSearch, setShowClientSearch] = useState<boolean>(true);

  // Estados para datos del servidor - USAR LAS INTERFACES REALES
  const [clients, setClients] = useState<Client[]>([]);
  const [nozzles, setNozzles] = useState<Nozzle[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [clientSearchTerm, setClientSearchTerm] = useState('');
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [selectedNozzleObj, setSelectedNozzleObj] = useState<Nozzle | null>(null);

  // Estados de UI
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Productos disponibles (esto debería venir de una API también)
  const [products] = useState<Product[]>([
    { id: 1, nombre: 'Diesel', precio: 3.00, tipo: 'diesel' },
    { id: 2, nombre: 'Premium', precio: 4.01, tipo: 'gasolina' },
    { id: 3, nombre: 'Regular', precio: 4.00, tipo: 'gasolina' },
  ]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const recentSales = [
    { client: 'Cahez Salurias', amount: 'S/ 33.05', status: 'completed' },
    { client: 'Malta Rertandez', amount: 'S/ 30.00', status: 'cancelled' },
  ];

  // Cargar datos iniciales del backend
  useEffect(() => {
    loadInitialData();
  }, []);

  // Filtrar clientes cuando cambia el término de búsqueda
  useEffect(() => {
    if (clientSearchTerm.trim() === '') {
      setFilteredClients(clients.slice(0, 10));
    } else {
      const filtered = clients.filter(client =>
        `${client.nombre} ${client.apellido}`.toLowerCase().includes(clientSearchTerm.toLowerCase()) ||
        client.documento.includes(clientSearchTerm)
      );
      setFilteredClients(filtered.slice(0, 10));
    }
  }, [clientSearchTerm, clients]);

  // Calcular subtotal, impuesto y total
  useEffect(() => {
    const qty = Number(quantity) || 0;
    const price = selectedProduct?.precio || 0;
    const desc = Number(discount) || 0;

    // Define la tasa según el combustible
    let tax = 0.18;
    if (selectedFuel === 'Diesel') tax = 0.12;
    else if (selectedFuel === 'Premium') tax = 0.18;
    else if (selectedFuel === 'Regular') tax = 0.16;

    setTaxRate(tax);

    const sub = qty * price - desc;
    const taxVal = sub * tax;
    setTaxAmount(taxVal);
    setSubtotal(sub + taxVal);
  }, [quantity, selectedFuel, discount, selectedProduct]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [clientsData, nozzlesData] = await Promise.all([
        clientService.getAllClients(),
        nozzleService.getAllNozzles()
      ]);
      console.log('Nozzles del backend:', nozzlesData);

      const mappedClients = clientsData.map(mapClient);
      setClients(mappedClients);
      setFilteredClients(mappedClients.slice(0, 10));
      setNozzles(nozzlesData);
    } catch (err) {
      setError('Error al cargar los datos iniciales');
    } finally {
      setLoading(false);
    }
  };


  const handleClientSelect = (client: Client) => {
    setSelectedClient(client);
    setClientSearchTerm(`${client.nombre} ${client.apellido}`);
    setShowClientDropdown(false);
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setSelectedFuel(product.nombre as FuelType);
  };

  const handleNozzleSelect = (nozzleId: string) => {
    setSelectedNozzle(nozzleId);
    const nozzle = nozzles.find(n => n.id === parseInt(nozzleId));
    if (nozzle) {
      setSelectedNozzleObj(nozzle);
    }
  };

  const calculateTotal = () => {
    const qty = Number(quantity) || 0;
    const price = selectedProduct?.precio || 0;
    const disc = Number(discount) || 0;
    const subtotal = qty * price;
    return Math.max(0, subtotal - disc);
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
      if (!selectedNozzleObj) {
        setError('Debe seleccionar una boquilla');
        return;
      }
      if (Number(quantity) <= 0) {
        setError('La cantidad debe ser mayor a 0');
        return;
      }

      setLoading(true);
      setError(null);

      const totalAmount = calculateTotal();
      const saleData: CreateSaleData = {
        client_id: selectedClient.id,
        employee_id: 1, // Esto debería venir del usuario logueado
        pump_id: selectedNozzleObj.bomba_id,
        product_id: selectedProduct.id,
        quantity: Number(quantity),
        unit_price: selectedProduct.precio,
        total_amount: totalAmount,
        discount_amount: Number(discount),
        payment_method: paymentMethod.toLowerCase(),
        notes: observations
      };

      console.log('Enviando venta:', saleData);
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
    setSelectedClient(null);
    setSelectedProduct(null);
    setSelectedNozzleObj(null);
    setClientSearchTerm('');
    setQuantity('');
    setDiscount('0');
    setObservations('');
    setSelectedNozzle('1');
    setPaymentMethod('efectivo');
  };

  const handleCancel = () => {
    if (window.confirm('¿Seguro que desea cancelar la venta?')) {
      resetForm();
    }
  };

  if (loading && clients.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Cargando datos del servidor...</div>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-6 lg:p-10 space-y-10 max-w-7xl mx-auto bg-[#101426] min-h-screen">
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

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-4">
        <div className="flex items-center gap-4">
          <Fuel className="text-orange-500" size={40} />
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white">Nueva Venta</h1>
            <p className="text-slate-400 text-base">Registro rápido de ventas de combustible</p>
          </div>
        </div>
        <div className="flex items-center gap-6 mt-4 lg:mt-0">
          <span className="text-slate-300 text-lg">Turno: <span className="font-semibold text-white">Mañana</span></span>
          <span className="text-slate-300 text-lg">Empleado: <span className="font-semibold text-white">Juan Pérez</span></span>
        </div>
      </div>

      {/* Cliente con búsqueda del backend */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-2xl font-bold text-white">Cliente</h3>
          <button
            onClick={() => setShowClientSearch((prev) => !prev)}
            className={`px-5 py-2 rounded-lg font-semibold transition-colors text-base ${showClientSearch
                ? 'bg-orange-500 text-white hover:bg-orange-600'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
          >
            {showClientSearch ? 'Desactivar búsqueda' : 'Activar búsqueda'}
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Contenedor buscador con dropdown del backend */}
          <div className={`bg-slate-800 border border-slate-700 rounded-2xl px-6 py-6 shadow w-full md:w-1/2 flex items-center gap-3 transition-colors duration-200 ${!showClientSearch ? 'opacity-60' : ''} relative`}>
            <User size={24} className="text-blue-400" />
            <div className="flex-1 relative">
              <input
                type="text"
                value={clientSearchTerm}
                onChange={(e) => {
                  setClientSearchTerm(e.target.value);
                  setShowClientDropdown(true);
                }}
                onFocus={() => setShowClientDropdown(true)}
                className={`w-full border border-slate-600 rounded-lg px-6 py-3 text-white text-lg font-semibold focus:outline-none transition ${showClientSearch ? 'bg-slate-700' : 'bg-slate-700 cursor-not-allowed'}`}
                placeholder="Buscar cliente por nombre o DNI..."
                autoComplete="off"
                disabled={!showClientSearch}
                readOnly={!showClientSearch}
              />
              {showClientDropdown && filteredClients.length > 0 && showClientSearch && (
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
          </div>

          {/* Contenedor información del cliente seleccionado */}
          <div className="bg-slate-800 border border-slate-700 rounded-2xl px-6 py-6 shadow w-full md:w-1/2 flex items-center gap-8">
            <span className="text-slate-400 text-base font-semibold">
              Nombre: <span className="text-white text-lg font-semibold">
                {selectedClient ? `${selectedClient.nombre} ${selectedClient.apellido}` : '---'}
              </span>
            </span>
            <span className="text-slate-400 text-base font-semibold">
              DNI: <span className="text-white text-lg font-semibold">
                {selectedClient ? selectedClient.documento : '---'}
              </span>
            </span>
            <span className="text-slate-400 text-base font-semibold">
              Email: <span className="text-white text-lg font-semibold">
                {selectedClient ? selectedClient.email || 'No disponible' : '---'}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Segunda fila: tipo de combustible con nozzles del backend */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow flex flex-col gap-6 justify-center items-center w-full md:col-span-2">
          <div className="w-full flex flex-row items-center justify-between gap-2 mb-2">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 m-0">
              <Fuel size={22} className="text-yellow-400" />
              Tipo de combustible
            </h3>
            <div className="flex gap-0">
              {nozzles.filter(n => n.estado === 'activo').slice(0, 3).map((nozzle, idx) => (
                <button
                  key={nozzle.id}
                  onClick={() => handleNozzleSelect(nozzle.id.toString())}
                  className={`px-3 py-1.5 rounded-md font-semibold text-sm transition-colors ${selectedNozzle === nozzle.id.toString()
                      ? 'bg-orange-500 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    } ${idx !== 0 ? 'ml-[-1px]' : ''}`}
                >
                  Boquilla {nozzle.numero}
                </button>
              ))}
            </div>
          </div>

          {/* Botones de combustible del backend */}
          <div className="flex gap-4 mt-8 justify-center">
            {products.map((product) => {
              let bg = '';
              if (product.nombre === 'Regular') {
                bg = selectedProduct?.id === product.id ? 'bg-red-500 text-white' : 'bg-slate-700 text-red-300';
              } else if (product.nombre === 'Premium') {
                bg = selectedProduct?.id === product.id ? 'bg-green-700 text-white' : 'bg-slate-700 text-green-300';
              } else if (product.nombre === 'Diesel') {
                bg = selectedProduct?.id === product.id ? 'bg-purple-700 text-white' : 'bg-slate-700 text-purple-300';
              }
              return (
                <button
                  key={product.id}
                  onClick={() => handleProductSelect(product)}
                  className={`flex flex-col items-center justify-center rounded-xl transition-all duration-200 font-bold text-2xl w-48 h-48 gap-4 border border-slate-600 hover:scale-105 ${bg}`}
                  style={{ minWidth: '192px', minHeight: '192px' }}
                >
                  <Fuel size={48} />
                  {product.nombre}
                </button>
              );
            })}
          </div>
        </div>

        {/* Precios de combustible del backend */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow flex flex-col gap-5 justify-center">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Fuel size={20} className="text-yellow-400" />
            Precios de Combustible
          </h3>
          <div className="space-y-3">
            {products.map((product, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-slate-300 text-lg">{product.nombre}</span>
                <span className="text-white font-medium text-lg">S/ {product.precio.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Galones, precio, impuesto y total */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-slate-800 border border-slate-600 rounded-xl flex flex-col items-center justify-center py-8 px-6 shadow-sm md:col-span-1">
          <h3 className="text-xl font-semibold text-white mb-4 text-center">Cantidad de galones</h3>
          <input
            type="number"
            min="0"
            step="0.01"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-40 h-12 text-xl text-center bg-slate-700 border border-slate-500 rounded-lg text-white font-medium mb-2 focus:outline-none focus:border-orange-400 transition shadow"
            placeholder="Ingrese"
          />
          <div className="text-slate-400 text-sm mt-1 text-center">
            Galón: <span className="font-semibold text-white">{selectedProduct?.nombre || 'No seleccionado'}</span>
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-600 rounded-xl flex flex-col items-center justify-center py-6 px-4 shadow-sm">
          <span className="text-base text-slate-400 mb-1">Precio unitario</span>
          <span className="text-xl font-bold text-green-400">
            S/ {selectedProduct?.precio.toFixed(2) || '0.00'}
          </span>
        </div>

        <div className="bg-slate-800 border border-slate-600 rounded-xl flex flex-col items-center justify-center py-6 px-4 shadow-sm">
          <span className="text-base text-slate-400 mb-1">Impuesto</span>
          <span className="text-xl font-bold text-blue-400">
            S/ {taxAmount.toFixed(2)}
          </span>
          <span className="text-xs text-slate-400 mt-1">
            IGV ({Math.round(taxRate * 100)}%)
          </span>
        </div>

        <div className="bg-slate-800 border border-slate-600 rounded-xl flex flex-col items-center justify-center py-6 px-4 shadow-sm">
          <span className="text-base text-slate-400 mb-1">Total</span>
          <span className="text-2xl font-bold text-orange-400 mb-1">
            S/ {subtotal.toFixed(2)}
          </span>
          <span className="text-xs text-slate-400">Galones: {quantity || 0}</span>
        </div>
      </div>

      {/* Método de pago, Descuento y Observaciones */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow flex flex-col gap-5">
          <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
            <CreditCard size={20} className="text-green-400" />
            Método de pago
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {['Credito', 'Efectivo', 'Tarjeta', 'Transferencia'].map((method) => (
              <button
                key={method}
                onClick={() => setPaymentMethod(method)}
                className={`py-3 px-4 rounded-lg font-medium transition-colors text-sm text-center min-h-[48px] ${paymentMethod === method
                    ? 'bg-orange-500 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
              >
                {method}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow flex flex-col gap-5">
          <h3 className="text-lg font-semibold text-white mb-1">Descuento</h3>
          <input
            type="number"
            min="0"
            step="0.01"
            value={discount}
            onChange={e => setDiscount(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white text-base focus:outline-none focus:border-orange-500"
            placeholder="Ingrese descuento"
          />
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow flex flex-col gap-5">
          <h3 className="text-lg font-semibold text-white mb-1">Observaciones</h3>
          <input
            type="text"
            value={observations}
            onChange={e => setObservations(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white text-base focus:outline-none focus:border-orange-500"
            placeholder="Ingrese observaciones"
          />
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex flex-col sm:flex-row gap-6 pt-2">
        <button
          onClick={handleCancel}
          disabled={loading}
          className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-4 px-8 rounded-lg font-medium transition-colors text-lg disabled:opacity-50"
        >
          Cancelar
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-4 px-8 rounded-lg font-bold transition-colors text-lg disabled:opacity-50"
        >
          {loading ? 'Registrando...' : 'Registrar Venta'}
        </button>
      </div>

      {/* Sidebar derecho: Ventas recientes */}
      <div className="mt-10 flex flex-col gap-8">
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <DollarSign size={20} className="text-green-400" />
              Ventas recientes
            </h3>
            <span className="text-lg font-semibold text-white">Estado</span>
          </div>
          <div className="space-y-4">
            {recentSales.map((sale, index) => (
              <div
                key={index}
                className="grid grid-cols-3 items-center py-2"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-slate-600 rounded-full"></div>
                  <span className="text-slate-300 text-base">{sale.client}</span>
                </div>
                <div className="text-green-400 text-lg text-center">{sale.amount}</div>
                <div className="flex justify-end">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${sale.status === 'completed'
                      ? 'bg-green-700 text-white'
                      : 'bg-red-700 text-white'
                    }`}>
                    {sale.status === 'completed' ? 'Completada' : 'Cancelada'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrifoNewSale;


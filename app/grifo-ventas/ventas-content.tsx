'use client';

import React, { useState } from 'react';
import FuelButton from '../../src/components/FuelButton';
import { ArrowLeft, User } from 'lucide-react';

interface FuelPrice {
  type: string;
  price: string;
}

const GrifoNewSale: React.FC = () => {
  const [selectedFuel, setSelectedFuel] = useState<string>('Premium');
  const [selectedClient, setSelectedClient] = useState<string>('Jabs Plixez');
  const [pumpNumber, setPumpNumber] = useState<string>('2');
  const [quantity, setQuantity] = useState<string>('');
  const [amount, setAmount] = useState<string>('9.40');
  const [total, setTotal] = useState<string>('37.40');
  const [paymentMethod, setPaymentMethod] = useState<string>('Credito');

  const fuelPrices: FuelPrice[] = [
    { type: 'Derrel', price: '$3.00' },
    { type: 'Premium', price: '$4.01' },
    { type: 'Regular', price: '$4.00' },
  ];

  const availableStock = [
    { name: 'Bsucimies', available: 102, total: 10 },
    { name: 'Melgardo', available: 107, total: 11 },
  ];

  const recentSales = [
    { client: 'Cahez Salurias', amount: '$33.05' },
    { client: 'Malta Rertandez', amount: '$30.00' },
  ];

  return (
    <div className="space-y-4 p-3 md:p-4 lg:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Sale Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Client Selection */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Cliente</h3>
            <div className="flex items-center space-x-3">
              <User size={20} className="text-slate-400" />
              <select
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500"
              >
                <option value="Jabs Plixez">Jabs Plixez</option>
                <option value="Otro Cliente">Otro Cliente</option>
              </select>
            </div>
          </div>

          {/* Fuel Type Selection */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Tipo de combustible</h3>
            <div className="grid grid-cols-3 gap-4">
              <FuelButton
                type="Diesel"
                selected={selectedFuel === 'Diesel'}
                onClick={() => setSelectedFuel('Diesel')}
              />
              <FuelButton
                type="Premium"
                selected={selectedFuel === 'Premium'}
                onClick={() => setSelectedFuel('Premium')}
              />
              <FuelButton
                type="Regular"
                selected={selectedFuel === 'Regular'}
                onClick={() => setSelectedFuel('Regular')}
              />
            </div>
          </div>

          {/* Pump, Quantity, and Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 flex flex-col gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Cantidad de galones</h3>
                <input
                  type="number"
                  min="0"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                  placeholder="Ingrese cantidad"
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Tipo de galón seleccionado</h3>
                <div className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white font-semibold text-center">
                  {selectedFuel || 'Ninguno'}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">Precio unitario</h3>
                <div className="text-2xl font-bold text-white">
                  {
                    fuelPrices.find(f => f.type === selectedFuel)?.price
                      ? `$${Number(fuelPrices.find(f => f.type === selectedFuel)?.price.replace('$', '')).toFixed(2)}`
                      : '$0.00'
                  }
                </div>
              </div>

              <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">Total</h3>
                <div className="text-2xl font-bold text-green-400">
                  ${Number(total).toFixed(2)}
                </div>
                <div className="text-sm text-slate-400">Galones seleccionados: {quantity || 0}</div>
              </div>
            </div>
          </div>

            {/* Payment Method */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4">Método de pago</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {['Crédito', 'Efectivo', 'Yape', 'Transferencia'].map((method) => (
                <button
                key={method}
                onClick={() => setPaymentMethod(method)}
                className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                  paymentMethod === method
                  ? 'bg-orange-500 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
                >
                {method}
                </button>
              ))}
              </div>
            </div>

          {/* Discount and Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4">Descuento</h3>
              <input
                type="text"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4">Observaciones</h3>
              <input
                type="text"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
            <button
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
              onClick={() => {
              if (window.confirm('¿Seguro que desea cancelar la compra?')) {
                // Aquí puedes agregar la lógica para cancelar, por ejemplo, limpiar el formulario o redirigir
              }
              }}
            >
              Cancelar
            </button>
            <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-medium transition-colors">
              Registar Venta
            </button>
            </div>
        </div>

        {/* Right Column - Info Panels */}
        <div className="space-y-6">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Precios de Combustible</h3>
            <div className="space-y-3">
              {fuelPrices.map((fuel, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-slate-300">{fuel.type}</span>
                  <span className="text-white font-medium">{fuel.price}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Combustibles disponibles</h3>
            <div className="space-y-3">
              {availableStock.map((stock, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-slate-300">{stock.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400">{stock.available}</div>
                    <div className="text-slate-400 text-sm">{stock.total}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Registro de Ventas</h3>
            <div className="text-slate-400 text-sm mb-3">Ser Rey</div>
            <div className="space-y-3">
              {recentSales.map((sale, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-slate-600 rounded-full"></div>
                    <span className="text-slate-300">{sale.client}</span>
                  </div>
                  <span className="text-green-400">{sale.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrifoNewSale;

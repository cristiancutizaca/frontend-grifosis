'use client'

import React, { useEffect,  useState } from 'react'
import moment from 'moment'
import 'moment/locale/es'
import { ShoppingCartIcon } from 'lucide-react'
moment.locale('es')

const categories = [
  'combustible',
  'activo',
  'accesorio',
  'otros',
];
const fuelTypes = [
  'diesel',
  'premium',
  'regular',
  'Ninguno',
];
const units = [
  'galón',
  'litro',
  'unidad',
  'kg',
  'otro',
];

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  fuel_type: string | null;
  unit: string;
  unit_price: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: 'Gasohol 95',
    description: 'Combustible premium para vehículos',
    category: 'combustible',
    fuel_type: 'premium',
    unit: 'galón',
    unit_price: 22.5,
    is_active: true,
    created_at: '2024-06-01T10:00:00Z',
    updated_at: '2024-06-01T10:00:00Z',
  },
  {
    id: 2,
    name: 'Aceite Motor',
    description: 'Aceite sintético para motor',
    category: 'accesorio',
    fuel_type: null,
    unit: 'litro',
    unit_price: 15.0,
    is_active: true,
    created_at: '2024-06-01T10:00:00Z',
    updated_at: '2024-06-01T10:00:00Z',
  },
];

const GrifoInventarioContent: React.FC = () => {
    // Variables públicas (usadas en la vista)
    const [currentTime, setCurrentTime] = useState<string | null>(null)
    const [currentMonth] = useState(moment());
    const startOfMonth = currentMonth.clone().startOf('month');
    const daysInMonth = currentMonth.daysInMonth();
    const startDay = startOfMonth.day();

    const combustibles = [
      { nombre: 'REGULAR', color: 'bg-red-500', cantidad: 100000 },
      { nombre: 'PREMIUN', color: 'bg-green-500', cantidad: 50000 },
      { nombre: 'DIESEL', color: 'bg-fuchsia-500', cantidad: 200000 },
    ];

    // Galones actuales (esto podría venir de una lógica más adelante)
    const galonesActuales = 10000;
    // Botones de galones disponibles
    const botonesGalones = [10, 20, 50, 100, 200, 300, 600, 900, '1k', '2k', '10k', '15k'];

    const historialLlenado = [
      { cantidad: '50.000 GALONES', fecha: '24/06/2025', hora: '10:30 AM' },
      { cantidad: '150.000 GALONES', fecha: '01/08/2025', hora: '12:05 PM' },
      { cantidad: '300.000 GALONES', fecha: '12/12/2025', hora: '15:26 PM' },
    ];

    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [form, setForm] = useState<Partial<Product>>({
      name: '',
      description: '',
      category: 'combustible',
      fuel_type: 'premium',
      unit: 'galón',
      unit_price: 0,
      is_active: true,
    });

    const handleOpenModal = (product?: Product) => {
      if (product) {
        setEditingProduct(product);
        setForm(product);
      } else {
        setEditingProduct(null);
        setForm({
          name: '',
          description: '',
          category: 'combustible',
          fuel_type: 'premium',
          unit: 'galón',
          unit_price: 0,
          is_active: true,
        });
      }
      setShowModal(true);
    };

    const handleCloseModal = () => {
      setShowModal(false);
      setEditingProduct(null);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value, type } = e.target;
      setForm((prev) => ({
        ...prev,
        [name]: type === 'number' ? Number(value) : value,
      }));
    };

    const handleSave = () => {
      if (!form.name || !form.unit_price) return;
      if (editingProduct) {
        setProducts((prev) =>
          prev.map((p) =>
            p.id === editingProduct.id
              ? { ...p, ...form, updated_at: new Date().toISOString() } as Product
              : p
          )
        );
      } else {
        setProducts((prev) => [
          ...prev,
          {
            ...(form as Product),
            id: prev.length ? Math.max(...prev.map((p) => p.id)) + 1 : 1,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ]);
      }
      setShowModal(false);
      setEditingProduct(null);
    };

    const handleDelete = (id: number) => {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    };

    useEffect(() => {
      const updateTime = () => setCurrentTime(moment().format('hh:mm:ss A'))
      updateTime()
      const interval = setInterval(updateTime, 1000)
      return () => clearInterval(interval)
    }, [])

    return (
            <div className="p-3 sm:p-4 lg:p-6 bg-blue min-h-screen">
              <div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 mb-4 lg:mb-6">
                    <div className="lg:col-span-4 flex flex-col lg:h-full space-y-3 lg:space-y-4">
                        {/* Hora */}
                        <div className="flex-1 bg-slate-800 p-3 lg:p-4 rounded-lg flex flex-col justify-center items-center">
                        <h2 className="text-white text-lg lg:text-xl font-bold">HORA</h2>
                        <p className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mt-2">{ currentTime ?? 'Cargando...' }</p>
                        </div>
                        {/* Inventario */}
                        <div className="flex-1 bg-slate-800 p-3 lg:p-4 rounded-lg flex flex-col justify-center items-center">
                        <h2 className="text-white text-lg lg:text-xl font-bold">INVENTARIO</h2>
                        </div>
                    </div>

                    {/* Calendario */}
                    <div className="lg:col-span-8 bg-slate-800 p-3 lg:p-4 rounded-lg">
                        <h2 className="text-green-400 text-center text-lg lg:text-xl font-bold mb-3 lg:mb-4">
                          { currentMonth.format('MMMM').toUpperCase() }
                        </h2>
                        <div className="grid grid-cols-7 gap-1 text-center text-white text-xs sm:text-sm">
                          {['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'].map(day => (
                            <div key={ day } className="font-bold text-green-400 p-1">{ day }</div>
                          ))}

                          {Array(startDay).fill(null).map((_, i) => (
                            <div key={`empty-${i}`}></div>
                          ))}

                          {/* Días del mes actual */}
                          {[...Array(daysInMonth)].map((_, i) => {
                            const day = i + 1;
                            const isToday = moment().date() === day && moment().month() === currentMonth.month();
                            return (
                              <div key={day} className={`p-1 lg:p-2 rounded-full text-yellow-400 ${isToday ? 'bg-green-700' : ''}`} >
                                {day}
                              </div>
                            );
                          })}
                        </div>
                    </div>
                </div>

                {/* Sección Central: Combustible y Entrada de Galones */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 lg:gap-4 mb-4 lg:mb-6">
                    {/* Combustible */}
                    <div className="xl:col-span-8 bg-slate-800 p-3 lg:p-4 rounded-lg">
                        <h2 className="text-white text-center text-lg lg:text-xl font-bold mb-3 lg:mb-4">COMBUSTIBLE</h2>
                        <div className="space-y-3 lg:space-y-4">
                          {combustibles.map((comb, i) => {
                            const porcentaje = Math.max((comb.cantidad / 200000) * 100, 5);
                            return (
                              <div key={i}>
                                <p className="text-white text-base lg:text-lg mb-1 lg:mb-2">{comb.nombre}</p>
                                <div className="bg-gray-700 rounded-full h-10 lg:h-12 flex items-center p-1">
                                  <div
                                    className={`${comb.color} h-8 lg:h-10 rounded-full flex items-center justify-center`}
                                    style={{ width: `${porcentaje}%` }}
                                  >
                                    <span className="text-white font-bold text-sm lg:text-base">
                                      {comb.cantidad.toLocaleString()}K
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                    </div>

                    {/* Entrada de Galones */}
                    <div className="xl:col-span-4 bg-slate-800 p-3 lg:p-4 rounded-lg flex flex-col">
                      <div className="bg-gray-700 p-3 lg:p-4 rounded-lg text-white text-center text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 lg:mb-4 flex justify-center items-center">
                        {galonesActuales.toLocaleString()} <span className="text-sm lg:text-lg ml-2">GAL</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 lg:gap-2 text-center flex-grow">
                        {botonesGalones.map((amount, i) => (
                          <button
                            key={i}
                            className="bg-gray-700 text-white p-2 lg:p-3 rounded-lg text-sm lg:text-lg font-bold hover:bg-gray-600 transition-colors duration-200"
                          >
                            {amount} <span className="text-xs lg:text-sm">GAL</span>
                          </button>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-3 lg:mt-4">
                        <button className="bg-red-600 text-white p-2 lg:p-3 rounded-lg text-lg lg:text-xl font-bold flex-grow hover:bg-red-700 transition-colors duration-200">
                          LLENAR
                        </button>
                        <button className="bg-green-600 text-white p-2 lg:p-3 rounded-lg text-lg lg:text-xl font-bold flex-grow hover:bg-green-700 transition-colors duration-200">
                          MANUAL
                        </button>
                      </div>
                    </div>
                </div>

                {/* Sección Inferior: Tabla de Cantidades */}
                <div className="bg-slate-800 p-3 lg:p-4 rounded-lg">
                  <div className="hidden sm:grid grid-cols-3 gap-2 lg:gap-4 text-white font-bold text-base lg:text-lg mb-2 border-b border-gray-700 pb-2">
                    <div>CANTIDAD (GAL)</div>
                    <div>FECHA</div>
                    <div>HORA</div>
                  </div>
                  
                  {/* Vista móvil - tarjetas */}
                  <div className="sm:hidden space-y-3">
                    {historialLlenado.length > 0 ? (
                      historialLlenado.map((registro, index) => (
                        <div key={index} className="bg-gray-700 p-3 rounded-lg">
                          <div className="text-white font-bold text-lg mb-1">{registro.cantidad}</div>
                          <div className="flex justify-between text-gray-300 text-sm">
                            <span>{registro.fecha}</span>
                            <span>{registro.hora}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-gray-400 py-4">No hay registros aún.</div>
                    )}
                  </div>
                  
                  {/* Vista tablet/desktop - tabla */}
                  <div className="hidden sm:block space-y-2 text-white text-sm lg:text-base">
                    {historialLlenado.length > 0 ? (
                      historialLlenado.map((registro, index) => (
                        <div key={index} className="grid grid-cols-3 gap-2 lg:gap-4 py-2 hover:bg-gray-700 rounded transition-colors duration-200">
                          <div className="font-medium">{registro.cantidad}</div>
                          <div className="text-gray-300">{registro.fecha}</div>
                          <div className="text-gray-300">{registro.hora}</div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center col-span-3 text-gray-400 py-4">No hay registros aún.</div>
                    )}
                  </div>
                </div>
              </div>

              <br/>
              <div>
                {/* Header */}
                <div className="bg-slate-800 rounded-2xl p-3 sm:p-4 lg:p-6 border border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      <ShoppingCartIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-white">Gestión de Productos</h1>
                      <p className="text-xs sm:text-sm text-slate-400">Administra los productos del grifo</p>
                    </div>
                  </div>
                  <div className="w-full sm:w-auto">
                    <button
                      onClick={() => handleOpenModal()}
                      className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:shadow-orange-500/30 min-w-0 sm:min-w-[180px] text-base sm:text-lg"
                    >
                      <span className="text-lg font-bold">+</span> Agregar Producto
                    </button>
                  </div>
                </div>

                {/* Tabla de productos */}
                <div className="bg-slate-800 rounded-2xl p-4 lg:p-6 border border-slate-700">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-700">
                      <thead className="bg-slate-700/50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Nombre</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Descripción</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Categoría</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Tipo Combustible</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Unidad</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Precio Unidad</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Estado</th>
                          <th className="px-4 py-3 text-center text-xs font-medium text-slate-300 uppercase tracking-wider">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="bg-slate-800 divide-y divide-slate-700">
                        {products.map((prod) => (
                          <tr key={prod.id} className="hover:bg-slate-700/30 transition-colors">
                            <td className="px-4 py-3 text-white font-medium">{prod.name}</td>
                            <td className="px-4 py-3 text-slate-300">{prod.description}</td>
                            <td className="px-4 py-3">
                              <span className="px-2 py-1 rounded-full text-xs font-semibold border "
                                style={{
                                  background: prod.category === 'combustible' ? 'rgba(251, 146, 60, 0.2)' : prod.category === 'activo' ? 'rgba(59, 130, 246, 0.2)' : prod.category === 'accesorio' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(107, 114, 128, 0.2)',
                                  color: prod.category === 'combustible' ? '#fb923c' : prod.category === 'activo' ? '#3b82f6' : prod.category === 'accesorio' ? '#10b981' : '#9ca3af',
                                  borderColor: prod.category === 'combustible' ? '#fb923c' : prod.category === 'activo' ? '#3b82f6' : prod.category === 'accesorio' ? '#10b981' : '#9ca3af',
                                }}
                              >
                                {prod.category}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-slate-300">{prod.fuel_type || '-'}</td>
                            <td className="px-4 py-3 text-slate-300">{prod.unit}</td>
                            <td className="px-4 py-3 text-slate-300">S/ {prod.unit_price.toFixed(2)}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 inline-flex text-xs font-semibold rounded-full ${prod.is_active ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'}`}>
                                {prod.is_active ? 'Activo' : 'Inactivo'}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <button
                                onClick={() => handleOpenModal(prod)}
                                className="text-blue-400 hover:text-blue-300 mr-2 font-bold"
                                title="Editar"
                              >
                                ✏️
                              </button>
                              <button
                                onClick={() => handleDelete(prod.id)}
                                className="text-red-400 hover:text-red-300 font-bold"
                                title="Eliminar"
                              >
                                🗑️
                              </button>
                            </td>
                          </tr>
                        ))}
                        {products.length === 0 && (
                          <tr>
                            <td colSpan={8} className="text-center text-slate-400 py-8">No hay productos registrados.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Modal de producto */}
                {showModal && (
                  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-800 rounded-2xl border border-slate-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                      <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-white">{editingProduct ? 'Editar Producto' : 'Agregar Producto'}</h2>
                        {editingProduct && (
                          <div className="text-sm text-slate-300">
                            <p>📅 Fecha de Creación: {new Date(editingProduct.created_at).toLocaleString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                            <p>🔄 Última Modificación: {new Date(editingProduct.updated_at).toLocaleString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                          </div>
                        )}
                        <button
                          onClick={handleCloseModal}
                          className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white"
                        >
                          <span className="text-2xl">×</span>
                        </button>
                      </div>

                      <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-slate-300 mb-2">Nombre</label>
                              <input
                                type="text"
                                name="name"
                                value={form.name || ''}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                placeholder="Nombre del producto"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-300 mb-2">Descripción</label>
                              <textarea
                                name="description"
                                value={form.description || ''}
                                onChange={handleChange}
                                rows={3}
                                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                                placeholder="Descripción del producto"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-300 mb-2">Categoría</label>
                              <select
                                name="category"
                                value={form.category || ''}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                              >
                                {categories.map((cat) => (
                                  <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-300 mb-2">Unidad de Medida</label>
                              <select
                                name="unit"
                                value={form.unit || ''}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                              >
                                {units.map((u) => (
                                  <option key={u} value={u}>{u.charAt(0).toUpperCase() + u.slice(1)}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-slate-300 mb-2">Tipo de Combustible</label>
                              <select
                                name="fuel_type"
                                value={form.fuel_type || 'Ninguno'}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                disabled={form.category !== 'combustible'}
                              >
                                {fuelTypes.map((ft) => (
                                  <option key={ft} value={ft === 'Ninguno' ? '' : ft}>{ft}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-300 mb-2">Precio por Unidad</label>
                              <input
                                type="number"
                                name="unit_price"
                                value={form.unit_price || ''}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                min={0}
                                step={0.01}
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-300 mb-3">Estado</label>
                              <div className="flex gap-3">
                                <button
                                  type="button"
                                  className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                                    form.is_active
                                      ? 'bg-green-500 text-white shadow-lg'
                                      : 'bg-slate-700 text-slate-300 border border-slate-600 hover:bg-slate-600'
                                  }`}
                                  onClick={() => setForm((prev) => ({ ...prev, is_active: true }))}
                                >
                                  Activo
                                </button>
                                <button
                                  type="button"
                                  className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                                    !form.is_active
                                      ? 'bg-red-500 text-white shadow-lg'
                                      : 'bg-slate-700 text-slate-300 border border-slate-600 hover:bg-slate-600'
                                  }`}
                                  onClick={() => setForm((prev) => ({ ...prev, is_active: false }))}
                                >
                                  Inactivo
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-700">
                          <button
                            onClick={handleCloseModal}
                            className="px-6 py-3 bg-slate-600 hover:bg-slate-500 text-white font-medium rounded-lg transition-colors"
                          >
                            Cancelar
                          </button>
                          <button
                            onClick={handleSave}
                            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium rounded-lg transition-all shadow-lg"
                          >
                            Guardar Producto
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>
          )
}

export default GrifoInventarioContent

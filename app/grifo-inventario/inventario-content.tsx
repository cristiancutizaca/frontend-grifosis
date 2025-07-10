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

// Datos de ejemplo para tanques y dispensadores
const initialTanks = [
  { id: 1, nombre: 'Tanque 1', tipo: 'Regular', medidor: 12000 },
  { id: 2, nombre: 'Tanque 2', tipo: 'Premium', medidor: 8000 },
  { id: 3, nombre: 'Tanque 3', tipo: 'Diesel', medidor: 15000 },
  { id: 4, nombre: 'Tanque 4', tipo: 'Regular', medidor: 9000 },
];

// Solo 3 dispensadores, igual que el dashboard
const initialDispensers = [
  { id: 1, nombre: 'Dispensador 1', tipo: 'Regular', medidor: 5000 },
  { id: 2, nombre: 'Dispensador 2', tipo: 'Premium', medidor: 3500 },
  { id: 3, nombre: 'Dispensador 3', tipo: 'Diesel', medidor: 7000 },
];

// Cambia la estructura de dispenserConnections para que cada producto tenga su propio medidor editable
const dispenserConnections = [
  {
    id: 1,
    productos: [
      { tipo: 'Regular', tanque: 'Tanque 1', medidor: 1200 },
      { tipo: 'Premium', tanque: 'Tanque 2', medidor: 800 },
      { tipo: 'Diesel 2', tanque: 'Tanque 4', medidor: 900 },
    ],
  },
  {
    id: 2,
    productos: [
      { tipo: 'Regular', tanque: 'Tanque 1', medidor: 1100 },
      { tipo: 'Premium', tanque: 'Tanque 2', medidor: 700 },
      { tipo: 'Diesel', tanque: 'Tanque 3', medidor: 1300 },
    ],
  },
  {
    id: 3,
    productos: [
      { tipo: 'Regular', tanque: 'Tanque 1', medidor: 1000 },
      { tipo: 'Diesel', tanque: 'Tanque 3', medidor: 1200 },
      { tipo: 'Diesel 2', tanque: 'Tanque 4', medidor: 800 },
    ],
  },
];

const GrifoInventarioContent: React.FC = () => {
    // Variables públicas (usadas en la vista)
    const [currentTime, setCurrentTime] = useState<string | null>(null)
    const [currentMonth] = useState(moment());
    const startOfMonth = currentMonth.clone().startOf('month');
    const daysInMonth = currentMonth.daysInMonth();
    const startDay = startOfMonth.day();

    // Combustibles para la barra visual e interacción
    const combustibles = [
      { nombre: 'REGULAR', color: 'bg-red-500', cantidad: 100000 },
      { nombre: 'PREMIUN', color: 'bg-green-500', cantidad: 50000 },
      { nombre: 'DIESEL', color: 'bg-fuchsia-500', cantidad: 200000 },
      { nombre: 'DIESEL 2', color: 'bg-purple-700', cantidad: 42000 },
    ];

    // Estado para combustible seleccionado
    const [selectedFuel, setSelectedFuel] = useState<string>('REGULAR');

    // Galones actuales (esto podría venir de una lógica más adelante)
    const [galonesActuales, setGalonesActuales] = useState<number>(10000);
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

    // Estado para tanques y dispensadores
    const [tanks, setTanks] = useState(initialTanks);
    const [dispensers, setDispensers] = useState(initialDispensers);
    const [connections, setConnections] = useState(dispenserConnections);

    // Estado para modal de edición
    const [editType, setEditType] = useState<'tanque' | 'dispensador' | null>(null);
    const [editItem, setEditItem] = useState<any>(null);
    const [editValue, setEditValue] = useState<number>(0);
    const [editConn, setEditConn] = useState<{dispId: number, prodIdx: number} | null>(null);
    const [editConnValue, setEditConnValue] = useState<number>(0);

    // Estado para dispensador seleccionado
    const [selectedDispenser, setSelectedDispenser] = useState<number>(1);

    // Estado para modal de ingreso manual de galones
    const [showManualModal, setShowManualModal] = useState(false);
    const [manualGalones, setManualGalones] = useState<number | ''>('');

    // Estado para paginación del historial
    const [historialPage, setHistorialPage] = useState(1);
    const historialPorPagina = 3;
    const totalPaginas = Math.ceil(historialLlenado.length / historialPorPagina);
    const historialPaginado = historialLlenado.slice(
      (historialPage - 1) * historialPorPagina,
      historialPage * historialPorPagina
    );

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

    const handleOpenEdit = (type: 'tanque' | 'dispensador', item: any) => {
      setEditType(type);
      setEditItem(item);
      setEditValue(item.medidor);
    };

    const handleCloseEdit = () => {
      setEditType(null);
      setEditItem(null);
      setEditValue(0);
    };

    const handleSaveEdit = () => {
      if (editType === 'tanque') {
        setTanks((prev) =>
          prev.map((t) =>
            t.id === editItem.id ? { ...t, medidor: editValue } : t
          )
        );
      } else if (editType === 'dispensador') {
        setDispensers((prev) =>
          prev.map((d) =>
            d.id === editItem.id ? { ...d, medidor: editValue } : d
          )
        );
      }
      handleCloseEdit();
    };

    // Función para abrir modal de edición de medidor de producto de dispensador
    const handleOpenEditConn = (dispId: number, prodIdx: number, value: number) => {
      setEditConn({ dispId, prodIdx });
      setEditConnValue(value);
    };

    const handleCloseEditConn = () => {
      setEditConn(null);
      setEditConnValue(0);
    };

    const handleSaveEditConn = () => {
      if (editConn) {
        setConnections(prev =>
          prev.map((conn) =>
            conn.id === editConn.dispId
              ? {
                  ...conn,
                  productos: conn.productos.map((prod, idx) =>
                    idx === editConn.prodIdx ? { ...prod, medidor: editConnValue } : prod
                  ),
                }
              : conn
          )
        );
      }
      handleCloseEditConn();
    };

    useEffect(() => {
      const updateTime = () => setCurrentTime(moment().format('hh:mm:ss A'))
      updateTime()
      const interval = setInterval(updateTime, 1000)
      return () => clearInterval(interval)
    }, [])

    return (
      <div className="p-2 sm:p-4 lg:p-8 bg-blue min-h-screen">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header compacto y elegante */}
          <div className="flex flex-wrap gap-3 justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="text-white text-xl font-bold">Inventario</span>
              <span className="text-xs text-slate-400 bg-slate-700 px-2 py-1 rounded-lg">Panel General</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-slate-400 text-xs flex items-center gap-1">
                <span className="font-semibold">Hora:</span>
                <span className="text-white font-mono">{currentTime ?? '...'}</span>
              </span>
              <span className="text-slate-400 text-xs flex items-center gap-1">
                <span className="font-semibold">Mes:</span>
                <span className="text-yellow-400 font-bold">{currentMonth.format('MMMM').toUpperCase()}</span>
              </span>
            </div>
          </div>

          {/* Calendario y Historial lado a lado */}
          <div className="w-full flex flex-col md:flex-row gap-4">
            {/* Calendario compacto */}
            <div className="bg-slate-800 rounded-xl p-3 shadow border border-slate-700 w-full max-w-xs md:max-w-xs flex-shrink-0">
              <div className="flex flex-col items-center">
                <span className="text-green-400 text-base font-bold mb-1">{currentMonth.format('YYYY')}</span>
                <div className="grid grid-cols-7 gap-1 w-full">
                  {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map(day => (
                    <div key={day} className="font-bold text-green-400 text-center text-xs py-1">{day}</div>
                  ))}
                  {Array(startDay).fill(null).map((_, i) => (
                    <div key={`empty-${i}`}></div>
                  ))}
                  {[...Array(daysInMonth)].map((_, i) => {
                    const day = i + 1;
                    const isToday = moment().date() === day && moment().month() === currentMonth.month();
                    return (
                      <div
                        key={day}
                        className={`text-center py-1 rounded-lg font-semibold text-xs transition-all duration-200
                          ${isToday ? 'bg-green-600 text-white shadow scale-105' : 'text-yellow-400 hover:bg-slate-700 hover:text-white'}
                        `}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* Historial al costado */}
            <div className="bg-slate-800 p-3 rounded-xl shadow border border-slate-700 flex-1 overflow-x-auto">
              <div className="grid grid-cols-3 gap-2 text-white font-bold text-sm mb-2 border-b border-gray-700 pb-2">
                <div>CANTIDAD</div>
                <div>FECHA</div>
                <div>HORA</div>
              </div>
              <div className="space-y-0">
                {historialPaginado.length > 0 ? (
                  historialPaginado.map((registro, index) => (
                    <div
                      key={index}
                      className={`grid grid-cols-3 gap-2 py-2 rounded transition-colors duration-200 ${
                        index === 1 ? 'bg-slate-700/60' : ''
                      }`}
                    >
                      <div className="font-medium">{registro.cantidad}</div>
                      <div className="text-gray-300">{registro.fecha}</div>
                      <div className="text-gray-300">{registro.hora}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-center col-span-3 text-gray-400 py-2">No hay registros aún.</div>
                )}
              </div>
              {/* Carrusel de paginación */}
              {totalPaginas > 1 && (
                <div className="flex justify-center items-center gap-2 mt-3">
                  <button
                    className="px-2 py-1 rounded bg-slate-700 text-white text-xs font-bold disabled:opacity-40"
                    onClick={() => setHistorialPage((p) => Math.max(1, p - 1))}
                    disabled={historialPage === 1}
                  >
                    ◀
                  </button>
                  {Array.from({ length: totalPaginas }).map((_, idx) => (
                    <button
                      key={idx}
                      className={`w-7 h-7 rounded-full text-xs font-bold mx-1 ${
                        historialPage === idx + 1
                          ? 'bg-orange-500 text-white'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                      onClick={() => setHistorialPage(idx + 1)}
                    >
                      {idx + 1}
                    </button>
                  ))}
                  <button
                    className="px-2 py-1 rounded bg-slate-700 text-white text-xs font-bold disabled:opacity-40"
                    onClick={() => setHistorialPage((p) => Math.min(totalPaginas, p + 1))}
                    disabled={historialPage === totalPaginas}
                  >
                    ▶
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Combustible y galones */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Combustible selector y barras */}
            <div className="bg-slate-800 rounded-xl p-4 shadow border border-slate-700 flex flex-col gap-4">
              <div className="flex flex-wrap gap-2 justify-center">
                {combustibles.map((comb) => (
                  <button
                    key={comb.nombre}
                    onClick={() => setSelectedFuel(comb.nombre)}
                    className={`px-4 py-1 rounded-full font-bold text-sm border-2 transition-all
                      ${selectedFuel === comb.nombre
                        ? `${comb.color} text-white border-white scale-105 shadow`
                        : 'bg-slate-700 text-slate-300 border-slate-600 hover:bg-slate-600'}
                `}
                  >
                    {comb.nombre}
                  </button>
                ))}
              </div>
              <div className="space-y-3">
                {combustibles.map((comb) => {
                  const porcentaje = Math.max((comb.cantidad / 200000) * 100, 5);
                  const isSelected = selectedFuel === comb.nombre;
                  return (
                    <div key={comb.nombre} className="flex items-center gap-2">
                      <span className={`font-bold text-xs w-16 ${isSelected ? 'text-white' : 'text-slate-400 opacity-60'}`}>{comb.nombre}</span>
                      <div className="flex-1 bg-gray-700 rounded-full h-5 flex items-center p-1">
                        <div
                          className={`${comb.color} h-3 rounded-full transition-all duration-200`}
                          style={{ width: `${porcentaje}%` }}
                        ></div>
                      </div>
                      <span className={`font-bold text-xs w-16 text-right ${isSelected ? 'text-white' : 'text-slate-400 opacity-60'}`}>{comb.cantidad.toLocaleString()}K</span>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Galones y calculadora */}
            <div className="bg-slate-800 rounded-xl p-4 shadow border border-slate-700 flex flex-col gap-3">
              <div className="bg-gray-700 p-3 rounded-lg text-white text-center text-2xl font-extrabold shadow-inner border-2 border-gray-600">
                {galonesActuales.toLocaleString()} <span className="text-base ml-1 font-medium">GAL</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {botonesGalones.map((amount, i) => (
                  <button
                    key={i}
                    className="bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg text-sm font-bold shadow border border-slate-600"
                    onClick={() => {
                      let value = typeof amount === 'string' && amount.includes('k')
                        ? Number(amount.replace('k', '')) * 1000
                        : Number(amount);
                      setGalonesActuales(value);
                    }}
                  >
                    {amount} <span className="text-xs">GAL</span>
                  </button>
                ))}
              </div>
              <div className="flex gap-2 mt-1">
                <button className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-base font-bold flex-1 shadow">
                  LLENAR
                </button>
                <button
                  className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-base font-bold flex-1 shadow"
                  onClick={() => setShowManualModal(true)}
                >
                  MANUAL
                </button>
              </div>
            </div>
            {/* Productos al costado */}
            <div className="bg-slate-800 rounded-xl p-3 shadow border border-slate-700 flex flex-col gap-3">
              <div className="flex items-center gap-2 mb-2">
                <ShoppingCartIcon className="w-6 h-6 text-orange-400" />
                <span className="text-lg font-bold text-white">Productos</span>
                <button
                  onClick={() => handleOpenModal()}
                  className="ml-auto bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 flex items-center gap-2 shadow hover:shadow-orange-500/30 text-sm"
                >
                  <span className="text-lg font-bold">+</span> Agregar
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-700 text-xs">
                  <thead className="bg-slate-700/50">
                    <tr>
                      <th className="px-2 py-2 text-left text-xs font-medium text-slate-300 uppercase">Nombre</th>
                      <th className="px-2 py-2 text-left text-xs font-medium text-slate-300 uppercase">Categoría</th>
                      <th className="px-2 py-2 text-left text-xs font-medium text-slate-300 uppercase">Unidad</th>
                      <th className="px-2 py-2 text-left text-xs font-medium text-slate-300 uppercase">Precio</th>
                      <th className="px-2 py-2 text-center text-xs font-medium text-slate-300 uppercase">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-slate-800 divide-y divide-slate-700">
                    {products.map((prod) => (
                      <tr key={prod.id} className="hover:bg-slate-700/30 transition-colors">
                        <td className="px-2 py-2 text-white font-medium">{prod.name}</td>
                        <td className="px-2 py-2 text-slate-300">{prod.category}</td>
                        <td className="px-2 py-2 text-slate-300">{prod.unit}</td>
                        <td className="px-2 py-2 text-slate-300">S/ {prod.unit_price.toFixed(2)}</td>
                        <td className="px-2 py-2 text-center">
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
                        <td colSpan={5} className="text-center text-slate-400 py-4">No hay productos registrados.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Historial de llenado compacto */}
          {/* <div className="bg-slate-800 p-3 rounded-xl shadow border border-slate-700">
            <div className="hidden sm:grid grid-cols-3 gap-2 text-white font-bold text-sm mb-2 border-b border-gray-700 pb-2">
              <div>CANTIDAD</div>
              <div>FECHA</div>
              <div>HORA</div>
            </div>
            <div className="sm:hidden space-y-2">
              {historialLlenado.length > 0 ? (
                historialLlenado.map((registro, index) => (
                  <div key={index} className="bg-gray-700 p-2 rounded-lg">
                    <div className="text-white font-bold text-base mb-1">{registro.cantidad}</div>
                    <div className="flex justify-between text-gray-300 text-xs">
                      <span>{registro.fecha}</span>
                      <span>{registro.hora}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400 py-2">No hay registros aún.</div>
              )}
            </div>
            <div className="hidden sm:block space-y-1 text-white text-xs">
              {historialLlenado.length > 0 ? (
                historialLlenado.map((registro, index) => (
                  <div key={index} className="grid grid-cols-3 gap-2 py-1 hover:bg-gray-700 rounded transition-colors duration-200">
                    <div className="font-medium">{registro.cantidad}</div>
                    <div className="text-gray-300">{registro.fecha}</div>
                    <div className="text-gray-300">{registro.hora}</div>
                  </div>
                ))
              ) : (
                <div className="text-center col-span-3 text-gray-400 py-2">No hay registros aún.</div>
              )}
            </div>
          </div> */}

          {/* Gestión de productos y tanques/dispensadores */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Gestión de productos */}
            <div className="bg-slate-800 rounded-xl p-3 shadow border border-slate-700 flex flex-col gap-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <ShoppingCartIcon className="w-6 h-6 text-orange-400" />
                  <span className="text-lg font-bold text-white">Productos</span>
                </div>
                <button
                  onClick={() => handleOpenModal()}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 flex items-center gap-2 shadow hover:shadow-orange-500/30 text-sm"
                >
                  <span className="text-lg font-bold">+</span> Agregar
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-700 text-xs">
                  <thead className="bg-slate-700/50">
                    <tr>
                      <th className="px-2 py-2 text-left text-xs font-medium text-slate-300 uppercase">Nombre</th>
                      <th className="px-2 py-2 text-left text-xs font-medium text-slate-300 uppercase">Categoría</th>
                      <th className="px-2 py-2 text-left text-xs font-medium text-slate-300 uppercase">Unidad</th>
                      <th className="px-2 py-2 text-left text-xs font-medium text-slate-300 uppercase">Precio</th>
                      <th className="px-2 py-2 text-center text-xs font-medium text-slate-300 uppercase">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-slate-800 divide-y divide-slate-700">
                    {products.map((prod) => (
                      <tr key={prod.id} className="hover:bg-slate-700/30 transition-colors">
                        <td className="px-2 py-2 text-white font-medium">{prod.name}</td>
                        <td className="px-2 py-2 text-slate-300">{prod.category}</td>
                        <td className="px-2 py-2 text-slate-300">{prod.unit}</td>
                        <td className="px-2 py-2 text-slate-300">S/ {prod.unit_price.toFixed(2)}</td>
                        <td className="px-2 py-2 text-center">
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
                        <td colSpan={5} className="text-center text-slate-400 py-4">No hay productos registrados.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Tanques y Dispensadores */}
            <div className="flex flex-col gap-4">
              {/* Tanques */}
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 shadow">
                <h2 className="text-base font-bold text-white mb-3">Tanques</h2>
                <div className="space-y-2">
                  {tanks.map((tanque) => (
                    <div key={tanque.id} className="flex items-center justify-between bg-slate-700 rounded-lg px-3 py-2">
                      <div>
                        <div className="font-semibold text-white">{tanque.nombre} <span className="text-slate-400 text-xs">({tanque.tipo})</span></div>
                        <div className="text-slate-300 text-xs">Medidor: <span className="font-bold text-green-400">{tanque.medidor.toLocaleString()} GAL</span></div>
                      </div>
                      <button
                        onClick={() => handleOpenEdit('tanque', tanque)}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-lg font-medium transition-colors text-xs"
                      >
                        Editar
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              {/* Dispensadores */}
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 shadow">
                <h2 className="text-base font-bold text-white mb-3">Dispensadores</h2>
                <div className="flex flex-wrap gap-2 mb-2">
                  {dispensers.map((disp) => (
                    <button
                      key={disp.id}
                      onClick={() => setSelectedDispenser(disp.id)}
                      className={`px-3 py-1 rounded-lg font-semibold transition-colors border text-xs
                        ${selectedDispenser === disp.id
                          ? 'bg-orange-500 text-white border-orange-500'
                          : 'bg-slate-700 text-slate-300 border-slate-600 hover:bg-slate-600'}
                  `}
                    >
                      {disp.nombre}
                    </button>
                  ))}
                </div>
                <div>
                  <span className="text-slate-400 font-medium text-xs">Productos conectados:</span>
                  <div className="flex flex-col gap-2 mt-1">
                    {connections.find(d => d.id === selectedDispenser)?.productos.map((prod, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-600 px-4 py-2 rounded-lg flex items-center gap-3 min-w-[180px] max-w-full"
                      >
                        <span className={`font-semibold text-sm ${
                          prod.tipo === 'Regular' ? 'text-red-400' :
                          prod.tipo === 'Premium' ? 'text-green-400' :
                          prod.tipo === 'Diesel' ? 'text-purple-400' :
                          prod.tipo === 'Diesel 2' ? 'text-purple-300' : 'text-orange-400'
                        }`}>{prod.tipo}</span>
                        <span className="text-slate-300 text-xs">({prod.tanque})</span>
                        <span className="text-green-400 font-bold text-xs ml-2">{prod.medidor.toLocaleString()} GAL</span>
                        <button
                          onClick={() => handleOpenEditConn(selectedDispenser, idx, prod.medidor)}
                          className="ml-2 px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white text-xs rounded"
                        >
                          Editar
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modales (mantén los existentes, solo cambia el padding/border si quieres más elegancia) */}
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

          {/* NUEVA SECCIÓN: Tanques y Dispensadores */}
            {/* 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Tanques */}
            {/* <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 shadow">
              <h2 className="text-base font-bold text-white mb-3">Tanques</h2>
              <div className="space-y-2">
                {tanks.map((tanque) => (
                  <div key={tanque.id} className="flex items-center justify-between bg-slate-700 rounded-lg px-3 py-2">
                    <div>
                      <div className="font-semibold text-white">{tanque.nombre} <span className="text-slate-400 text-xs">({tanque.tipo})</span></div>
                      <div className="text-slate-300 text-xs">Medidor: <span className="font-bold text-green-400">{tanque.medidor.toLocaleString()} GAL</span></div>
                    </div>
                    <button
                      onClick={() => handleOpenEdit('tanque', tanque)}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-lg font-medium transition-colors text-xs"
                    >
                      Editar
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {/* Dispensadores */}
            {/* <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 shadow">
              <h2 className="text-base font-bold text-white mb-3">Dispensadores</h2>
              <div className="flex flex-wrap gap-2 mb-2">
                {dispensers.map((disp) => (
                  <button
                    key={disp.id}
                    onClick={() => setSelectedDispenser(disp.id)}
                    className={`px-3 py-1 rounded-lg font-semibold transition-colores border text-xs
                      ${selectedDispenser === disp.id
                        ? 'bg-orange-500 text-white border-orange-500'
                        : 'bg-slate-700 text-slate-300 border-slate-600 hover:bg-slate-600'}
                  `}
                  >
                    {disp.nombre}
                  </button>
                ))}
              </div>
              <div>
                <span className="text-slate-400 font-medium text-xs">Productos conectados:</span>
                <div className="flex flex-col gap-2 mt-1">
                  {connections.find(d => d.id === selectedDispenser)?.productos.map((prod, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-600 px-4 py-2 rounded-lg flex items-center gap-3 min-w-[180px] max-w-full"
                    >
                      <span className={`font-semibold text-sm ${
                        prod.tipo === 'Regular' ? 'text-red-400' :
                        prod.tipo === 'Premium' ? 'text-green-400' :
                        prod.tipo === 'Diesel' ? 'text-purple-400' :
                        prod.tipo === 'Diesel 2' ? 'text-purple-300' : 'text-orange-400'
                      }`}>{prod.tipo}</span>
                      <span className="text-slate-300 text-xs">({prod.tanque})</span>
                      <span className="text-green-400 font-bold text-xs ml-2">{prod.medidor.toLocaleString()} GAL</span>
                      <button
                        onClick={() => handleOpenEditConn(selectedDispenser, idx, prod.medidor)}
                        className="ml-2 px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white text-xs rounded"
                      >
                        Editar
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          */}

          {/* MODAL DE EDICIÓN */}
          {editType && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8 w-full max-w-md">
                <h3 className="text-xl font-bold text-white mb-4">
                  Editar Medidor de {editType === 'tanque' ? 'Tanque' : 'Dispensador'}
                </h3>
                <div className="mb-4">
                  <label className="block text-slate-300 mb-2">Nuevo valor del medidor (GAL)</label>
                  <input
                    type="number"
                    min={0}
                    value={editValue}
                    onChange={e => setEditValue(Number(e.target.value))}
                    className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={handleCloseEdit}
                    className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          )}
          {editConn && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8 w-full max-w-md">
                <h3 className="text-xl font-bold text-white mb-4">
                  Editar Medidor de Producto del Dispensador
                </h3>
                <div className="mb-4">
                  <label className="block text-slate-300 mb-2">Nuevo valor del medidor (GAL)</label>
                  <input
                    type="number"
                    min={0}
                    value={editConnValue}
                    onChange={e => setEditConnValue(Number(e.target.value))}
                    className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={handleCloseEditConn}
                    className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSaveEditConn}
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* MODAL PARA INGRESO MANUAL DE GALONES */}
          {showManualModal && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8 w-full max-w-md shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Ingreso manual de galones</h3>
                <label className="block text-slate-300 mb-2 text-lg font-medium">Cantidad de galones</label>
                <input
                  type="number"
                  min={0}
                  value={manualGalones}
                  onChange={e => setManualGalones(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white text-xl focus:outline-none focus:border-green-500 mb-6"
                  placeholder="Ej: 1500"
                />
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowManualModal(false)}
                    className="px-6 py-3 bg-slate-600 hover:bg-slate-500 text-white rounded-lg font-medium"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      setGalonesActuales(Number(manualGalones) || 0);
                      setShowManualModal(false);
                    }}
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold"
                  >
                    Aceptar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
}

export default GrifoInventarioContent

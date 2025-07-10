'use client';

import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { Pencil as EditIcon, Trash2 as DeleteIcon } from 'lucide-react';
import CreateClientModal from './components/CreateClientModal';

interface Client {
  id: number;
  client_type: string;
  category: string;
  name: string;
  paternal_name: string;
  maternal_name: string;
  company_name: string;
  document_type: 'RUC' | 'DNI' | 'Otro';
  document_number: string;
  address: string;
  phone: string;
  email: string;
  birth_date: string;
  notes: string;
  created_at: string;
  updated_at: string;

  creditLimit: string;
  actions: string;
}

const ClientsContent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Creditos');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [clients, setClients] = useState<Client[]>([
    {
      id: 1,
      client_type: 'Natural',
      category: 'Frecuente',
      name: 'Luis',
      paternal_name: 'Gonzales',
      maternal_name: 'Salazar',
      company_name: '',
      document_type: 'DNI',
      document_number: '945879632',
      address: 'Av. Primavera 123, Lima',
      phone: '987654321',
      email: 'luis.gonzales@example.com',
      birth_date: '1985-06-15',
      notes: 'Cliente puntual',
      created_at: '2024-10-01T10:00:00Z',
      updated_at: '2025-06-01T15:30:00Z',
      creditLimit: '2000',
      actions: ''
    },
    {
      id: 2,
      client_type: 'Jurídico',
      category: 'Corporativo',
      name: '',
      paternal_name: '',
      maternal_name: '',
      company_name: 'Tech Solutions S.A.C.',
      document_type: 'RUC',
      document_number: '20547896541',
      address: 'Calle Los Álamos 456, Arequipa',
      phone: '054123456',
      email: 'contacto@techsolutions.com',
      birth_date: '',
      notes: 'Solicita crédito a 30 días',
      created_at: '2024-11-20T09:15:00Z',
      updated_at: '2025-06-15T08:45:00Z',
      creditLimit: '10000',
      actions: ''
    },
    {
      id: 3,
      client_type: 'Natural',
      category: 'Ocasional',
      name: 'María',
      paternal_name: 'López',
      maternal_name: 'Huamán',
      company_name: '',
      document_type: 'DNI',
      document_number: '971236584',
      address: 'Jr. Las Flores 678, Trujillo',
      phone: '961234567',
      email: 'maria.lopez@example.com',
      birth_date: '1990-03-10',
      notes: 'Prefiere pago en efectivo',
      created_at: '2025-01-10T13:45:00Z',
      updated_at: '2025-04-05T11:10:00Z',
      creditLimit: '0',
      actions: ''
    },
    {
      id: 4,
      client_type: 'Jurídico',
      category: 'Distribuidor',
      name: '',
      paternal_name: '',
      maternal_name: '',
      company_name: 'Distribuidora El Norte S.R.L.',
      document_type: 'RUC',
      document_number: '20659874531',
      address: 'Av. Industrial 1001, Piura',
      phone: '073456789',
      email: 'ventas@elnorte.com.pe',
      birth_date: '',
      notes: 'Paga con cheques',
      created_at: '2024-09-05T08:30:00Z',
      updated_at: '2025-05-28T17:00:00Z',
      creditLimit: '15000',
      actions: ''
    },
    {
      id: 5,
      client_type: 'Natural',
      category: 'Preferencial',
      name: 'Carlos',
      paternal_name: 'Ramírez',
      maternal_name: 'Paredes',
      company_name: '',
      document_type: 'DNI',
      document_number: '960239874',
      address: 'Calle Central 345, Cusco',
      phone: '984321789',
      email: 'carlos.ramirez@example.com',
      birth_date: '1978-12-22',
      notes: 'Descuento por volumen',
      created_at: '2024-07-14T12:00:00Z',
      updated_at: '2025-06-30T14:25:00Z',
      creditLimit: '5000',
      actions: ''
    }
  ]);

  const [editingClient, setEditingClient] = useState<Client | null>(null);

  const handleClientSelect = (client: Client) => {
    setSelectedClient(client);
  };

  const handleCancelEdit = () => {
    setEditingClient(null);
  };

  const handleEditClient = (client: Client) => {
    setEditingClient(client);
  };

  const handleDeleteClient = (clientId: number) => {
    // Implementar lógica de eliminación de usuario aquí
    setClients((prev) => prev.filter((u) => u.id !== clientId));
  };

  const handleSaveClient = (updatedClient: Client) => {
    setClients((prevClients) =>
      prevClients.map((client) =>
        client.id === updatedClient.id ? updatedClient : client
      )
    );
    setEditingClient(null);
  };



  return (

    <div className="p-3 sm:p-4 lg:p-6 lg:space-y-6 bg-blue">
      {/* Header */}
      <button
        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
        onClick={() => setShowCreateModal(true)}
      >
        <Plus size={20} />
        <span>Add New Client</span>
      </button>


      {showCreateModal && (
        <CreateClientModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onClientCreated={(newClient) => {
            setClients(prev => [...prev, newClient]);
            setShowCreateModal(false);
          }}
        />
      )}

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <label className="block text-slate-400 text-sm mb-1">Search</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tibu"
            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-orange-500"
          />
        </div>
        <div>
          <label className="block text-slate-400 text-sm mb-1">Filter</label>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500"
          >
            <option value="Creditos">Creditos</option>
            <option value="Contacts">Contacts</option>
            <option value="Frequents">Frequents</option>
          </select>
        </div>
        <div>
          <label className="block text-slate-400 text-sm mb-1">Filter</label>
          <select className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500">
            <option>Frequents ∨</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Clients Table */}
        <div className="lg:col-span-2">
          <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Nombres y Apellidos</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Documento</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Tipo de Cliente</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Compaints</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Teléfono</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Correo</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Limite Credits</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client, index) => (
                    <tr key={index} className="border-b border-slate-700/50 hover:bg-slate-700/30 cursor-pointer" onClick={() => handleClientSelect(client)} >
                      <td className="py-3 px-4">
                        <span className="text-white">
                          {client.client_type === 'Natural'
                            ? `${client.name} ${client.paternal_name} ${client.maternal_name}`
                            : client.company_name}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-300">{client.document_number}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${client.client_type === 'Natural' ? 'bg-orange-500 text-white' :
                          client.client_type === 'Jurídico' ? 'bg-blue-500 text-white' :
                            'bg-gray-500 text-white'
                          }`}>
                          {client.client_type}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${client.category === 'Frecuente' ? 'bg-orange-500 text-white' :
                          client.category === 'Corporativo' ? 'bg-blue-500 text-white' :
                            client.category === 'Ocasional' ? 'bg-green-500 text-white' :
                              client.category === 'Distribuidor' ? 'bg-yellow-500 text-white' :
                                client.category === 'Preferencial' ? 'bg-purple-500 text-white' :
                                  'bg-gray-500 text-white'
                          }`}>
                          {client.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-300">{client.phone}</td>
                      <td className="py-3 px-4 text-slate-300">{client.email}</td>
                      <td className="py-3 px-4 text-slate-300">{client.creditLimit}</td>
                      <td className="px-4 py-2">
                        <div className="flex items-center justify-center gap-2 h-full">
                          <button onClick={() => handleEditClient(client)} className="text-blue-500 hover:text-blue-600 flex items-center">
                            <EditIcon />
                          </button>
                          <button onClick={() => handleDeleteClient(client.id)} className="text-red-500 hover:text-red-600 flex items-center">
                            <DeleteIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4 bg-gray-900 py-2 px-4 rounded-lg">
              <div className="text-slate-400 text-sm">Free 1 at 4 line</div>
              <div className="flex items-center space-x-2">
                <button className="bg-orange-500 text-white w-8 h-8 rounded flex items-center justify-center">
                  1
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Client edit Panel */}
        {editingClient && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 transition-all">
            <div className="relative w-full max-w-lg mx-2 sm:mx-0 sm:max-w-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-0 overflow-hidden animate-fadeIn overflow-y-auto max-h-screen">
              {/* Modal Header */}
              <div className="flex items-center gap-4 px-6 pt-6 pb-4 border-b border-slate-700 bg-gradient-to-r from-orange-500/80 to-orange-700/80">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-orange-400 to-orange-700 flex items-center justify-center text-2xl font-bold text-white shadow-lg border-4 border-white/10">
                  {editingClient.client_type === 'Natural'
                    ? `${editingClient.name?.[0] ?? ''}${editingClient.paternal_name?.[0] ?? ''}`
                    : editingClient.company_name?.[0] ?? ''}
                </div>
                <div className="flex-1">
                  <h2 className="text-white text-xl font-semibold">Editar Cliente</h2>
                  <div className="text-xs text-slate-200/80 flex flex-wrap gap-2 mt-1">
                    <span>
                      📅 <b>Creado:</b>{' '}
                      {new Date(editingClient.created_at ?? '').toLocaleString('es-PE', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    <span>
                      🔁 <b>Actualizado:</b>{' '}
                      {new Date(editingClient.updated_at ?? '').toLocaleString('es-PE', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleCancelEdit}
                  className="ml-auto text-white/80 hover:text-white text-3xl font-bold transition-colors duration-150 focus:outline-none"
                  aria-label="Cerrar"
                  type="button"
                >
                  ×
                </button>
              </div>
              {/* Modal Body */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveClient(editingClient);
                }}
                className="space-y-4 px-6 py-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Tipo de Cliente */}
                  <div>
                    <label className="text-sm text-gray-300 font-medium">Tipo de Cliente</label>
                    <select
                      className="w-full bg-slate-700/80 text-white px-3 py-2 rounded-lg mt-1 focus:ring-2 focus:ring-orange-500"
                      value={editingClient.client_type}
                      onChange={(e) =>
                        setEditingClient({ ...editingClient, client_type: e.target.value as 'Natural' | 'Jurídico' })
                      }
                    >
                      <option value="Natural">Persona Natural</option>
                      <option value="Jurídico">Empresa (Jurídico)</option>
                    </select>
                  </div>
                  {/* Categoría */}
                  <div>
                    <label className="text-sm text-gray-300 font-medium">Categoría</label>
                    <div className="mt-1">
                      <span
                        className={`inline-block px-4 py-2 rounded-lg text-base font-semibold shadow-sm ${editingClient.category === 'Frecuente'
                          ? 'bg-orange-500 text-white'
                          : editingClient.category === 'Corporativo'
                            ? 'bg-blue-500 text-white'
                            : editingClient.category === 'Ocasional'
                              ? 'bg-green-500 text-white'
                              : editingClient.category === 'Distribuidor'
                                ? 'bg-yellow-500 text-white'
                                : editingClient.category === 'Preferencial'
                                  ? 'bg-purple-500 text-white'
                                  : 'bg-gray-500 text-white'
                          }`}
                      >
                        {editingClient.category}
                      </span>
                    </div>
                  </div>
                  {/* Nombre de Compañía (solo Jurídico) */}
                  {editingClient.client_type === 'Jurídico' && (
                    <div className="md:col-span-2">
                      <label className="text-sm text-gray-300 font-medium">Nombre de Compañía</label>
                      <input
                        className="w-full bg-slate-700/80 text-white px-3 py-2 rounded-lg mt-1 focus:ring-2 focus:ring-orange-500"
                        placeholder="Nombre de la Compañía"
                        value={editingClient.company_name}
                        onChange={(e) =>
                          setEditingClient({ ...editingClient, company_name: e.target.value })
                        }
                      />
                    </div>
                  )}
                  {/* Nombres y Apellidos (solo Natural) */}
                  {editingClient.client_type === 'Natural' && (
                    <>
                      <div>
                        <label className="text-sm text-gray-300 font-medium">Nombres</label>
                        <input
                          className="w-full bg-slate-700/80 text-white px-3 py-2 rounded-lg mt-1 focus:ring-2 focus:ring-orange-500"
                          placeholder="Nombre"
                          value={editingClient.name}
                          onChange={(e) =>
                            setEditingClient({ ...editingClient, name: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-300 font-medium">Apellido Paterno</label>
                        <input
                          className="w-full bg-slate-700/80 text-white px-3 py-2 rounded-lg mt-1 focus:ring-2 focus:ring-orange-500"
                          placeholder="Apellido Paterno"
                          value={editingClient.paternal_name}
                          onChange={(e) =>
                            setEditingClient({ ...editingClient, paternal_name: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-300 font-medium">Apellido Materno</label>
                        <input
                          className="w-full bg-slate-700/80 text-white px-3 py-2 rounded-lg mt-1 focus:ring-2 focus:ring-orange-500"
                          placeholder="Apellido Materno"
                          value={editingClient.maternal_name}
                          onChange={(e) =>
                            setEditingClient({ ...editingClient, maternal_name: e.target.value })
                          }
                        />
                      </div>
                    </>
                  )}
                  {/* Tipo y Número de Documento */}
                  <div>
                    <label className="text-sm text-gray-300 font-medium">Tipo de Documento</label>
                    <select
                      className="w-full bg-slate-700/80 text-white px-3 py-2 rounded-lg mt-1 focus:ring-2 focus:ring-orange-500"
                      value={editingClient.document_type}
                      onChange={(e) =>
                        setEditingClient({ ...editingClient, document_type: e.target.value as Client['document_type'] })
                      }
                    >
                      <option value="DNI">DNI</option>
                      <option value="RUC">RUC</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-300 font-medium">Número de Documento</label>
                    <input
                      className="w-full bg-slate-700/80 text-white px-3 py-2 rounded-lg mt-1 focus:ring-2 focus:ring-orange-500"
                      placeholder="Número de documento"
                      value={editingClient.document_number}
                      onChange={(e) =>
                        setEditingClient({ ...editingClient, document_number: e.target.value })
                      }
                    />
                  </div>
                  {/* Dirección */}
                  <div className="md:col-span-2">
                    <label className="text-sm text-gray-300 font-medium">Dirección fiscal o principal</label>
                    <input
                      className="w-full bg-slate-700/80 text-white px-3 py-2 rounded-lg mt-1 focus:ring-2 focus:ring-orange-500"
                      placeholder="Dirección fiscal"
                      value={editingClient.address}
                      onChange={(e) =>
                        setEditingClient({ ...editingClient, address: e.target.value })
                      }
                    />
                  </div>
                  {/* Teléfono */}
                  <div>
                    <label className="text-sm text-gray-300 font-medium">Teléfono</label>
                    <input
                      className="w-full bg-slate-700/80 text-white px-3 py-2 rounded-lg mt-1 focus:ring-2 focus:ring-orange-500"
                      placeholder="Teléfono"
                      value={editingClient.phone}
                      onChange={(e) =>
                        setEditingClient({ ...editingClient, phone: e.target.value })
                      }
                    />
                  </div>
                  {/* Correo */}
                  <div>
                    <label className="text-sm text-gray-300 font-medium">Correo</label>
                    <input
                      className="w-full bg-slate-700/80 text-white px-3 py-2 rounded-lg mt-1 focus:ring-2 focus:ring-orange-500"
                      placeholder="Correo"
                      value={editingClient.email}
                      onChange={(e) =>
                        setEditingClient({ ...editingClient, email: e.target.value })
                      }
                    />
                  </div>
                  {/* Fecha de nacimiento (solo Natural) */}
                  {editingClient.client_type === 'Natural' && (
                    <div>
                      <label className="text-sm text-gray-300 font-medium">Fecha de Nacimiento</label>
                      <input
                        type="date"
                        className="w-full bg-slate-700/80 text-white px-3 py-2 rounded-lg mt-1 focus:ring-2 focus:ring-orange-500"
                        placeholder="Fecha de Nacimiento"
                        value={editingClient.birth_date}
                        onChange={(e) =>
                          setEditingClient({ ...editingClient, birth_date: e.target.value })
                        }
                      />
                    </div>
                  )}
                  {/* Límite de Crédito */}
                  <div>
                    <label className="text-sm text-gray-300 font-medium">Límite de Crédito</label>
                    <input
                      type="number"
                      className="w-full bg-slate-700/80 text-white px-3 py-2 rounded-lg mt-1 focus:ring-2 focus:ring-orange-500"
                      placeholder="Límite de crédito"
                      value={editingClient.creditLimit}
                      onChange={(e) =>
                        setEditingClient({ ...editingClient, creditLimit: e.target.value })
                      }
                    />
                  </div>
                  {/* Notas */}
                  <div className="md:col-span-2">
                    <label className="text-sm text-gray-300 font-medium">Notas</label>
                    <textarea
                      className="w-full bg-slate-700/80 text-white px-3 py-2 rounded-lg mt-1 focus:ring-2 focus:ring-orange-500"
                      placeholder="Observaciones adicionales sobre el cliente"
                      value={editingClient.notes}
                      onChange={(e) =>
                        setEditingClient({ ...editingClient, notes: e.target.value })
                      }
                      rows={2}
                    />
                  </div>
                </div>
                {/* Botones */}
                <div className="flex flex-col sm:flex-row justify-end gap-2 pt-6">
                  <button
                    className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-bold py-2 px-6 rounded-lg shadow transition-all"
                    type="submit"
                  >
                    Guardar Cambios
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white font-bold py-2 px-6 rounded-lg transition-all"
                    type="button"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

    </div>);
};

export default ClientsContent;
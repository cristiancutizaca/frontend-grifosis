import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Plus, Search, Filter } from 'lucide-react';
import apiService from '../services/apiService';

interface Client {
  id: number;
  nombre: string;
  telefono: string;
  credito: number;
  email: string;
}

const Clients: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Creditos");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await apiService.get<Client[]>("/clientes");
        setClients(data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };
    fetchClients();
  }, []);

  const handleClientSelect = (client: Client) => {
    setSelectedClient(client);
  };

  return (
    <Layout currentPage="clientes">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <span className="text-slate-400">→</span>
            <span className="text-white">Clientes</span>
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
            <Plus size={20} />
            <span>Add New Client</span>
          </button>
        </div>

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
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Nombre</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">ID</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Tipo</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Quejas</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Teléfono</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Email</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Límite de Crédito</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((client, index) => (
                      <tr 
                        key={index} 
                        className="border-b border-slate-700/50 hover:bg-slate-700/30 cursor-pointer"
                        onClick={() => handleClientSelect(client)}
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-slate-600 rounded-full"></div>
                            <span className="text-white">{client.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-slate-300">{client.document}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            client.type === 'Persons' ? 'bg-orange-500 text-white' : 
                            client.type === 'Erguars' ? 'bg-blue-500 text-white' : 
                            'bg-gray-500 text-white'
                          }`}>
                            {client.type}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            client.complaints === 'Dualles' ? 'bg-orange-500 text-white' :
                            client.complaints === 'Contacts' ? 'bg-blue-500 text-white' :
                            client.complaints === 'Ulciaous' ? 'bg-green-500 text-white' :
                            client.complaints === 'Benare' ? 'bg-yellow-500 text-white' :
                            'bg-gray-500 text-white'
                          }`}>
                            {client.complaints}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-300">{client.phone}</td>
                        <td className="py-3 px-4 text-slate-300">{client.email}</td>
                        <td className="py-3 px-4 text-slate-300">{client.creditLimit}</td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button className="text-blue-400 hover:text-blue-300">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                              </svg>
                            </button>
                            <button className="text-green-400 hover:text-green-300">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4">
              <div className="text-slate-400 text-sm">Free 1 at 4 line</div>
              <div className="flex items-center space-x-2">
                <button className="bg-orange-500 text-white w-8 h-8 rounded flex items-center justify-center">
                  1
                </button>
              </div>
            </div>
          </div>

          {/* Client Details Panel */}
          <div className="space-y-6">
            {selectedClient ? (
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-slate-600 rounded-full"></div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{selectedClient.nombre}</h3>
                    <p className="text-slate-400">ID: {selectedClient.id}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-slate-700">
                    <span className="text-slate-400">Información de Contacto</span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Email</span>
                      <span className="text-slate-300">{selectedClient.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Teléfono</span>
                      <span className="text-slate-300">{selectedClient.telefono}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Límite de Crédito</span>
                      <span className="text-slate-300">{selectedClient.credito}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                <p className="text-slate-400 text-center">Selecciona un cliente para ver los detalles</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Clients;


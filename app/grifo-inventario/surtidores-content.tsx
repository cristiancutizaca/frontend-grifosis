import { Fuel } from "lucide-react";
import React from "react";
import { useSurtidores } from "./hooks/use-surtidores";
import SectionHeader from "./components/sectionHeader";
import SectionDataTable from "./components/sectionDataTable";

const SurtidoresContent: React.FC = () => {
  const {
    surtidores,
    editingSurtidor,
    form,
    showModal,
    handleDelete,
    handleOpenModal,
    handleCloseModal,
    handleChange,
    handleSave,
  } = useSurtidores();

  return (
    <div>
      <SectionHeader
        title="Gestión de Surtidores"
        subtitle="Administra los surtidores del grifo"
        icon={<Fuel className="w-5 h-5 sm:w-6 sm:h-6" />}
        onAddClick={() => handleOpenModal()}
        addLabel="Agregar Surtidor"
      />

      {/* Tabla de surtidores */}
      <SectionDataTable
        headers={[
          "Nombre del Surtidor",
          "Número de Surtidor",
          "Ubicación del Surtidor",
          "Acciones",
        ]}
        rows={surtidores.map((surtidor) => (
          <tr key={surtidor.pump_id} className="hover:bg-slate-700/30">
            <td className="px-4 py-3 text-slate-300">{surtidor.pump_name}</td>
            <td className="px-4 py-3 text-slate-300">{surtidor.pump_number}</td>
            <td className="px-4 py-3 text-slate-300">
              {surtidor.location_descripcion}
            </td>
            <td className="px-4 py-3 text-center">
              <button
                onClick={() => handleOpenModal(surtidor)}
                className="text-blue-400 hover:text-blue-300 mr-2 font-bold"
                title="Editar"
              >
                ✏️
              </button>
              <button
                onClick={() => handleDelete(surtidor.pump_id)}
                className="text-red-400 hover:text-red-300 font-bold"
                title="Eliminar"
              >
                🗑️
              </button>
            </td>
          </tr>
        ))}
        emptyMessage="No hay surtidores registrados."
      />

      {/* Modal de edición/creación */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl border border-slate-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Header del Modal */}
            <div className="sticky top-0 bg-slate-800 border-b border-slate-700 px-6 py-4 flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-white flex-1">
                {editingSurtidor ? "Editar Surtidor" : "Agregar Surtidor"}
              </h2>
              {editingSurtidor && (
                <div className="px-4 py-3 text-xs text-slate-400 space-y-1 md:mr-4 flex-1 max-w-md">
                  <p className="flex items-center gap-2">
                    📅 <span className="font-medium">Creado:</span>
                    <span className="text-slate-300">
                      {new Date(editingSurtidor.created_at).toLocaleString(
                        "es-PE",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    🔄 <span className="font-medium">Actualizado:</span>
                    <span className="text-slate-300">
                      {new Date(editingSurtidor.updated_at).toLocaleString(
                        "es-PE",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </span>
                  </p>
                </div>
              )}
              {/* Botón cerrar */}
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white"
                aria-label="Cerrar modal"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Contenido del Modal */}
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nombre del Surtidor */}
                <div>
                  <label className="text-sm text-gray-300">
                    Nombre del Surtidor
                  </label>
                  <input
                    type="text"
                    name="pump_name"
                    value={form.pump_name || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 text-white rounded"
                  />
                </div>
                {/* Número del Surtidor */}
                <div>
                  <label className="text-sm text-gray-300">
                    Número del Surtidor
                  </label>
                  <input
                    type="text"
                    name="pump_number"
                    value={form.pump_number || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 text-white rounded"
                  />
                </div>
                {/* Ubicación del Surtidor */}
                <div className="sm:col-span-2">
                  <label className="text-sm text-gray-300">
                    Ubicación del Surtidor
                  </label>
                  <input
                    type="text"
                    name="location_descripcion"
                    value={form.location_descripcion || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 text-white rounded"
                  />
                </div>
              </div>
              {/* Botones */}
              <div className="mt-6 flex justify-end gap-2">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Guardar
                </button>
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurtidoresContent;

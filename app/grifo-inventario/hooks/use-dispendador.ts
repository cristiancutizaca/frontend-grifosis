import { useState } from "react";
import { initialDispensadores } from "../data/initial-dispensadores";
import { initialSurtidores } from "../data/initial-surtidores";
import { initialTanks } from "../data/initial-tanks";
import { initialProducts } from "../data/initial-products";
import { Dispensador } from "../types/dispensadores";

export function useDispensador() {
  const [dispensadores, setDispensadores] = useState(initialDispensadores);

  const [showModal, setShowModal] = useState(false);

  const [editingDispensador, setEditingDispensador] =
    useState<Dispensador | null>(null);

    const [form, setForm] = useState<Partial<Dispensador>>({
    numero_dispensador: "",
    surtidor_id: initialSurtidores[0]?.pump_id || 1,
    tank_id: initialTanks[0]?.id || 1,
    producto_id: initialProducts[0]?.id || 1,
  });

  const handleOpenModal = (dispensador?: Dispensador) => {
    if (dispensador) {
      setEditingDispensador(dispensador);
      setForm(dispensador);
    } else {
      setEditingDispensador(null);
      setForm({
        numero_dispensador: "",
        surtidor_id: initialSurtidores[0]?.pump_id || 1,
        tank_id: initialTanks[0]?.id || 1,
        producto_id: initialProducts[0]?.id || 1,
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingDispensador(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name.endsWith("_id") ? Number(value) : value,
    }));
  };

  const handleSave = () => {
    if (
      !form.numero_dispensador ||
      !form.surtidor_id ||
      !form.tank_id ||
      !form.producto_id
    )
      return;
    if (editingDispensador) {
      setDispensadores((prev) =>
        prev.map((d) =>
          d.id === editingDispensador.id
            ? ({
                ...d,
                ...form,
                updated_at: new Date().toISOString(),
              } as Dispensador)
            : d
        )
      );
    } else {
      setDispensadores((prev) => [
        ...prev,
        {
          ...(form as Dispensador),
          id: prev.length ? Math.max(...prev.map((d) => d.id)) + 1 : 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    setDispensadores((prev) => prev.filter((d) => d.id !== id));
  };

  return {
    dispensadores,
    showModal,
    editingDispensador,
    form,
    handleOpenModal,
    handleCloseModal,
    handleChange,
    handleSave,
    handleDelete,
  };
}

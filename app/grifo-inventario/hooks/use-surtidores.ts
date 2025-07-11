import { useState, useEffect } from "react";
import { Surtidores } from "../types/surtidores";
import { initialSurtidores } from "../data/initial-surtidores";

export function useSurtidores() {
  const [surtidores, setSurtidores] = useState<Surtidores[]>(initialSurtidores);

  const [showModal, setShowModal] = useState(false);

  const [editingSurtidor, setEditingSurtidor] = useState<Surtidores | null>(
    null
  );

  const [form, setForm] = useState<Partial<Surtidores>>({
    pump_id: 0,
    pump_number: "",
    pump_name: "",
    location_descripcion: "",
    created_at: "",
    updated_at: "",
  });

  useEffect(() => {
    // Aquí podrías agregar lógica para obtener los surtidores de una API o base de datos
  }, []);

  const handleDelete = (pump_id: number) => {
    setSurtidores(
      surtidores.filter((surtidor) => surtidor.pump_id !== pump_id)
    );
  };

  const handleOpenModal = (surtidor?: Surtidores) => {
    if (surtidor) {
      setEditingSurtidor(surtidor);
      setForm(surtidor);
    } else {
      setEditingSurtidor(null);
      setForm({
        pump_id: 0,
        pump_number: "",
        pump_name: "",
        location_descripcion: "",
        created_at: "",
        updated_at: "",
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingSurtidor(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (!form.pump_name || !form.pump_number || !form.location_descripcion)
      return;
    if (editingSurtidor) {
      setSurtidores((prev) =>
        prev.map((s) =>
          s.pump_id === editingSurtidor.pump_id
            ? {
                ...s,
                ...form,
                updated_at: new Date().toISOString(),
              }
            : s
        )
      );
    } else {
      setSurtidores((prev) => [
        ...prev,
        {
          ...(form as Surtidores),
          pump_id: prev.length
            ? Math.max(...prev.map((s) => s.pump_id)) + 1
            : 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);
    }
    handleCloseModal();
  };

  return {
    surtidores,
    editingSurtidor,
    form,
    showModal,
    handleOpenModal,
    handleCloseModal,
    handleChange,
    handleSave,
    handleDelete,
  };
}

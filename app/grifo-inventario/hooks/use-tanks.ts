import React, { useState } from "react";
import { initialTanks } from "../data/initial-tanks";
import { Tanks } from "../types/tanques";

export function useTanques() {
  const [tanks, setTanks] = useState<Tanks[]>(initialTanks);

  const [showModal, setShowModal] = useState(false);

  const [editingTank, setEditingTank] = useState<Tanks | null>(null);

  const [form, setForm] = useState<Partial<Tanks>>({
    tank_name: "",
    product_id: 0,
    total_capacity: "",
    location: "",
    description: "",
  });

  const handleOpenModal = (tank?: Tanks) => {
    if (tank) {
      setEditingTank(tank);
      setForm(tank);
    } else {
      setEditingTank(null);
      setForm({
        tank_name: "",
        product_id: 0,
        total_capacity: "",
        location: "",
        description: "",
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTank(null);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSave = () => {
    if (
      !form.tank_name ||
      !form.total_capacity ||
      !form.location ||
      !form.description
    )
      return;
    if (editingTank) {
      setTanks((prev) =>
        prev.map((t) =>
          t.id === editingTank.id
            ? ({
                ...t,
                ...form,
                updated_at: new Date().toISOString(),
              } as Tanks)
            : t
        )
      );
    } else {
      setTanks((prev) => [
        ...prev,
        {
          ...(form as Tanks),
          id: prev.length ? Math.max(...prev.map((t) => t.id)) + 1 : 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    setTanks((prev) => prev.filter((t) => t.id !== id));
  };

  return {
    tanks,
    form,
    showModal,
    editingTank,
    handleOpenModal,
    handleCloseModal,
    handleChange,
    handleSave,
    handleDelete,
    setForm,
  };
}

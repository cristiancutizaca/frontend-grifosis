import { useState } from "react";
import { Product } from "../types/productos";
import { initialProducts } from "../data/initial-products";
import { categories, fuelTypes, units } from "../data/initial-data";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const [showModal, setShowModal] = useState(false);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [form, setForm] = useState<Partial<Product>>({
    name: "",
    description: "",
    category: categories[categories.length - 1],
    fuel_type:
      fuelTypes[fuelTypes.length - 1] === "Ninguno"
        ? ""
        : fuelTypes[fuelTypes.length - 1],
    unit: units[units.length - 1],
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
        name: "",
        description: "",
        category: categories[categories.length - 1],
        fuel_type:
          fuelTypes[fuelTypes.length - 1] === "Ninguno"
            ? ""
            : fuelTypes[fuelTypes.length - 1],
        unit: units[units.length - 1],
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
    if (!form.name || !form.unit_price) return;
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? ({
                ...p,
                ...form,
                updated_at: new Date().toISOString(),
              } as Product)
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
    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return {
    products,
    form,
    showModal,
    editingProduct,
    handleOpenModal,
    handleCloseModal,
    handleChange,
    handleSave,
    handleDelete,
    setForm,
  };
}

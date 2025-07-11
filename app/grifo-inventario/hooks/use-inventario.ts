import { useState, useEffect } from "react";
import moment from "moment";
import { initialProducts } from "../data/initial-products";
import { combustibles, galonesActuales, botonesGalones, historialLlenado } from "../data/initial-data";
import { Product } from "../types/productos";

export function useInventario() {
    const [currentTime, setCurrentTime] = useState<string | null>(null);

    const [currentMonth] = useState(moment());

    const startOfMonth = currentMonth.clone().startOf("month");

    const daysInMonth = currentMonth.daysInMonth();

    const startDay = startOfMonth.day();

    const [products, setProducts] = useState<Product[]>(initialProducts);

    const [showModal, setShowModal] = useState(false);

    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const [form, setForm] = useState<Partial<Product>>({
        name: "",
        description: "",
        category: "combustible",
        fuel_type: "premium",
        unit: "galón",
        unit_price: 0,
        is_active: true,
    });

    useEffect(() => {
        const updateTime = () => setCurrentTime(moment().format("hh:mm:ss A"));
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return {
        currentTime,
        currentMonth,
        startOfMonth,
        daysInMonth,
        startDay,
        combustibles,
        galonesActuales,
        botonesGalones,
        historialLlenado,
        products,
        setProducts,
        showModal,
        setShowModal,
        editingProduct,
        setEditingProduct,
        form,
        setForm,
    };
}

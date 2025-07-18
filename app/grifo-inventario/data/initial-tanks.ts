import { Tanks } from "../types/tanques";

export const initialTanks: Tanks[] = [
  {
    tank_id: 1,
    tank_name: "Tanque 1",
    product_id: 1,
    total_capacity: "1000 litros",
    location: "Almacen 1",
    description: "Tanque de almacenamiento de combustible",
    created_at: "2022-01-01",
    updated_at: "2022-01-01",
  },
  {
    tank_id: 2,
    tank_name: "Tanque 2",
    product_id: 2,
    total_capacity: "2000 litros",
    location: "Almacen 2",
    description: "Tanque de almacenamiento de lubricantes",
    created_at: "2022-02-01",
    updated_at: "2022-02-01",
  },
  {
    tank_id: 3,
    tank_name: "Tanque 3",
    product_id: 3,
    total_capacity: "3000 litros",
    location: "Almacen 3",
    description: "Tanque de almacenamiento de químicos",
    created_at: "2022-03-01",
    updated_at: "2022-03-01",
  },
];

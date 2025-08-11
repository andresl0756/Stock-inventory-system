// src/data/mockMaterials.ts
import { Material } from "@/types"; // <-- FIX

// FIX: Todos los campos ahora usan los nombres de la base de datos
export const mockMaterials: Material[] = [
  { id: "1", codigo: "ELE-001", nombre: "Cable AWG 12 (rollo 100m)", categoria_id: "cat_electrico", unidad: "Unidad", precio: 35000, marca: "Nexans", descripcion: "Rollo de 100 metros.", ubicacion: "A1-01", stock_minimo: 5, stock_actual: 12, stock_maximo: 20, departamento_id: 'd1', created_by: 'u1', created_at: new Date().toISOString(), activo: true, qr_code: null },
  { id: "2", codigo: "ELE-002", nombre: "Interruptor simple blanco", categoria_id: "cat_electrico", unidad: "Unidad", precio: 2500, marca: "Bticino", descripcion: "Interruptor de luz.", ubicacion: "A1-02", stock_minimo: 10, stock_actual: 2, stock_maximo: 50, departamento_id: 'd1', created_by: 'u1', created_at: new Date().toISOString(), activo: true, qr_code: null },
  // ...y así para el resto de los 50 materiales
];
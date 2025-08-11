import { StockMovement } from "@/types/stock";

export const mockStockHistory: StockMovement[] = [
  // --- 2023 ---
  // Julio (Initial Stock)
  { id: "h1", materialId: "1", type: "Ingreso", quantity: 50, date: new Date("2023-07-15"), user: "Admin", notes: "Stock inicial" },
  { id: "h2", materialId: "13", type: "Ingreso", quantity: 20, date: new Date("2023-07-20"), user: "Admin", notes: "Stock inicial" },
  { id: "h3", materialId: "25", type: "Ingreso", quantity: 40, date: new Date("2023-07-22"), user: "Admin", notes: "Stock inicial" },
  { id: "h4", materialId: "35", type: "Ingreso", quantity: 15, date: new Date("2023-07-25"), user: "Admin", notes: "Stock inicial" },
  // Agosto
  { id: "h5", materialId: "5", type: "Ingreso", quantity: 100, date: new Date("2023-08-05"), user: "Admin", notes: "Stock inicial" },
  { id: "h6", materialId: "18", type: "Ingreso", quantity: 50, date: new Date("2023-08-10"), user: "Admin", notes: "Stock inicial" },
  { id: "h7", materialId: "2", type: "Egreso", quantity: 5, date: new Date("2023-08-20"), user: "Juan Pérez", notes: "Instalación eléctrica" },
  // Septiembre
  { id: "h8", materialId: "43", type: "Ingreso", quantity: 20, date: new Date("2023-09-12"), user: "Admin" },
  { id: "h9", materialId: "15", type: "Egreso", quantity: 2, date: new Date("2023-09-25"), user: "Ana Gómez", notes: "Reparación baño" },
  // Octubre
  { id: "h10", materialId: "30", type: "Ingreso", quantity: 10, date: new Date("2023-10-18"), user: "Admin" },
  // Noviembre
  { id: "h11", materialId: "26", type: "Egreso", quantity: 3, date: new Date("2023-11-10"), user: "Carlos Ruiz", notes: "Mobiliario" },
  { id: "h12", materialId: "40", type: "Ingreso", quantity: 50, date: new Date("2023-11-22"), user: "Admin" },
  // Diciembre
  { id: "h13", materialId: "7", type: "Ajuste", quantity: -1, date: new Date("2023-12-28"), user: "Admin", notes: "Pérdida en bodega" },

  // --- 2024 ---
  // Enero
  { id: "h14", materialId: "1", type: "Egreso", quantity: 10, date: new Date("2024-01-15"), user: "Juan Pérez" },
  // Febrero
  { id: "h15", materialId: "14", type: "Ingreso", quantity: 30, date: new Date("2024-02-20"), user: "Admin" },
  // Marzo
  { id: "h16", materialId: "36", type: "Egreso", quantity: 5, date: new Date("2024-03-10"), user: "Ana Gómez", notes: "Pintura oficina" },
  // Abril
  { id: "h17", materialId: "49", type: "Ingreso", quantity: 20, date: new Date("2024-04-05"), user: "Admin" },
  { id: "h18", materialId: "22", type: "Egreso", quantity: 15, date: new Date("2024-04-25"), user: "Carlos Ruiz" },
  // Mayo
  { id: "h19", materialId: "8", type: "Ingreso", quantity: 10, date: new Date("2024-05-15"), user: "Admin" },
  // Junio
  { id: "h20", materialId: "19", type: "Egreso", quantity: 2, date: new Date("2024-06-18"), user: "Juan Pérez", notes: "Fuga" },
  // Julio
  { id: "h21", materialId: "28", type: "Ingreso", quantity: 20, date: new Date("2024-07-22"), user: "Admin" },
  // Agosto
  { id: "h22", materialId: "38", type: "Egreso", quantity: 4, date: new Date("2024-08-30"), user: "Ana Gómez" },
  // Septiembre
  { id: "h23", materialId: "45", type: "Ingreso", quantity: 5, date: new Date("2024-09-10"), user: "Admin", notes: "Reposición" },
  // Octubre
  { id: "h24", materialId: "12", type: "Egreso", quantity: 3, date: new Date("2024-10-05"), user: "Carlos Ruiz" },
  // Noviembre
  { id: "h25", materialId: "23", type: "Ingreso", quantity: 40, date: new Date("2024-11-15"), user: "Admin" },
  // Diciembre
  { id: "h26", materialId: "33", type: "Egreso", quantity: 10, date: new Date("2024-12-20"), user: "Juan Pérez" },

  // --- 2025 ---
  // Enero
  { id: "h27", materialId: "4", type: "Ingreso", quantity: 20, date: new Date("2025-01-10"), user: "Admin" },
  { id: "h28", materialId: "16", type: "Ingreso", quantity: 10, date: new Date("2025-01-25"), user: "Admin", notes: "Stock para reparaciones" },
  // Febrero
  { id: "h29", materialId: "29", type: "Egreso", quantity: 5, date: new Date("2025-02-14"), user: "Carlos Ruiz" },
  // Marzo
  { id: "h30", materialId: "41", type: "Ingreso", quantity: 5, date: new Date("2025-03-20"), user: "Admin" },
  { id: "h31", materialId: "10", type: "Egreso", quantity: 8, date: new Date("2025-03-28"), user: "Ana Gómez" },
  // Abril
  { id: "h32", materialId: "20", type: "Ingreso", quantity: 20, date: new Date("2025-04-12"), user: "Admin" },
  // Mayo
  { id: "h33", materialId: "3", type: "Egreso", quantity: 15, date: new Date("2025-05-02"), user: "Carlos Ruiz" },
  { id: "h34", materialId: "48", type: "Ingreso", quantity: 30, date: new Date("2025-05-18"), user: "Admin" },
  // Junio
  { id: "h35", materialId: "17", type: "Egreso", quantity: 5, date: new Date("2025-06-05"), user: "Juan Pérez" },
  { id: "h36", materialId: "34", type: "Ingreso", quantity: 20, date: new Date("2025-06-20"), user: "Admin" },
  // Julio
  { id: "h37", materialId: "7", type: "Egreso", quantity: 2, date: new Date("2025-07-01"), user: "Ana Gómez", notes: "Cambio de luminarias" },
  { id: "h38", materialId: "1", type: "Ajuste", quantity: 1, date: new Date("2025-07-10"), user: "Admin", notes: "Corrección de inventario" },
];
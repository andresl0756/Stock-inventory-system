import { Tool } from "@/types/tool";

export const mockTools: Tool[] = [
  // Disponibles (8)
  { id: "t1", code: "HER-001", name: "Taladro Percutor Inalámbrico 20V", brand: "DeWalt", status: "Disponible", description: "Potente taladro con 2 baterías de Li-Ion.", purchaseDate: new Date("2025-04-14"), location: "Taller A", serialNumber: "DW-12345" },
  { id: "t2", code: "HER-002", name: "Sierra Circular 7 1/4", brand: "Makita", status: "Disponible", description: "Sierra para cortes rápidos y precisos en madera.", purchaseDate: new Date("2025-03-15"), location: "Taller A" },
  { id: "t3", code: "HER-003", name: "Lijadora Orbital 5\"", brand: "Bosch", status: "Disponible", description: "Lijadora para acabados finos en superficies planas.", purchaseDate: new Date("2025-05-14"), location: "Taller B" },
  { id: "t4", code: "HER-004", name: "Nivel Láser Autonivelante", brand: "Stanley", status: "Disponible", description: "Proyecta líneas horizontales y verticales con precisión.", purchaseDate: new Date("2024-12-25"), location: "Bodega Principal", serialNumber: "ST-98765" },
  { id: "t6", code: "HER-006", name: "Amoladora Angular 4 1/2\"", brand: "DeWalt", status: "Disponible", description: "Para cortar y desbastar metal.", purchaseDate: new Date("2025-02-12"), location: "Taller A" },
  { id: "t8", code: "HER-008", name: "Pistola de Calor", brand: "Black & Decker", status: "Disponible", description: "Para decapar pintura, soldar plásticos, etc.", purchaseDate: new Date("2024-09-16"), location: "Bodega Principal" },
  { id: "t10", code: "HER-010", name: "Sierra de Inglete 10\"", brand: "Bosch", status: "Disponible", description: "Para cortes angulares precisos en molduras y madera.", purchaseDate: new Date("2024-11-06"), location: "Taller B" },
  { id: "t12", code: "HER-012", name: "Juego de Llaves Allen", brand: "Milwaukee", status: "Disponible", description: "Juego completo de llaves hexagonales.", purchaseDate: new Date("2025-06-13"), location: "Taller A" },

  // Prestadas (8)
  { id: "t5", code: "HER-005", name: "Llave de Impacto 1/2\"", brand: "Milwaukee", status: "Prestada", description: "Alto torque para tornillos y tuercas.", purchaseDate: new Date("2025-05-29"), location: "Vehículo 1" },
  { id: "t7", code: "HER-007", name: "Caladora Inalámbrica", brand: "Makita", status: "Prestada", description: "Para cortes curvos y rectos en diversos materiales.", purchaseDate: new Date("2025-04-24"), location: "Taller B" },
  { id: "t9", code: "HER-009", name: "Rotomartillo SDS Plus", brand: "Hilti", status: "Prestada", description: "Para perforación en concreto y demolición ligera.", purchaseDate: new Date("2025-01-14"), location: "Taller A", serialNumber: "HI-55443" },
  { id: "t11", code: "HER-011", name: "Multímetro Digital", brand: "Stanley", status: "Prestada", description: "Para mediciones eléctricas.", purchaseDate: new Date("2025-05-24"), location: "Vehículo 1" },
  { id: "t13", code: "HER-013", name: "Martillo Demoledor", brand: "Hilti", status: "Prestada", description: "Para trabajos pesados de demolición.", purchaseDate: new Date("2024-06-08"), location: "Taller A", serialNumber: "HI-11223" },
  { id: "t14", code: "HER-014", name: "Compresor de Aire 20 Gal", brand: "DeWalt", status: "Prestada", description: "Para herramientas neumáticas y pintura.", purchaseDate: new Date("2024-08-27"), location: "Bodega Principal" },
  { id: "t15", code: "HER-015", name: "Hidrolavadora Eléctrica", brand: "Bosch", status: "Prestada", description: "Limpieza a alta presión de superficies.", purchaseDate: new Date("2025-04-09"), location: "Vehículo 1" },
  { id: "t16", code: "HER-016", name: "Escalera de Tijera 8ft", brand: "Stanley", status: "Prestada", description: "Escalera de fibra de vidrio.", purchaseDate: new Date("2025-03-25"), location: "Taller B" },

  // En Reparación (3)
  { id: "t17", code: "HER-017", name: "Soldadora Inverter", brand: "Milwaukee", status: "En Reparación", description: "Equipo de soldadura portátil.", purchaseDate: new Date("2024-02-28"), location: "Taller A" },
  { id: "t18", code: "HER-018", name: "Sierra de Mesa 10\"", brand: "DeWalt", status: "En Reparación", description: "Para cortes longitudinales en madera.", purchaseDate: new Date("2023-11-21"), location: "Taller B", serialNumber: "DW-67890" },
  { id: "t19", code: "HER-019", name: "Generador Eléctrico 3500W", brand: "Black & Decker", status: "En Reparación", description: "Fuente de energía portátil.", purchaseDate: new Date("2024-10-07"), location: "Bodega Principal" },

  // Fuera de Servicio (1)
  { id: "t20", code: "HER-020", name: "Taladro de Banco", brand: "Makita", status: "Fuera de Servicio", description: "Motor quemado, pendiente de baja.", purchaseDate: new Date("2023-07-15"), location: "Taller A" },
];
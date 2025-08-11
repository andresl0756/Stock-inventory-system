import { ToolLoan } from "@/types/tool";

export const mockToolLoans: ToolLoan[] = [
  { 
    id: "l1", 
    toolId: "t13", // Martillo Demoledor
    user: "Juan Pérez", 
    loanDate: new Date("2025-06-20"), 
    estimatedReturnDate: new Date("2025-07-05") // Vencido
  },
  { 
    id: "l2", 
    toolId: "t14", // Compresor de Aire
    user: "Ana Silva", 
    loanDate: new Date("2025-07-02"), 
    estimatedReturnDate: new Date("2025-07-22") // Activo
  },
  { 
    id: "l3", 
    toolId: "t15", // Hidrolavadora
    user: "Carlos Rojas", 
    loanDate: new Date("2025-07-05"), 
    estimatedReturnDate: new Date("2025-07-18") // Activo
  },
  { 
    id: "l4", 
    toolId: "t16", // Escalera de Tijera
    user: "Juan Pérez", 
    loanDate: new Date("2025-05-10"), 
    estimatedReturnDate: new Date("2025-05-25") // Muy Vencido
  },
  { 
    id: "l5", 
    toolId: "t5", // Llave de Impacto
    user: "Luisa Torres", 
    loanDate: new Date("2025-07-10"), 
    estimatedReturnDate: new Date("2025-07-25") // Activo
  },
  { 
    id: "l6", 
    toolId: "t7", // Caladora Inalámbrica
    user: "Ana Silva", 
    loanDate: new Date("2025-06-25"), 
    estimatedReturnDate: new Date("2025-07-10") // Vencido
  },
  { 
    id: "l7", 
    toolId: "t9", // Rotomartillo
    user: "Mario Gomez", 
    loanDate: new Date("2025-06-28"), 
    estimatedReturnDate: new Date("2025-07-20") // Activo
  },
  { 
    id: "l8", 
    toolId: "t11", // Multímetro Digital
    user: "Juan Pérez", 
    loanDate: new Date("2025-06-15"), 
    estimatedReturnDate: new Date("2025-07-15") // Activo
  },
];
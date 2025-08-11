import { z } from "zod";

export const TOOL_STATUSES = ["Disponible", "Prestada", "En Reparación", "Fuera de Servicio"] as const;
export type ToolStatus = (typeof TOOL_STATUSES)[number];

export const TOOL_LOCATIONS = ["Taller A", "Taller B", "Bodega Principal", "Vehículo 1"] as const;
export type ToolLocation = (typeof TOOL_LOCATIONS)[number];

export const TOOL_BRANDS = ["DeWalt", "Makita", "Bosch", "Stanley", "Hilti", "Black & Decker", "Milwaukee"] as const;
export type ToolBrand = (typeof TOOL_BRANDS)[number];

export interface Tool {
  id: string;
  name: string;
  code: string;
  brand: ToolBrand;
  description?: string;
  serialNumber?: string;
  purchaseDate: Date;
  location: ToolLocation;
  status: ToolStatus;
  imageUrl?: string;
}

export interface ToolLoan {
  id: string;
  toolId: string;
  user: string;
  loanDate: Date;
  estimatedReturnDate: Date;
  returnDate?: Date;
}

export const toolFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres." }),
  code: z.string().min(1, { message: "El código es obligatorio." }),
  brand: z.enum(TOOL_BRANDS, { required_error: "La marca es obligatoria." }),
  description: z.string().optional(),
  serialNumber: z.string().optional(),
  purchaseDate: z.date({ required_error: "La fecha de compra es obligatoria." }),
  location: z.enum(TOOL_LOCATIONS, { required_error: "La ubicación es obligatoria." }),
  status: z.enum(TOOL_STATUSES, { required_error: "El estado es obligatorio." }),
});

export type ToolFormData = z.infer<typeof toolFormSchema>;
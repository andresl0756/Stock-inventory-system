export type MovementType = 'Ingreso' | 'Egreso' | 'Ajuste';
export const EXIT_TYPES = ["Mantenimiento", "Préstamo", "Transferencia", "Desecho", "Ajuste"] as const;
export type ExitType = (typeof EXIT_TYPES)[number];

export interface StockMovement {
  id: string;
  materialId: string;
  type: MovementType;
  quantity: number;
  date: Date;
  user: string;
  notes?: string;
}
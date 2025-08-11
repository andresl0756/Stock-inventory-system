// src/types/importTypes.ts

import { Material } from './index';

// Define qué campos esperamos del archivo Excel
export type MaterialImportData = Pick<
  Material,
  'codigo' | 'nombre' | 'unidad' | 'precio' | 'marca' | 'descripcion' | 'stock_actual' | 'stock_minimo' | 'stock_maximo'
> & {
  categoria_nombre?: string; // El excel tendrá el nombre de la categoría, no el ID
};

// Define la estructura de una fila después de ser validada
export interface ValidatedRow {
  rowNumber: number;
  isValid: boolean;
  errors: string[];
  originalData: Partial<MaterialImportData>; // Datos originales leídos del Excel
  validatedData?: MaterialImportData; // Datos limpios si la fila es válida
}

// Define la estructura para el resumen final de la importación
export interface ImportResult {
  successCount: number;
  errorCount: number;
}
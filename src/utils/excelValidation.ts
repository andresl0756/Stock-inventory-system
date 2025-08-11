// src/utils/excelValidation.ts

import { Material } from "@/types";
import { MaterialImportData, ValidatedRow } from "@/types/importTypes";

export const validateRow = (row: Partial<MaterialImportData>, rowNumber: number, existingMaterials: Material[]): ValidatedRow => {
  const errors: string[] = [];
  const existingCodes = existingMaterials.map(m => m.codigo);

  if (!row.nombre || String(row.nombre).length < 3) {
    errors.push("El nombre es inválido o demasiado corto.");
  }
  if (!row.codigo || String(row.codigo).length < 2) {
    errors.push("El código es inválido o demasiado corto.");
  }
  if (row.codigo && existingCodes.includes(String(row.codigo))) {
    errors.push("El código de este material ya existe en el sistema.");
  }
  if (typeof row.stock_actual !== 'number' || row.stock_actual < 0) {
    errors.push("El stock debe ser un número igual o mayor a 0.");
  }
  // Se pueden añadir más validaciones aquí...

  const isValid = errors.length === 0;
  
  return {
    rowNumber,
    isValid,
    errors,
    originalData: row,
    validatedData: isValid ? (row as MaterialImportData) : undefined,
  };
};
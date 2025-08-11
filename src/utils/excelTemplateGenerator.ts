// src/utils/excelTemplateGenerator.ts

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Categoria } from '@/types';

export const generateExcelTemplate = (categories: Categoria[]) => {
  const headers = [ "Nombre", "Código", "Categoría", "Marca", "Unidad", "Precio", "Stock", "Stock Mínimo", "Stock Máximo", "Descripción" ];
  
  const exampleCategory = categories.length > 0 ? categories[0].nombre : "Ej: Eléctrico";

  const exampleData = [
    [ "Cable AWG 12", "ELEC-001", exampleCategory, "Marca Ejemplo", "Rollo", 35000, 10, 5, 20, "Cable de cobre." ],
  ];

  const data = [headers, ...exampleData];
  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Materiales");
  
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
  
  saveAs(blob, "Plantilla_Importacion_Materiales.xlsx");
};
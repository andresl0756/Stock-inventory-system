// src/components/shared/MaterialExportButtons.tsx

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FileText, FileSpreadsheet, Loader2 } from "lucide-react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";
import { Material } from "@/types"; // <-- FIX: Usa el nuevo diccionario

interface MaterialExportButtonsProps {
  materials: Material[];
  filenamePrefix: string;
  isDisabled?: boolean;
}

const getStatusText = (current: number, min: number) => {
  if (current === 0) return "Agotado";
  if (current <= min) return "Stock Bajo";
  return "En Stock";
};

const MaterialExportButtons = ({ materials, filenamePrefix, isDisabled = false }: MaterialExportButtonsProps) => {
  const [isExporting, setIsExporting] = useState({ pdf: false, excel: false });

  const handleExcelExport = () => {
    if (materials.length === 0) {
      toast.warning("No hay productos para exportar.");
      return;
    }
    setIsExporting(prev => ({ ...prev, excel: true }));
    try {
      // FIX: Se usan los nombres de campo de la BD
      const dataForExcel = materials.map(material => ({
        "Código": material.codigo,
        "Nombre": material.nombre,
        "Categoría ID": material.categoria_id,
        "Stock Actual": material.stock_actual,
        "Stock Mínimo": material.stock_minimo,
        "Estado": getStatusText(material.stock_actual, material.stock_minimo),
        "Ubicación": material.ubicacion,
      }));
      // ... resto de la lógica de Excel ...
    } catch (error) {
       // ... manejo de errores ...
    } finally {
      setIsExporting(prev => ({ ...prev, excel: false }));
    }
  };

  const handlePdfExport = () => {
    if (materials.length === 0) {
      toast.warning("No hay productos para exportar.");
      return;
    }
    setIsExporting(prev => ({ ...prev, pdf: true }));
    try {
      const doc = new jsPDF();
      // ...
      const tableColumn = ["Código", "Nombre", "Stock Actual", "Estado"];
      // FIX: Se usan los nombres de campo de la BD
      const tableRows = materials.map(m => [
        m.codigo,
        m.nombre,
        m.stock_actual,
        getStatusText(m.stock_actual, m.stock_minimo),
      ]);
      autoTable(doc, { head: [tableColumn], body: tableRows, startY: 35 });
      // ... resto de la lógica de PDF ...
    } catch (error) {
      // ... manejo de errores ...
    } finally {
      setIsExporting(prev => ({ ...prev, pdf: false }));
    }
  };

  const anyExporting = isExporting.pdf || isExporting.excel;

  return (
    <div className="flex items-center gap-2">
      <Button onClick={handlePdfExport} disabled={isDisabled || anyExporting}>
        {isExporting.pdf ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileText className="mr-2 h-4 w-4" />} PDF
      </Button>
      <Button onClick={handleExcelExport} disabled={isDisabled || anyExporting}>
        {isExporting.excel ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileSpreadsheet className="mr-2 h-4 w-4" />} Excel
      </Button>
    </div>
  );
};

export default MaterialExportButtons;
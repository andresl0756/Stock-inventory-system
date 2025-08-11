// src/components/reports/ExportButtons.tsx

"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FileDown, Loader2 } from "lucide-react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";
import { EnrichedMovement } from "@/pages/Reports"; // <-- FIX

interface ExportButtonsProps {
  data: EnrichedMovement[];
}

const ExportButtons = ({ data }: ExportButtonsProps) => {
  const [isExporting, setIsExporting] = useState({ pdf: false, excel: false });
  
  const handleExcelExport = () => {
    // ...
    const formattedData = data.map((mov) => ({
        "Fecha": format(new Date(mov.fecha), "dd-MM-yyyy"),
        "Tipo": mov.tipo,
        "Material": mov.materiales?.nombre || "N/A", // <-- FIX
        "Categoría ID": mov.materiales?.categoria_id || "N/A", // <-- FIX
        "Cantidad": mov.cantidad,
        "Notas": mov.notas || "",
      }));
    // ...
  };
  
  // ... (El resto del componente se mantiene, con lógica similar)
  return <div>...</div>;
};

export default ExportButtons;
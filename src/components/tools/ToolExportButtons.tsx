"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { FileText, FileSpreadsheet, Loader2 } from "lucide-react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Tool } from "@/types/tool";

interface ToolExportButtonsProps {
  tools: Tool[];
  filenamePrefix: string;
  isDisabled?: boolean;
}

const ToolExportButtons = ({ tools, filenamePrefix, isDisabled = false }: ToolExportButtonsProps) => {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState({ pdf: false, excel: false });

  const handleExcelExport = () => {
    if (tools.length === 0) {
      toast({ title: "Advertencia", description: "No hay herramientas para exportar.", variant: "destructive" });
      return;
    }

    setIsExporting({ ...isExporting, excel: true });
    const toastId = toast({
      title: "Exportación iniciada",
      description: "Generando tu reporte en formato Excel...",
    });

    try {
      const dataForExcel = tools.map(tool => ({
        "Código": tool.code,
        "Nombre": tool.name,
        "Marca": tool.brand,
        "Descripción": tool.description || "",
        "Número de Serie": tool.serialNumber || "",
        "Fecha de Compra": format(tool.purchaseDate, "dd/MM/yyyy", { locale: es }),
        "Ubicación": tool.location,
        "Estado": tool.status,
      }));

      const ws = XLSX.utils.json_to_sheet(dataForExcel);
      ws['!cols'] = [
        { wch: 15 }, { wch: 40 }, { wch: 15 }, { wch: 30 },
        { wch: 20 }, { wch: 18 }, { wch: 15 }, { wch: 15 }
      ];
      
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Herramientas");

      const date = format(new Date(), 'yyyy-MM-dd');
      const filename = `${filenamePrefix}_${date}.xlsx`;

      XLSX.writeFile(wb, filename);

      toastId.update({
        id: toastId.id,
        title: "Exportación exitosa",
        description: `Se ha descargado el archivo "${filename}" con ${tools.length} herramientas.`,
      });
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      toastId.update({
        id: toastId.id,
        variant: "destructive",
        title: "Error de exportación",
        description: "Hubo un problema al generar el archivo Excel.",
      });
    } finally {
      setIsExporting({ ...isExporting, excel: false });
    }
  };

  const handlePdfExport = () => {
    if (tools.length === 0) {
      toast({ title: "Advertencia", description: "No hay herramientas para exportar.", variant: "destructive" });
      return;
    }
    
    setIsExporting({ ...isExporting, pdf: true });
    const toastId = toast({
      title: "Exportación iniciada",
      description: "Generando tu reporte en formato PDF...",
    });

    try {
      const doc = new jsPDF();
      const today = format(new Date(), "dd/MM/yyyy", { locale: es });
      const title = filenamePrefix.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

      doc.setFontSize(18);
      doc.text(`Reporte de ${title}`, 14, 22);
      doc.setFontSize(11);
      doc.setTextColor(100);
      doc.text(`Generado el: ${today}`, 14, 29);

      const tableColumn = ["Código", "Nombre", "Marca", "Ubicación", "Estado"];
      const tableRows = tools.map(t => [
        t.code,
        t.name,
        t.brand,
        t.location,
        t.status,
      ]);

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 35,
        theme: 'grid',
        headStyles: { fillColor: [34, 197, 94] }, // Tailwind green-500
      });

      const date = format(new Date(), "yyyy-MM-dd");
      const filename = `${filenamePrefix}_${date}.pdf`;
      doc.save(filename);

      toastId.update({
        id: toastId.id,
        title: "Exportación completada",
        description: `El reporte en PDF se ha descargado con ${tools.length} herramientas.`,
      });
    } catch (error) {
      console.error("Error exporting to PDF:", error);
      toastId.update({
        id: toastId.id,
        variant: "destructive",
        title: "Error de exportación",
        description: "No se pudo generar el reporte en PDF.",
      });
    } finally {
      setIsExporting({ ...isExporting, pdf: false });
    }
  };

  const anyExporting = isExporting.pdf || isExporting.excel;

  return (
    <div className="flex items-center gap-2">
      <Button 
        onClick={handlePdfExport} 
        disabled={isDisabled || anyExporting}
        className="!bg-blue-600 hover:!bg-blue-700 !text-white"
      >
        {isExporting.pdf ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FileText className="mr-2 h-4 w-4" />
        )}
        Exportar a PDF
      </Button>
      <Button 
        onClick={handleExcelExport} 
        disabled={isDisabled || anyExporting}
        className="!bg-blue-600 hover:!bg-blue-700 !text-white"
      >
        {isExporting.excel ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FileSpreadsheet className="mr-2 h-4 w-4" />
        )}
        Exportar a Excel
      </Button>
    </div>
  );
};

export default ToolExportButtons;
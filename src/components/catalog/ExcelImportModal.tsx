// src/components/catalog/ExcelImportModal.tsx

"use client";
import { useState, useCallback, useRef } from 'react';
import * as XLSX from 'xlsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Upload, File, XCircle, Loader2 } from 'lucide-react';
import { ValidatedRow } from '@/types/importTypes';
import { validateRow } from '@/utils/excelValidation';
import { Material } from '@/types';
import { ImportPreviewTable } from './ImportPreviewTable';
import { toast } from 'sonner';

interface ExcelImportModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onContinue: (data: ValidatedRow[]) => void;
  existingMaterials: Material[];
}

const headerMapping: { [key: string]: string } = {
  "Nombre": "nombre",
  "Categoría": "categoria_nombre",
  "Código": "codigo",
  "Marca": "marca",
  "Unidad": "unidad",
  "Precio": "precio",
  "Stock": "stock_actual",
  "Stock Mínimo": "stock_minimo", // Corregido
  "Stock Máximo": "stock_maximo", // Corregido
  "Descripción": "descripcion",
};

export const ExcelImportModal = ({ isOpen, onOpenChange, onContinue, existingMaterials }: ExcelImportModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [validatedRows, setValidatedRows] = useState<ValidatedRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback((fileToProcess: File) => {
    setIsLoading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json: any[] = XLSX.utils.sheet_to_json(worksheet);

        const mappedJson = json.map(row => {
          const newRow: { [key: string]: any } = {};
          for (const key in row) {
            if (headerMapping[key]) {
              newRow[headerMapping[key]] = row[key];
            }
          }
          return newRow;
        });

        const validations = mappedJson.map((row, index) => validateRow(row, index + 1, existingMaterials));
        setValidatedRows(validations);
      } catch (error) {
        toast.error("Error al procesar el archivo.", { description: "Asegúrate de que sea un formato de Excel válido."});
      } finally {
        setIsLoading(false);
      }
    };
    reader.readAsArrayBuffer(fileToProcess);
  }, [existingMaterials]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      processFile(selectedFile);
    }
  };

  const handleClearFile = () => {
    setFile(null);
    setValidatedRows([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validRowCount = validatedRows.filter(row => row.isValid).length;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Importar Materiales desde Excel</DialogTitle>
          <DialogDescription>Sube tu archivo para validar y previsualizar los datos antes de la importación final.</DialogDescription>
        </DialogHeader>
        
        {!file ? (
          <div className="h-48 border-2 border-dashed flex flex-col items-center justify-center" onClick={() => fileInputRef.current?.click()}>
            <Upload className="h-12 w-12 text-muted-foreground" />
            <p className="mt-2 text-muted-foreground">Haz clic o arrastra un archivo aquí</p>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".xlsx, .xls" />
          </div>
        ) : (
          <div className="flex items-center justify-between p-2 border rounded-md">
            <div className="flex items-center gap-2">
              <File className="h-6 w-6" />
              <span className="font-medium">{file.name}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={handleClearFile}><XCircle className="h-5 w-5 text-red-500" /></Button>
          </div>
        )}

        {isLoading && <div className="flex justify-center items-center h-72"><Loader2 className="h-8 w-8 animate-spin" /></div>}

        {validatedRows.length > 0 && !isLoading && (
          <>
            <ImportPreviewTable rows={validatedRows} />
            <p className="text-sm text-muted-foreground">Se encontraron {validatedRows.length} filas. {validRowCount} filas son válidas y se pueden importar.</p>
          </>
        )}
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={() => onContinue(validatedRows)} disabled={isLoading || validRowCount === 0}>
            Continuar con {validRowCount} Válidos
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
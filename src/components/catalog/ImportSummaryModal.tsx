import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ImportResult } from "@/types/importTypes";
import { CheckCircle2, XCircle } from "lucide-react";

interface ImportSummaryModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  result: ImportResult;
}

export const ImportSummaryModal = ({ isOpen, onOpenChange, result }: ImportSummaryModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Resultados de la Importación</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <p>El proceso de importación ha finalizado. Aquí está el resumen:</p>
          <div className="flex items-center gap-4 p-4 bg-green-50 border border-green-200 rounded-md">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
            <div>
              <p className="font-bold text-lg">{result.successCount} productos importados</p>
              <p className="text-sm text-green-800">Los materiales válidos han sido agregados al catálogo.</p>
            </div>
          </div>
          {result.errorCount > 0 && (
            <div className="flex items-center gap-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <XCircle className="h-8 w-8 text-red-600" />
              <div>
                <p className="font-bold text-lg">{result.errorCount} productos con errores</p>
                <p className="text-sm text-red-800">Estas filas no fueron importadas. Por favor, corrige el archivo y vuelve a intentarlo.</p>
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
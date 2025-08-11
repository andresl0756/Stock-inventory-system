// src/components/stock/StockHistoryModal.tsx

import { useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Material, MovimientoStock } from "@/types"; // <-- FIX: Usa el nuevo diccionario
import { supabase } from "@/integrations/supabase/client"; // <-- FIX: Importa Supabase
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "sonner";

interface StockHistoryModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  material: Material | null;
}

const StockHistoryModal = ({ isOpen, onOpenChange, material }: StockHistoryModalProps) => {
  // --- FIX: Se añade estado para el historial y la carga ---
  const [history, setHistory] = useState<MovimientoStock[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // --- FIX: Función para cargar el historial real desde Supabase ---
  const fetchHistory = useCallback(async (materialId: string) => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('movimientos_stock')
      .select('*')
      .eq('material_id', materialId)
      .order('fecha', { ascending: false }); // Ordena por fecha descendente

    if (error) {
      toast.error("No se pudo cargar el historial.", { description: error.message });
      setHistory([]);
    } else {
      setHistory(data || []);
    }
    setIsLoading(false);
  }, []);

  // --- FIX: Se ejecuta la carga de datos cuando se abre el modal ---
  useEffect(() => {
    if (isOpen && material) {
      fetchHistory(material.id);
    }
  }, [isOpen, material, fetchHistory]);

  if (!material) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          {/* FIX: Se usa la propiedad .nombre */}
          <DialogTitle>Historial de Movimientos: {material.nombre}</DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-right">Cantidad</TableHead>
                <TableHead>Motivo/Notas</TableHead>
                <TableHead>Usuario ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={5} className="text-center">Cargando historial...</TableCell></TableRow>
              ) : history.length > 0 ? (
                history.map(item => (
                  <TableRow key={item.id}>
                    <TableCell>{format(new Date(item.fecha), "dd/MM/yyyy", { locale: es })}</TableCell>
                    <TableCell>{item.tipo}</TableCell>
                    <TableCell className={`text-right font-medium ${item.tipo === 'egreso' ? 'text-red-500' : 'text-green-500'}`}>
                      {item.tipo === 'egreso' ? '-' : '+'}{item.cantidad}
                    </TableCell>
                    <TableCell>{item.motivo || item.notas || 'N/A'}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{item.usuario_id}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">No hay historial para este producto.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StockHistoryModal;
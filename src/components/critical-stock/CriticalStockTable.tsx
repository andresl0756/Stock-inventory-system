// src/components/critical-stock/CriticalStockTable.tsx

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Material } from "@/types"; // <-- FIX
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"; // FIX: Agregado TooltipProvider

interface CriticalStockTableProps {
  materials: Material[];
}

const CriticalStockTable = ({ materials }: CriticalStockTableProps) => {
  const getStatus = (material: Material) => {
    if (material.stock_actual === 0) {
      return <Badge variant="destructive" className="animate-pulse">Agotado</Badge>;
    }
    if (material.stock_actual <= material.stock_minimo) {
      return <Badge className="bg-yellow-500 hover:bg-yellow-600 text-black">Stock Bajo</Badge>;
    }
    return null;
  };

  return (
    <TooltipProvider>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Código</TableHead>
              <TableHead>Producto</TableHead>
              <TableHead>Categoría ID</TableHead>
              <TableHead className="text-center">Stock Actual</TableHead>
              <TableHead className="text-center">Stock Mínimo</TableHead>
              <TableHead className="text-center">Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {materials.length > 0 ? (
              materials.map((material) => (
                <TableRow key={material.id} className={material.stock_actual === 0 ? "bg-red-50/50" : ""}>
                  {/* FIX: Se usan los nombres de la BD */}
                  <TableCell className="font-mono text-xs">{material.codigo}</TableCell>
                  <TableCell className="font-medium">{material.nombre}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{material.categoria_id}</TableCell>
                  <TableCell className="text-center font-bold text-red-600">{material.stock_actual}</TableCell>
                  <TableCell className="text-center">{material.stock_minimo}</TableCell>
                  <TableCell className="text-center">{getStatus(material)}</TableCell>
                  <TableCell className="text-right">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">Ver detalles</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent><p>Ver detalles</p></TooltipContent>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  ¡Excelente! No hay productos con stock crítico.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </TooltipProvider>
  );
};

export default CriticalStockTable;
// src/components/dashboard/LowStockTable.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Material } from "@/types"; // <-- FIX
import { AlertTriangle, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LowStockTableProps {
  materials: Material[];
}

const LowStockTable = ({ materials }: LowStockTableProps) => {
  const navigate = useNavigate();

  // FIX: Usa los materiales reales y los nombres de la BD
  const lowStockMaterials = materials
    .filter(m => m.stock_actual <= m.stock_minimo)
    .sort((a, b) => a.stock_actual - b.stock_actual);

  const getStatus = (current: number, min: number) => {
    if (current === 0) return <Badge variant="destructive" className="gap-1"><AlertTriangle className="h-4 w-4" /> Agotado</Badge>;
    if (current <= min) return <Badge className="bg-yellow-500 hover:bg-yellow-600 gap-1"><AlertCircle className="h-4 w-4" /> Stock Bajo</Badge>;
    return null;
  };

  return (
    <Card className="flex flex-col h-[300px]">
      <CardHeader>
        <CardTitle className="text-base font-medium">Alertas de Stock ({lowStockMaterials.length})</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-grow overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Producto</TableHead>
              <TableHead className="text-center w-[120px]">Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lowStockMaterials.length > 0 ? lowStockMaterials.map(material => (
              <TableRow key={material.id} onClick={() => navigate('/stock-critico')} className="cursor-pointer">
                <TableCell>
                  {/* FIX: Se usan los nombres de la BD */}
                  <div className="font-medium">{material.nombre}</div>
                  <div className="text-xs text-muted-foreground">{material.codigo}</div>
                </TableCell>
                <TableCell className="text-center">{getStatus(material.stock_actual, material.stock_minimo)}</TableCell>
              </TableRow>
            )) : (
              <TableRow><TableCell colSpan={2} className="h-24 text-center">No hay alertas de stock.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default LowStockTable;
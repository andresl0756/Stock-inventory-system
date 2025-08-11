// src/components/reports/ReportSummaryTable.tsx

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MovimientoStock } from "@/types"; // <-- FIX
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { formatCurrency } from "@/lib/utils";
import { EnrichedMovement } from "@/pages/Reports"; // <-- FIX: Importa el tipo enriquecido

interface ReportSummaryTableProps {
  movements: EnrichedMovement[];
}

const ReportSummaryTable = ({ movements }: ReportSummaryTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Fecha</TableHead>
          <TableHead>Material</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead className="text-right">Cantidad</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {movements.length > 0 ? movements.map((mov) => (
            <TableRow key={mov.id}>
              <TableCell>{format(new Date(mov.fecha), "dd/MM/yyyy", { locale: es })}</TableCell>
              {/* FIX: Usa la tabla anidada 'materiales' y la propiedad 'nombre' */}
              <TableCell className="font-medium">{mov.materiales?.nombre || 'N/A'}</TableCell>
              <TableCell><Badge>{mov.tipo}</Badge></TableCell>
              <TableCell className="text-right">{mov.cantidad}</TableCell>
            </TableRow>
          )) : (
          <TableRow><TableCell colSpan={4} className="h-24 text-center">No hay movimientos.</TableCell></TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ReportSummaryTable;
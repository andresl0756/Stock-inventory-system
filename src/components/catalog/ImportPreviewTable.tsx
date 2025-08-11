// src/components/catalog/ImportPreviewTable.tsx

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ValidatedRow } from "@/types/importTypes";
import { CheckCircle2, XCircle } from "lucide-react";

interface ImportPreviewTableProps { 
  rows: ValidatedRow[];
}

export const ImportPreviewTable = ({ rows }: ImportPreviewTableProps) => {
  return (
    <div className="h-72 w-full rounded-md border overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Estado</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Código</TableHead>
            <TableHead>Errores</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.rowNumber} className={!row.isValid ? "bg-red-500/10" : ""}>
              <TableCell>
                {row.isValid 
                  ? <CheckCircle2 className="h-5 w-5 text-green-500" /> 
                  : <XCircle className="h-5 w-5 text-red-500" />}
              </TableCell>
              <TableCell>{row.originalData.nombre || "---"}</TableCell>
              <TableCell>{row.originalData.codigo || "---"}</TableCell>
              <TableCell className="text-xs text-red-600">{row.errors.join(', ')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
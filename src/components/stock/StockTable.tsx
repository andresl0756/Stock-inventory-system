// src/components/stock/StockTable.tsx
import React from "react";
import { Material } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown } from "lucide-react";

type SortDirection = 'ascending' | 'descending';
interface SortConfig {
  key: keyof Material;
  direction: SortDirection;
}

interface StockTableProps {
  materials: Material[];
  onSort: (key: keyof Material) => void;
  sortConfig: SortConfig | null;
  selectedIds: string[];
  onSelect: (id: string) => void;
  onSelectAll: () => void;
}

const getStatus = (current: number, min: number) => {
  if (current === 0) return <Badge variant="destructive">Agotado</Badge>;
  if (current <= min) return <Badge className="bg-yellow-500 text-black">Stock Bajo</Badge>;
  return <Badge className="bg-green-500 text-white">En Stock</Badge>;
};

const StockTable = ({ materials, onSort, sortConfig, selectedIds, onSelect, onSelectAll }: StockTableProps) => {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedIds.length > 0 && selectedIds.length === materials.length}
                onCheckedChange={onSelectAll}
              />
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => onSort('nombre')}>
                Producto <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Categoría ID</TableHead>
            <TableHead className="text-right">
              <Button variant="ghost" onClick={() => onSort('stock_actual')}>
                Stock Actual <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="text-right">Stock Mínimo</TableHead>
            <TableHead className="text-center">Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {materials.map((material) => (
            <TableRow key={material.id} data-state={selectedIds.includes(material.id) && "selected"}>
              <TableCell>
                <Checkbox
                  checked={selectedIds.includes(material.id)}
                  onCheckedChange={() => onSelect(material.id)}
                />
              </TableCell>
              <TableCell className="font-medium">{material.nombre}<br/><span className="text-xs text-gray-500">{material.codigo}</span></TableCell>
              <TableCell className="text-xs text-muted-foreground">{material.categoria_id}</TableCell>
              <TableCell className="text-right">{material.stock_actual}</TableCell>
              <TableCell className="text-right">{material.stock_minimo}</TableCell>
              <TableCell className="text-center">{getStatus(material.stock_actual, material.stock_minimo)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default StockTable;
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tool, ToolLoan } from "@/types/tool";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { MoreHorizontal, AlertTriangle, RotateCw, Trash2 } from "lucide-react";
import { isPast } from "date-fns";
import { cn } from "@/lib/utils";

interface LoanedToolsTableProps {
  loans: (ToolLoan & { tool: Tool })[];
  onReturn: (loanId: string) => void;
  onRenew: (loanId: string) => void;
  onReportLoss: (loanId: string) => void;
}

const LoanedToolsTable = ({ loans, onReturn, onRenew, onReportLoss }: LoanedToolsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Herramienta</TableHead>
          <TableHead>Usuario</TableHead>
          <TableHead>Fecha Préstamo</TableHead> {/* New column */}
          <TableHead>Devolución</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Días de Atraso</TableHead> {/* New column */}
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loans.length > 0 ? loans.map((loan) => {
          const isOverdue = isPast(loan.estimatedReturnDate);
          return (
            <TableRow key={loan.id} className={isOverdue ? "bg-destructive/10" : ""}>
              <TableCell className="font-medium">{loan.tool.name}</TableCell>
              <TableCell>{loan.user}</TableCell>
              <TableCell>{format(loan.loanDate, "dd/MM/yyyy", { locale: es })}</TableCell> {/* New cell */}
              <TableCell>{format(loan.estimatedReturnDate, "dd/MM/yyyy", { locale: es })}</TableCell>
              <TableCell>
                <Badge variant={isOverdue ? "destructive" : "outline"} className="flex items-center gap-1 w-fit">
                  {isOverdue ? <AlertTriangle className="h-3 w-3" /> : null}
                  {isOverdue ? "Vencido" : "Activo"}
                </Badge>
              </TableCell>
              <TableCell> {/* New cell for Días de Atraso */}
                {isOverdue ? (
                  <Badge variant="destructive" className="flex items-center gap-1 w-fit">
                    {Math.abs(Math.ceil((new Date().getTime() - loan.estimatedReturnDate.getTime()) / (1000 * 60 * 60 * 24)))} días
                  </Badge>
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Abrir menú</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onReturn(loan.id)}>
                      Registrar Devolución
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onRenew(loan.id)}>
                      <RotateCw className="mr-2 h-4 w-4" />
                      Renovar Préstamo
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive" onClick={() => onReportLoss(loan.id)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Reportar Pérdida
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          );
        }) : (
          <TableRow>
            <TableCell colSpan={7} className="h-24 text-center"> {/* Updated colSpan */}
              No hay herramientas prestadas actualmente.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default LoanedToolsTable;
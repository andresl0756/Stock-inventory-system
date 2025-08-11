"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpRight, AlertTriangle } from "lucide-react";
import { useMemo } from "react";
import { mockTools } from "@/data/mockTools";
import { mockToolLoans } from "@/data/mockToolLoans";
import { Tool, ToolLoan } from "@/types/tool";
import { isPast, format } from "date-fns";
import { es } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const LoanMetrics = () => {
  const toolsMap = useMemo(() => {
    return mockTools.reduce((acc, tool) => {
      acc[tool.id] = tool;
      return acc;
    }, {} as Record<string, Tool>);
  }, []);

  const activeLoans = useMemo(() => {
    return mockToolLoans
      .filter(loan => !loan.returnDate)
      .map(loan => ({ ...loan, tool: toolsMap[loan.toolId] }))
      .filter(loan => loan.tool)
      .sort((a, b) => b.loanDate.getTime() - a.loanDate.getTime()); // Sort by loanDate descending
  }, [toolsMap]);

  const overdueLoans = useMemo(() => {
    return activeLoans.filter(loan => isPast(loan.estimatedReturnDate))
      .sort((a, b) => b.estimatedReturnDate.getTime() - a.estimatedReturnDate.getTime()); // Sort by estimatedReturnDate descending
  }, [activeLoans]);

  const totalLoanedCount = activeLoans.length;
  const overdueLoanCount = overdueLoans.length;

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* Card 1: En Préstamo (Clickable with Modal) */}
      <Dialog>
        <DialogTrigger asChild>
          <Card className="bg-blue-600 text-white cursor-pointer hover:bg-blue-700 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">En Préstamo</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-white" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalLoanedCount}</div>
              <p className="text-xs text-blue-200">Items en Préstamo</p>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Herramientas en Préstamo</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Herramienta</TableHead>
                  <TableHead>Código</TableHead>
                  <TableHead>Prestado a</TableHead>
                  <TableHead>Fecha Préstamo</TableHead>
                  <TableHead>Devolución</TableHead> {/* Changed from Devolución Estimada */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeLoans.length > 0 ? activeLoans.map((loan, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{loan.tool.name}</TableCell>
                    <TableCell>{loan.tool.code}</TableCell>
                    <TableCell>{loan.user}</TableCell>
                    <TableCell>{format(loan.loanDate, "dd/MM/yyyy", { locale: es })}</TableCell>
                    <TableCell>{format(loan.estimatedReturnDate, "dd/MM/yyyy", { locale: es })}</TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                      No hay herramientas prestadas actualmente.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>

      {/* Card 2: Préstamos Vencidos (Clickable with Modal) */}
      <Dialog>
        <DialogTrigger asChild>
          <Card className="bg-red-600 text-white cursor-pointer hover:bg-red-700 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Préstamos Vencidos</CardTitle>
              <AlertTriangle className="h-4 w-4 text-white" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overdueLoanCount}</div>
              <p className="text-xs text-red-200">Préstamos con fecha de devolución superada</p>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Préstamos Vencidos</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Herramienta</TableHead>
                  <TableHead>Código</TableHead>
                  <TableHead>Prestado a</TableHead>
                  <TableHead>Días de atraso</TableHead>
                  <TableHead>Fecha vencimiento</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {overdueLoans.length > 0 ? overdueLoans.map((loan, index) => (
                  <TableRow key={index} className="bg-destructive/10">
                    <TableCell className="font-medium">{loan.tool.name}</TableCell>
                    <TableCell>{loan.tool.code}</TableCell>
                    <TableCell>{loan.user}</TableCell>
                    <TableCell>
                      <Badge variant="destructive" className="flex items-center gap-1 w-fit">
                        <AlertTriangle className="h-3 w-3" />
                        {Math.abs(Math.ceil((new Date().getTime() - loan.estimatedReturnDate.getTime()) / (1000 * 60 * 60 * 24)))} días
                      </Badge>
                    </TableCell>
                    <TableCell>{format(loan.estimatedReturnDate, "dd/MM/yyyy", { locale: es })}</TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                      No hay préstamos vencidos actualmente.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoanMetrics;
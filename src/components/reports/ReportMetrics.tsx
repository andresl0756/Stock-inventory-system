import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, Users } from "lucide-react";

interface ReportMetricsProps {
  totalCost: number;
  totalMovements: number;
  uniqueMaterials: number;
}

const ReportMetrics = ({ totalCost, totalMovements, uniqueMaterials }: ReportMetricsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Costo Total de Movimientos</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-institutional-blue">${totalCost.toLocaleString("es-CL")}</div>
          <p className="text-xs text-muted-foreground">Costo total de items en el período</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Movimientos Totales</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-institutional-blue">+{totalMovements}</div>
          <p className="text-xs text-muted-foreground">Registros en el período seleccionado</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Materiales Involucrados</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-institutional-blue">{uniqueMaterials}</div>
          <p className="text-xs text-muted-foreground">Materiales únicos en los movimientos</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportMetrics;
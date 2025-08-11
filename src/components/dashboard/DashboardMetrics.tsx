// src/components/dashboard/DashboardMetrics.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, PackageX, ArrowRightLeft } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Material } from "@/types"; // <-- FIX

interface DashboardMetricsProps {
  materials: Material[];
}

const DashboardMetrics = ({ materials }: DashboardMetricsProps) => {
  // FIX: Se usan los nombres de la BD y los materiales reales
  const totalProducts = materials.length;
  const lowStockProducts = materials.filter(m => m.stock_actual <= m.stock_minimo).length;
  const inventoryValue = materials.reduce((acc, m) => acc + (m.precio || 0) * m.stock_actual, 0);
  const todayMovements = 0; // Valor a calcular en el futuro

  const metrics = [
    { title: "Total Productos", value: totalProducts, icon: Package, color: "text-blue-500" },
    { title: "Stock Bajo", value: lowStockProducts, icon: PackageX, color: "text-yellow-500" },
    { title: "Valor Inventario", value: formatCurrency(inventoryValue), icon: DollarSign, color: "text-green-500" },
    { title: "Movimientos Hoy", value: todayMovements, icon: ArrowRightLeft, color: "text-purple-500" },
  ];
  
  // El JSX se mantiene igual
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.title} className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
            <metric.icon className={`h-4 w-4 ${metric.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardMetrics;
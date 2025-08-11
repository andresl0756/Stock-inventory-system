// src/components/dashboard/CriticalStockChart.tsx

"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Material, Categoria } from "@/types";

// --- FIX: La interfaz de props ahora acepta las categorías ---
interface CriticalStockChartProps {
  materials: Material[];
  categories: Categoria[];
}

const CriticalStockChart = ({ materials, categories }: CriticalStockChartProps) => {
  const categoryMap = new Map(categories.map(cat => [cat.id, cat.nombre]));

  const calculateCriticalStockData = (materials: Material[]) => {
    const criticalCounts: { [key: string]: number } = {};
    materials.forEach(material => {
      if (material.stock_actual <= material.stock_minimo) {
        const categoryName = categoryMap.get(material.categoria_id || '') || "Sin Categoría";
        criticalCounts[categoryName] = (criticalCounts[categoryName] || 0) + 1;
      }
    });
    return Object.entries(criticalCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => a.name.localeCompare(b.name));
  };

  const data = calculateCriticalStockData(materials);

  return (
    <Card>
       <CardHeader>
        <CardTitle>Productos Críticos por Categoría</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#f59e0b" name="Productos Críticos" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            No hay productos con stock crítico para mostrar.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CriticalStockChart;
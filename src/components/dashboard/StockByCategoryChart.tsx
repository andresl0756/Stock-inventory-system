// src/components/dashboard/StockByCategoryChart.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Material, Categoria } from "@/types"; // <-- FIX

interface StockByCategoryChartProps {
    materials: Material[];
    categories: Categoria[];
}

const StockByCategoryChart = ({ materials, categories }: StockByCategoryChartProps) => {
  const data = categories.map(category => ({
    name: category.nombre,
    stock: materials
      .filter(m => m.categoria_id === category.id)
      .reduce((acc, m) => acc + m.stock_actual, 0), // <-- FIX
  }));

  return (
    <Card className="shadow-sm">
      <CardHeader><CardTitle className="text-lg font-semibold">Stock por Categoría</CardTitle></CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#888888" fontSize={12} />
            <YAxis stroke="#888888" fontSize={12} />
            <Tooltip />
            <Bar dataKey="stock" fill="#1e40af" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default StockByCategoryChart;
// src/pages/Reports.tsx

import { useState, useMemo, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReportFilters, { ReportFilterValues } from "@/components/reports/ReportFilters";
import ReportSummaryTable from "@/components/reports/ReportSummaryTable";
import ExportButtons from "@/components/reports/ExportButtons";
import { MovimientoStock, Material } from "@/types"; // <-- FIX
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// FIX: Creamos un tipo enriquecido para los movimientos con el material anidado
export type EnrichedMovement = MovimientoStock & { materiales: Material | null };

const Reports = () => {
  const [filters, setFilters] = useState<ReportFilterValues>({});
  const [movements, setMovements] = useState<EnrichedMovement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchMovements = useCallback(async () => {
    setIsLoading(true);
    // FIX: Hacemos un "JOIN" para traer el material junto con el movimiento
    const { data, error } = await supabase
      .from('movimientos_stock')
      .select('*, materiales(*)'); // Esto anida el objeto 'materiales'

    if (error) {
      toast.error("Error al cargar los movimientos", { description: error.message });
    } else {
      setMovements(data as EnrichedMovement[]);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMovements();
  }, [fetchMovements]);

  const filteredData = useMemo(() => {
    let data = movements;
    // ... La lógica de filtrado se aplicaría aquí sobre 'data' ...
    return data;
  }, [movements, filters]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Reportes</h1>
        <ExportButtons data={filteredData} />
      </div>
      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <ReportFilters onFiltersChange={setFilters} />
        </div>
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader><CardTitle>Resumen de Movimientos</CardTitle></CardHeader>
            <CardContent>
              {isLoading ? <p>Cargando...</p> : <ReportSummaryTable movements={filteredData} />}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reports;
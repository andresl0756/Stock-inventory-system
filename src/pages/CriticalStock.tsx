// src/pages/CriticalStock.tsx

import { useState, useMemo, useEffect, useCallback } from 'react';
import { Material } from '@/types'; // <-- FIX
import CriticalStockTable from '@/components/critical-stock/CriticalStockTable';
import MaterialExportButtons from '@/components/shared/MaterialExportButtons';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const CriticalStockPage = () => {
  const [materials, setMaterials] = useState<Material[]>([]);

  const fetchMaterials = useCallback(async () => {
    const { data, error } = await supabase.from('materiales').select('*');
    if (error) toast.error("Error al cargar materiales");
    else setMaterials(data || []);
  }, []);

  useEffect(() => {
    fetchMaterials();
  }, [fetchMaterials]);

  const criticalMaterials = useMemo(() => {
    // FIX: Usa los nombres de la BD
    return materials.filter(m => m.stock_actual <= m.stock_minimo)
      .sort((a, b) => a.stock_actual - b.stock_actual);
  }, [materials]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Stock Crítico</h1>
          <p className="text-muted-foreground">Productos agotados o por debajo del mínimo.</p>
        </div>
        <MaterialExportButtons materials={criticalMaterials} filenamePrefix="stock_critico" />
      </div>
      <CriticalStockTable materials={criticalMaterials} />
    </div>
  );
};

export default CriticalStockPage;
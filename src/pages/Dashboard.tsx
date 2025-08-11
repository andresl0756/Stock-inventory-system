// src/pages/Dashboard.tsx

"use client";
import { useState, useEffect, useCallback } from "react";
import { Material, Categoria } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import DashboardMetrics from "@/components/dashboard/DashboardMetrics";
import LowStockTable from "@/components/dashboard/LowStockTable";
import CriticalStockChart from "@/components/dashboard/CriticalStockChart";

const Dashboard = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [categories, setCategories] = useState<Categoria[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    const { data: materialsData, error: materialsError } = await supabase.from('materiales').select('*');
    const { data: categoriesData, error: categoriesError } = await supabase.from('categorias').select('*');
    
    if (materialsError || categoriesError) {
      toast.error("Error al cargar los datos del dashboard.");
    } else {
      setMaterials(materialsData || []);
      setCategories(categoriesData || []);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (isLoading) {
    return <div className="p-8 text-center">Cargando Dashboard...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
      <DashboardMetrics materials={materials} />
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-3">
          {/* Espacio para futuros componentes como LoanMetrics */}
        </div>
        <div className="lg:col-span-2">
          <LowStockTable materials={materials} />
        </div>
        <div className="lg:col-span-5">
          <CriticalStockChart materials={materials} categories={categories} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
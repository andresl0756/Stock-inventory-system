// src/pages/Stock.tsx

import { useState, useMemo, useEffect, useCallback } from "react";
import { Material, Categoria } from "@/types";
import StockFilters from "@/components/stock/StockFilters";
import StockTable from "@/components/stock/StockTable";
import MaterialExportButtons from "@/components/shared/MaterialExportButtons";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type SortDirection = 'ascending' | 'descending';
interface SortConfig {
  key: keyof Material;
  direction: SortDirection;
}

const Stock = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [categories, setCategories] = useState<Categoria[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | "all">("all");
  const [sortConfig, setSortConfig] = useState<SortConfig | null>({ key: 'nombre', direction: 'ascending' });
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const { data: materialsData, error: materialsError } = await supabase.from('materiales').select('*');
    const { data: categoriesData, error: categoriesError } = await supabase.from('categorias').select('*');
    
    if (materialsError || categoriesError) {
      toast.error("Error al cargar los datos de stock.");
    } else {
      setMaterials(materialsData || []);
      setCategories(categoriesData || []);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSort = (key: keyof Material) => {
    let direction: SortDirection = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === sortedAndFilteredMaterials.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(sortedAndFilteredMaterials.map(m => m.id));
    }
  };

  const sortedAndFilteredMaterials = useMemo(() => {
    let filterableMaterials = [...materials];

    // Filtering
    filterableMaterials = filterableMaterials
      .filter((material) => categoryFilter === "all" ? true : material.categoria_id === categoryFilter)
      .filter((material) =>
        (material.nombre ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (material.codigo ?? '').toLowerCase().includes(searchTerm.toLowerCase())
      );

    // Sorting
    if (sortConfig !== null) {
      filterableMaterials.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    
    return filterableMaterials;
  }, [materials, searchTerm, categoryFilter, sortConfig]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Control de Stock</h1>
        <MaterialExportButtons materials={materials} filenamePrefix="reporte_stock" />
      </div>

      <StockFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        categories={categories}
      />
      
      {isLoading ? (
        <p>Cargando stock...</p>
      ) : (
        <StockTable
          materials={sortedAndFilteredMaterials}
          onSort={handleSort}
          sortConfig={sortConfig}
          selectedIds={selectedIds}
          onSelect={handleSelect}
          onSelectAll={handleSelectAll}
        />
      )}
    </div>
  );
};

export default Stock;
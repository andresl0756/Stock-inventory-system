// src/components/stock/StockFilters.tsx
import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// FIX: La lista de categorías ahora se pasa como prop para mayor flexibilidad
interface StockFiltersProps {
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
  categoryFilter: string | "all";
  onCategoryChange: (category: string | "all") => void;
  categories: { id: string, nombre: string }[]; // Recibe las categorías reales
}

const StockFilters = ({ searchTerm, onSearchChange, categoryFilter, onCategoryChange, categories }: StockFiltersProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <Input placeholder="Buscar por nombre o código..." value={searchTerm} onChange={(e) => onSearchChange(e.target.value)} className="max-w-sm"/>
      <Select value={categoryFilter} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-full md:w-[280px]"><SelectValue placeholder="Filtrar por categoría" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas las categorías</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat.id} value={cat.id}>{cat.nombre}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default StockFilters;
// src/pages/Catalog.tsx

import { useState, useMemo, useEffect, useContext, useCallback } from "react";
import { MaterialCard } from "@/components/catalog/MaterialCard";
import { MaterialFormModal } from "@/components/catalog/MaterialFormModal";
import { MaterialDetailModal } from "@/components/catalog/MaterialDetailModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { PlusCircle, Upload, Download, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { generateExcelTemplate } from "@/utils/excelTemplateGenerator";
import { ExcelImportModal } from "@/components/catalog/ExcelImportModal";
import { ValidatedRow, ImportResult } from '@/types/importTypes';
import { ImportSummaryModal } from "@/components/catalog/ImportSummaryModal";
import { supabase } from '@/integrations/supabase/client';
import { AuthContext } from '@/context/AuthContext';
import { Material, MaterialInsert, Categoria } from "@/types";

const ITEMS_PER_PAGE = 12;

const Catalog = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [categories, setCategories] = useState<Categoria[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [importResult, setImportResult] = useState<ImportResult>({ successCount: 0, errorCount: 0 });
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const { user, loading: authLoading } = useContext(AuthContext);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const { data: materialsData, error: materialsError } = await supabase.from('materiales').select('*').order('nombre');
    const { data: categoriesData, error: categoriesError } = await supabase.from('categorias').select('*');

    if (materialsError || categoriesError) {
      toast.error("Error al cargar los datos del catálogo.");
    } else {
      setMaterials(materialsData || []);
      setCategories(categoriesData || []);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!authLoading) {
      setAuthChecked(true);
      if (user) {
        fetchData();
      }
    }
  }, [authLoading, user, fetchData]);

  const filteredMaterials = useMemo(() => {
    return materials
      .filter((material) => categoryFilter === "all" ? true : material.categoria_id === categoryFilter)
      .filter((material) =>
        (material.nombre ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (material.codigo ?? '').toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [materials, searchTerm, categoryFilter]);

  const paginatedMaterials = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredMaterials.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredMaterials, currentPage]);

  const totalPages = Math.ceil(filteredMaterials.length / ITEMS_PER_PAGE);

  const handleSaveMaterial = async (formData: Partial<Material>) => {
    if (!user?.departamento_id) {
      toast.error("Error de usuario", { description: "No se pudo identificar tu departamento." });
      return;
    }

    if (formData.id) {
      const { error } = await supabase.from('materiales').update(formData).eq('id', formData.id);
      if (error) { toast.error("Error al actualizar.", { description: error.message }); } 
      else { toast.success("Material actualizado."); await fetchData(); }
    } else {
      const { id, created_at, ...restOfData } = formData;
      const insertPayload: MaterialInsert = {
        ...restOfData,
        nombre: formData.nombre || "Sin nombre",
        codigo: formData.codigo || `TEMP-${Date.now()}`,
        unidad: formData.unidad || "Unidad",
        departamento_id: user.departamento_id,
        created_by: user.id,
      };
      const { error } = await supabase.from('materiales').insert(insertPayload);
      if (error) { toast.error("Error al crear.", { description: error.message }); } 
      else { toast.success("Material creado."); await fetchData(); }
    }
    setIsFormOpen(false);
  };
  
  const handleDeleteMaterial = async (materialId: string) => {
    const { error } = await supabase.from('materiales').delete().eq('id', materialId);
    if (error) { toast.error("Error al eliminar.", { description: error.message }); } 
    else { toast.success("Material eliminado."); await fetchData(); }
  };

  const handleImportContinue = () => toast.info("Funcionalidad en desarrollo");
  const handleCreate = () => { setSelectedMaterial(null); setIsFormOpen(true); };
  const handleEdit = (material: Material) => { setSelectedMaterial(material); setIsFormOpen(true); };
  const handleViewDetails = (material: Material) => { setSelectedMaterial(material); setIsDetailOpen(true); };

  const canPerformActions = user?.rol === 'super_admin' || user?.rol === 'admin_departamento';

  return (
    <div className="space-y-8 p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Catálogo de Materiales</h1>
          <p className="text-lg text-muted-foreground">Busca, filtra y gestiona los materiales.</p>
        </div>
        <div className="flex gap-2">
          {canPerformActions && (
            <>
              <Button onClick={() => generateExcelTemplate(categories)} variant="outline" size="sm" className="flex items-center gap-2">
                <Download className="h-4 w-4" /> Plantilla
              </Button>
              <Button onClick={() => setIsImportModalOpen(true)} variant="outline" size="sm" className="flex items-center gap-2">
                <Upload className="h-4 w-4" /> Importar
              </Button>
              <Button onClick={handleCreate} size="sm" className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" /> Crear Material
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Input placeholder="Buscar por nombre o código..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="max-w-sm"/>
        <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value)}>
          <SelectTrigger className="w-full md:w-[200px]"><SelectValue placeholder="Filtrar por categoría" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las categorías</SelectItem>
            {categories.map((cat) => (<SelectItem key={cat.id} value={cat.id}>{cat.nombre}</SelectItem>))}
          </SelectContent>
        </Select>
      </div>

      {isLoading && <p className="text-center text-lg text-muted-foreground">Cargando materiales...</p>}
      
      {!isLoading && !user && authChecked && (
        <div className="text-center p-8 border-2 border-dashed rounded-lg mt-8">
          <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium">Acceso denegado</h3>
          <p className="mt-1 text-sm text-muted-foreground">Por favor, inicia sesión para ver los materiales.</p>
        </div>
      )}

      {!isLoading && user && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedMaterials.map((material) => (
              <MaterialCard key={material.id} material={material} onEdit={handleEdit} onViewDetails={handleViewDetails} onDelete={handleDeleteMaterial} canEdit={canPerformActions} />
            ))}
          </div>
          <div className="flex items-center justify-between mt-8">
            <p className="text-sm text-muted-foreground">
              Página {currentPage} de {totalPages}. Total: {filteredMaterials.length} materiales.
            </p>
            {totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem><PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.max(1, p - 1)); }} /></PaginationItem>
                  {[...Array(totalPages)].map((_, i) => (<PaginationItem key={i}><PaginationLink href="#" isActive={currentPage === i + 1} onClick={(e) => { e.preventDefault(); setCurrentPage(i + 1); }}>{i + 1}</PaginationLink></PaginationItem>))}
                  <PaginationItem><PaginationNext href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.min(totalPages, p + 1)); }} /></PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </>
      )}

      {canPerformActions && (
          <MaterialFormModal isOpen={isFormOpen} onOpenChange={setIsFormOpen} onSave={handleSaveMaterial} material={selectedMaterial} categories={categories} />
      )}
      <MaterialDetailModal isOpen={isDetailOpen} onOpenChange={setIsDetailOpen} material={selectedMaterial} />
      <ExcelImportModal isOpen={isImportModalOpen} onOpenChange={setIsImportModalOpen} onContinue={handleImportContinue} existingMaterials={materials}/>
      <ImportSummaryModal isOpen={isSummaryModalOpen} onOpenChange={setIsSummaryModalOpen} result={importResult}/>
    </div>
  );
};

export default Catalog;
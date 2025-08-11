import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import ToolCard from "@/components/tools/ToolCard";
import LoanedToolsTable from "@/components/tools/LoanedToolsTable";
import ToolLoanModal from "@/components/tools/ToolLoanModal";
import ToolFormModal from "@/components/tools/ToolFormModal";
import ToolFilters from "@/components/tools/ToolFilters";
import ToolExportButtons from "@/components/tools/ToolExportButtons"; // Import the new component
import { mockTools } from "@/data/mockTools";
import { mockToolLoans } from "@/data/mockToolLoans";
import { Tool, ToolLoan, ToolFormData, ToolStatus, ToolBrand, ToolLocation } from "@/types/tool";
import { PlusCircle } from "lucide-react";
import { add } from "date-fns";

const Tools = () => {
  const { toast } = useToast();
  const [tools, setTools] = useState<Tool[]>(mockTools);
  const [loans, setLoans] = useState<ToolLoan[]>(mockToolLoans);
  
  const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);
  const [isToolFormModalOpen, setIsToolFormModalOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [confirmation, setConfirmation] = useState<{ type: 'return' | 'loss'; loanId: string; toolName: string; } | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ToolStatus | "all">("all");
  const [brandFilter, setBrandFilter] = useState<ToolBrand | "all">("all");
  const [locationFilter, setLocationFilter] = useState<ToolLocation | "all">("all");

  const toolsMap = useMemo(() => tools.reduce((acc, tool) => ({ ...acc, [tool.id]: tool }), {} as Record<string, Tool>), [tools]);
  const activeLoans = useMemo(() => loans.filter(l => !l.returnDate).map(l => ({ ...l, tool: toolsMap[l.toolId] })).filter(l => l.tool)
    .sort((a, b) => b.loanDate.getTime() - a.loanDate.getTime()), [loans, toolsMap]); // Sort by loanDate descending
  const filteredTools = useMemo(() => {
    return tools.filter(tool => 
      (searchTerm === "" || tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || tool.code.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" || tool.status === statusFilter) &&
      (brandFilter === "all" || tool.brand === brandFilter) &&
      (locationFilter === "all" || tool.location === locationFilter)
    );
  }, [tools, searchTerm, statusFilter, brandFilter, locationFilter]);

  // Metrics calculations
  const totalTools = tools.length;
  const availableTools = tools.filter(t => t.status === "Disponible").length;
  const loanedTools = tools.filter(t => t.status === "Prestada").length;
  const inRepairTools = tools.filter(t => t.status === "En Reparación").length;

  const handleOpenLoanModal = (toolId: string) => {
    const tool = tools.find(t => t.id === toolId);
    if (tool) {
      setSelectedTool(tool);
      setIsLoanModalOpen(true);
    }
  };

  const handleOpenToolFormModal = (tool: Tool | null) => {
    setSelectedTool(tool);
    setIsToolFormModalOpen(true);
  };

  const handleSaveTool = (data: ToolFormData) => {
    if (data.id) {
      setTools(prev => prev.map(t => t.id === data.id ? { ...t, ...data } as Tool : t));
      toast({ title: "Herramienta Actualizada", description: `Se guardaron los cambios para "${data.name}".` });
    } else {
      const newTool: Tool = { ...data, id: `t${Date.now()}` } as Tool;
      setTools(prev => [newTool, ...prev]);
      toast({ title: "Herramienta Agregada", description: `Se agregó "${data.name}" al catálogo.` });
    }
    setIsToolFormModalOpen(false);
  };

  const handleConfirmLoan = (details: { user: string; estimatedReturnDate: Date }) => {
    if (!selectedTool) return;
    const newLoan: ToolLoan = {
      id: `l${Date.now()}`, toolId: selectedTool.id, user: details.user,
      loanDate: new Date(), estimatedReturnDate: details.estimatedReturnDate,
    };
    setLoans(prev => [...prev, newLoan]);
    setTools(prev => prev.map(t => t.id === selectedTool.id ? { ...t, status: "Prestada" } : t));
    toast({ title: "Préstamo Registrado", description: `"${selectedTool.name}" ha sido prestada a ${details.user}.` });
    setIsLoanModalOpen(false);
  };

  const handleReturnRequest = (loanId: string) => {
    const loan = activeLoans.find(l => l.id === loanId);
    if (loan) setConfirmation({ type: 'return', loanId, toolName: loan.tool.name });
  };

  const handleLossRequest = (loanId: string) => {
    const loan = activeLoans.find(l => l.id === loanId);
    if (loan) setConfirmation({ type: 'loss', loanId, toolName: loan.tool.name });
  };

  const handleRenewLoan = (loanId: string) => {
    setLoans(prev => prev.map(l => l.id === loanId ? { ...l, estimatedReturnDate: add(l.estimatedReturnDate, { days: 7 }) } : l));
    const toolName = activeLoans.find(l => l.id === loanId)?.tool.name;
    toast({ title: "Préstamo Renovado", description: `Se extendió el préstamo de "${toolName}" por 7 días.` });
  };

  const executeConfirmation = () => {
    if (!confirmation) return;
    const { type, loanId, toolName } = confirmation;
    const loan = loans.find(l => l.id === loanId);
    if (!loan) return;

    if (type === 'return') {
      setLoans(prev => prev.map(l => l.id === loanId ? { ...l, returnDate: new Date() } : l));
      setTools(prev => prev.map(t => t.id === loan.toolId ? { ...t, status: "Disponible" } : t));
      toast({ title: "Devolución Registrada", description: `La herramienta "${toolName}" ha sido devuelta.` });
    } else if (type === 'loss') {
      setLoans(prev => prev.map(l => l.id === loanId ? { ...l, returnDate: new Date() } : l));
      setTools(prev => prev.map(t => t.id === loan.toolId ? { ...t, status: "Fuera de Servicio" } : t));
      toast({ variant: "destructive", title: "Pérdida Reportada", description: `Se ha registrado la pérdida de "${toolName}".` });
    }
    setConfirmation(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Control de Herramientas</h1>
        <ToolExportButtons tools={tools} filenamePrefix="reporte_herramientas" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Herramientas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTools}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disponibles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableTools}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prestadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loanedTools}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Reparación</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inRepairTools}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Herramientas Prestadas Actualmente</CardTitle></CardHeader>
        <CardContent>
          <LoanedToolsTable loans={activeLoans} onReturn={handleReturnRequest} onRenew={handleRenewLoan} onReportLoss={handleLossRequest} />
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h2 className="text-2xl font-bold">Catálogo de Herramientas</h2>
          <Button onClick={() => handleOpenToolFormModal(null)}><PlusCircle className="mr-2 h-4 w-4" />Agregar Herramienta</Button>
        </div>
        <Card><CardContent className="p-4">
          <ToolFilters searchTerm={searchTerm} onSearchChange={setSearchTerm} statusFilter={statusFilter} onStatusChange={setStatusFilter} brandFilter={brandFilter} onBrandChange={setBrandFilter} locationFilter={locationFilter} onLocationChange={setLocationFilter} />
        </CardContent></Card>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTools.map(tool => <ToolCard key={tool.id} tool={tool} onLoan={handleOpenLoanModal} onEdit={handleOpenToolFormModal} />)}
        </div>
        {filteredTools.length === 0 && <div className="text-center py-12 text-muted-foreground"><p>No se encontraron herramientas.</p></div>}
      </div>

      <ToolLoanModal tool={selectedTool} isOpen={isLoanModalOpen} onOpenChange={setIsLoanModalOpen} onConfirmLoan={handleConfirmLoan} />
      <ToolFormModal isOpen={isToolFormModalOpen} onOpenChange={setIsToolFormModalOpen} onSave={handleSaveTool} tool={selectedTool} />
      
      <AlertDialog open={!!confirmation} onOpenChange={() => setConfirmation(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              {confirmation?.type === 'return' && `Estás a punto de registrar la devolución de la herramienta "${confirmation.toolName}". Esta acción no se puede deshacer.`}
              {confirmation?.type === 'loss' && `Estás a punto de reportar la pérdida de "${confirmation.toolName}". La herramienta pasará a estado "Fuera de Servicio".`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={executeConfirmation}>Confirmar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Tools;
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TOOL_STATUSES, TOOL_BRANDS, TOOL_LOCATIONS, ToolStatus, ToolBrand, ToolLocation } from "@/types/tool";

interface ToolFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: ToolStatus | "all";
  onStatusChange: (value: ToolStatus | "all") => void;
  brandFilter: ToolBrand | "all";
  onBrandChange: (value: ToolBrand | "all") => void;
  locationFilter: ToolLocation | "all";
  onLocationChange: (value: ToolLocation | "all") => void;
}

const ToolFilters = (props: ToolFiltersProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Input
        placeholder="Buscar por nombre o código..."
        value={props.searchTerm}
        onChange={(e) => props.onSearchChange(e.target.value)}
      />
      <Select value={props.statusFilter} onValueChange={props.onStatusChange as (value: string) => void}>
        <SelectTrigger><SelectValue placeholder="Filtrar por estado" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los estados</SelectItem>
          {TOOL_STATUSES.map(status => <SelectItem key={status} value={status}>{status}</SelectItem>)}
        </SelectContent>
      </Select>
      <Select value={props.brandFilter} onValueChange={props.onBrandChange as (value: string) => void}>
        <SelectTrigger><SelectValue placeholder="Filtrar por marca" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas las marcas</SelectItem>
          {TOOL_BRANDS.map(brand => <SelectItem key={brand} value={brand}>{brand}</SelectItem>)}
        </SelectContent>
      </Select>
      <Select value={props.locationFilter} onValueChange={props.onLocationChange as (value: string) => void}>
        <SelectTrigger><SelectValue placeholder="Filtrar por ubicación" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas las ubicaciones</SelectItem>
          {TOOL_LOCATIONS.map(location => <SelectItem key={location} value={location}>{location}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ToolFilters;
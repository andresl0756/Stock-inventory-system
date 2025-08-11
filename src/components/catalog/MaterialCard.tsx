// src/components/catalog/MaterialCard.tsx

// --- FIX: Se importa el tipo Material directamente desde supabase.ts (a través de Catalog) ---
import { Database } from "@/types/supabase";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ImageIcon, MoreVertical, Trash2, Zap, Droplet, Hammer, Paintbrush, SprayCan, AlertTriangle, AlertCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { formatCurrency } from "@/lib/utils";

type Material = Database['public']['Tables']['materiales']['Row'];

interface MaterialCardProps {
  material: Material;
  onEdit: (material: Material) => void;
  onViewDetails: (material: Material) => void;
  onDelete: (materialId: string) => void;
  canEdit: boolean;
}

const categoryIcons: Record<string, React.ElementType> = {
  // Esta sección necesitará conectarse a la tabla 'categorias' en el futuro
  'Eléctrico': Zap,
  'Plomería': Droplet,
  'Carpintería': Hammer,
  'Pintura': Paintbrush,
  'Limpieza': SprayCan,
};

const StockIndicator = ({ current, min }: { current: number; min: number }) => {
  let color = "bg-green-500";
  let text = "En Stock";
  let icon = null;

  if (current === 0) {
    color = "bg-red-500";
    text = "Agotado";
    icon = <AlertTriangle className="h-4 w-4" />;
  } else if (current <= min) {
    color = "bg-yellow-500";
    text = "Stock Bajo";
    icon = <AlertCircle className="h-4 w-4" />;
  }
  return <Badge className={`${color} hover:${color} text-white flex items-center justify-center gap-1`}>{icon} {text}</Badge>;
};

export const MaterialCard = ({ material, onEdit, onViewDetails, onDelete, canEdit }: MaterialCardProps) => {
  const CategoryIcon = categoryIcons[material.categoria_id || ''] || ImageIcon;

  return (
    <Card className="flex flex-col shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <CardHeader className="relative p-0">
        {canEdit && (
          <div className="absolute top-2 right-2">
            <AlertDialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button></DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEdit(material)}>Editar</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onViewDetails(material)}>Ver Detalles</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-500 focus:text-red-500 focus:bg-red-50">
                      <Trash2 className="mr-2 h-4 w-4" /><span>Eliminar</span>
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                </DropdownMenuContent>
              </DropdownMenu>
              <AlertDialogContent>
                <AlertDialogHeader><AlertDialogTitle>¿Estás realmente seguro?</AlertDialogTitle><AlertDialogDescription>Esta acción no se puede deshacer. Esto eliminará permanentemente el material "{material.nombre}" del catálogo.</AlertDialogDescription></AlertDialogHeader>
                <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={() => onDelete(material.id)} className="bg-red-600 hover:bg-red-700">Sí, eliminar</AlertDialogAction></AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
        <div className="aspect-video bg-gray-100 flex items-center justify-center rounded-t-lg">
            <CategoryIcon className="w-16 h-16 text-gray-300" />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        {/* --- FIX: Se usan los nombres de la base de datos --- */}
        <CardTitle className="text-lg font-semibold">{material.nombre}</CardTitle>
        <p className="text-sm text-gray-500">{material.codigo}</p>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        <StockIndicator current={material.stock_actual} min={material.stock_minimo} />
        <p className="text-lg font-bold">{formatCurrency(material.precio || 0)}</p>
      </CardFooter>
    </Card>
  );
};
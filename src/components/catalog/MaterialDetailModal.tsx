// src/components/catalog/MaterialDetailModal.tsx
import { Material } from "@/types"; // <-- FIX
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
// ... otras importaciones ...

export const MaterialDetailModal = ({ isOpen, onOpenChange, material }: { isOpen: boolean; onOpenChange: (isOpen: boolean) => void; material: Material | null; }) => {
  if (!material) return null;
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          {/* FIX: Se usan los nombres de la BD */}
          <DialogTitle>{material.nombre}</DialogTitle>
          <p className="text-sm text-muted-foreground">{material.marca} / {material.codigo}</p>
        </DialogHeader>
        {/* ... resto del JSX actualizado con material.stock_actual, material.precio, etc. ... */}
      </DialogContent>
    </Dialog>
  );
};
// src/components/shared/MaterialCombobox.tsx

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Material } from "@/types"; // <-- FIX

interface MaterialComboboxProps {
  materials: Material[];
  onSelect: (material: Material | null) => void;
  selectedMaterialId?: string | null;
}

export function MaterialCombobox({ materials, onSelect, selectedMaterialId }: MaterialComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const selectedMaterial = materials.find(m => m.id === selectedMaterialId);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" className="w-full justify-between">
          {/* FIX: Se usan los nombres de la BD */}
          {selectedMaterial ? selectedMaterial.nombre : "Seleccione un material..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput placeholder="Buscar material..." />
          <CommandList>
            <CommandEmpty>No se encontró el material.</CommandEmpty>
            <CommandGroup>
              {materials.map((material) => (
                <CommandItem
                  key={material.id}
                  value={`${material.nombre} ${material.codigo}`} // <-- FIX
                  onSelect={() => { onSelect(material); setOpen(false); }}
                >
                  <Check className={cn("mr-2 h-4 w-4", selectedMaterialId === material.id ? "opacity-100" : "opacity-0")} />
                  <div className="flex justify-between w-full">
                    <span>{material.nombre}</span> {/* <-- FIX */}
                    <span className="text-xs text-gray-500">Stock: {material.stock_actual}</span> {/* <-- FIX */}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
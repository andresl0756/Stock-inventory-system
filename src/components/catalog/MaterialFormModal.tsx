// src/components/catalog/MaterialFormModal.tsx

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Material, MaterialInsert, MaterialUpdate, Categoria } from "@/types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const materialSchema = z.object({
  nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres."),
  codigo: z.string().min(3, "El código es requerido."),
  marca: z.string().optional().nullable(),
  unidad: z.string({ required_error: "Debe seleccionar una unidad." }),
  ubicacion: z.string().min(3, "La ubicación es requerida.").optional().nullable(),
  descripcion: z.string().max(200, "Máximo 200 caracteres.").optional().nullable(),
  precio: z.coerce.number().min(0, "El precio no puede ser negativo.").optional().nullable(),
  stock_minimo: z.coerce.number().int().min(0, "No puede ser negativo."),
  stock_actual: z.coerce.number().int().min(0, "No puede ser negativo."),
  stock_maximo: z.coerce.number().int().min(1, "Debe ser al menos 1."),
  categoria_id: z.string().uuid("Debe ser una categoría válida.").optional().nullable(),
});

type MaterialFormValues = z.infer<typeof materialSchema>;

interface MaterialFormModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (data: Partial<Material>) => void;
  material: Material | null;
  categories: Categoria[];
}

const UNITS = ["Unidad", "Caja", "Rollo", "Litro", "Kilo"];

export const MaterialFormModal = ({ isOpen, onOpenChange, onSave, material, categories }: MaterialFormModalProps) => {
  const form = useForm<MaterialFormValues>({
    resolver: zodResolver(materialSchema),
  });

  useEffect(() => {
    if (isOpen) {
      const defaultValues = material 
        ? { ...material } 
        : {
            nombre: "",
            codigo: "",
            marca: "",
            unidad: UNITS[0],
            ubicacion: "",
            descripcion: "",
            precio: 0,
            stock_minimo: 0,
            stock_actual: 0,
            stock_maximo: 10,
            categoria_id: null,
          };
      form.reset(defaultValues as MaterialFormValues);
    }
  }, [isOpen, material, form]);

  const handleSubmit = (values: MaterialFormValues) => {
    if (material) {
        onSave({ id: material.id, ...values });
    } else {
        onSave(values);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{material ? "Editar Material" : "Crear Nuevo Material"}</DialogTitle>
          <DialogDescription>
            Complete los campos para {material ? "actualizar" : "agregar"} un material al catálogo.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
            <div className="grid grid-cols-2 gap-4">
                <FormField name="nombre" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Nombre <span className="text-red-500">*</span></FormLabel><FormControl><Input {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField name="codigo" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Código <span className="text-red-500">*</span></FormLabel><FormControl><Input {...field} value={field.value ?? ''}/></FormControl><FormMessage /></FormItem>
                )} />
                <FormField name="categoria_id" control={form.control} render={({ field }) => (
                <FormItem>
                    <FormLabel>Categoría</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value ?? undefined}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Seleccione una categoría" /></SelectTrigger></FormControl>
                    <SelectContent>{categories.map(cat => <SelectItem key={cat.id} value={cat.id}>{cat.nombre}</SelectItem>)}</SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
                )} />
                <FormField name="unidad" control={form.control} render={({ field }) => (
                <FormItem>
                    <FormLabel>Unidad <span className="text-red-500">*</span></FormLabel>
                    <Select onValueChange={field.onChange} value={field.value ?? undefined}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Seleccione una unidad" /></SelectTrigger></FormControl>
                    <SelectContent>{UNITS.map(unit => <SelectItem key={unit} value={unit}>{unit}</SelectItem>)}</SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
                )} />
            </div>
            <div className="grid grid-cols-3 gap-4">
                <FormField name="stock_actual" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Stock Actual <span className="text-red-500">*</span></FormLabel><FormControl><Input type="number" {...field} value={field.value ?? 0} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField name="stock_minimo" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Stock Mínimo <span className="text-red-500">*</span></FormLabel><FormControl><Input type="number" {...field} value={field.value ?? 0} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField name="stock_maximo" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Stock Máximo <span className="text-red-500">*</span></FormLabel><FormControl><Input type="number" {...field} value={field.value ?? 0} /></FormControl><FormMessage /></FormItem>
                )} />
            </div>
            <FormField name="precio" control={form.control} render={({ field }) => (
              <FormItem><FormLabel>Precio</FormLabel><FormControl><Input type="number" {...field} value={field.value ?? 0} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField name="ubicacion" control={form.control} render={({ field }) => (
              <FormItem><FormLabel>Ubicación</FormLabel><FormControl><Input {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField name="marca" control={form.control} render={({ field }) => (
              <FormItem><FormLabel>Marca</FormLabel><FormControl><Input {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField name="descripcion" control={form.control} render={({ field }) => (
              <FormItem><FormLabel>Descripción</FormLabel><FormControl><Textarea {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
            )} />
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
              <Button type="submit">Guardar Material</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
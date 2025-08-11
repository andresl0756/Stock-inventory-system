// src/pages/Exits.tsx

import React, { useState, useEffect, useCallback, useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Material, MovimientoStock } from "@/types"; // <-- USA EL NUEVO DICCIONARIO
import { AuthContext } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { MaterialCombobox } from "@/components/shared/MaterialCombobox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";

// --- FIX: El esquema ahora es más simple ---
const exitFormSchema = z.object({
  materialId: z.string({ required_error: "Debe seleccionar un material." }),
  cantidad: z.coerce.number().int().positive("La cantidad debe ser un número positivo."),
  motivo: z.string().min(3, "El motivo o destino es requerido."),
});

type ExitFormValues = z.infer<typeof exitFormSchema>;

const Exits = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const { user } = useContext(AuthContext);

  const form = useForm<ExitFormValues>({
    resolver: zodResolver(exitFormSchema),
    mode: 'onChange',
  });

  // --- FIX: Se obtienen los materiales reales de la base de datos ---
  const fetchMaterials = useCallback(async () => {
    const { data, error } = await supabase.from('materiales').select('*');
    if (data) setMaterials(data);
  }, []);

  useEffect(() => {
    fetchMaterials();
  }, [fetchMaterials]);

  const selectedMaterialId = form.watch("materialId");
  const selectedMaterial = materials.find(m => m.id === selectedMaterialId);

  const handleSubmit = async (data: ExitFormValues) => {
    if (!selectedMaterial || !user) return;

    if (data.cantidad > selectedMaterial.stock_actual) {
      form.setError("cantidad", { message: "No hay suficiente stock disponible." });
      return;
    }

    const stock_anterior = selectedMaterial.stock_actual;
    const stock_nuevo = stock_anterior - data.cantidad;

    // --- FIX: Se actualiza el stock en la base de datos ---
    const { error: updateError } = await supabase
      .from('materiales')
      .update({ stock_actual: stock_nuevo })
      .eq('id', data.materialId);

    if (updateError) {
      toast.error("Error al actualizar el stock", { description: updateError.message });
      return;
    }

    // --- FIX: Se registra el movimiento en la tabla de auditoría ---
    const movimiento: Omit<MovimientoStock, 'id' | 'fecha'> = {
        material_id: data.materialId,
        tipo: 'egreso',
        cantidad: data.cantidad,
        stock_anterior,
        stock_nuevo,
        motivo: data.motivo,
        usuario_id: user.id,
        notas: `Técnico: responsable no implementado aún.`
    };

    const { error: movementError } = await supabase.from('movimientos_stock').insert(movimiento);

    if (movementError) {
        toast.error("Stock actualizado, pero no se pudo registrar el movimiento.", { description: movementError.message });
    } else {
        toast.success("Egreso registrado exitosamente!");
    }
    
    await fetchMaterials(); // Recargar la lista de materiales con el stock actualizado
    form.reset({ materialId: undefined, cantidad: 0, motivo: "" });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Registrar Egreso de Material</h1>
      <Card className="max-w-2xl mx-auto shadow-sm">
        <CardHeader><CardTitle>Detalles del Egreso</CardTitle><CardDescription>Complete el formulario para registrar una salida de material.</CardDescription></CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField name="materialId" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Producto</FormLabel>
                  <FormControl>
                    <MaterialCombobox
                      materials={materials}
                      onSelect={(material) => field.onChange(material?.id)}
                      selectedMaterialId={field.value}
                    />
                  </FormControl><FormMessage />
                </FormItem>
              )} />
              {/* ... El resto del formulario se mantiene similar ... */}
              <Button type="submit" className="w-full" disabled={!selectedMaterialId}>Registrar Egreso</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Exits;
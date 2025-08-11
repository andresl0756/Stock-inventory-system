// src/pages/Entries.tsx

import React, { useState, useEffect, useCallback, useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Material, MovimientoStock, MaterialInsert } from "@/types";
import { AuthContext } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MaterialCombobox } from "@/components/shared/MaterialCombobox";

const entryDetailsSchema = z.object({
  cantidad: z.coerce.number().int().positive("La cantidad debe ser positiva."),
  motivo: z.string().min(3, "El proveedor o motivo es requerido."),
});

type EntryDetailsValues = z.infer<typeof entryDetailsSchema>;

const Entries = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [entryData, setEntryData] = useState<EntryDetailsValues | null>(null);
  const [step, setStep] = useState(1); // 1: Select Material, 2: Enter Details, 3: Confirm, 4: Success
  const { user } = useContext(AuthContext);

  const form = useForm<EntryDetailsValues>({
    resolver: zodResolver(entryDetailsSchema),
    mode: 'onChange',
  });

  const fetchMaterials = useCallback(async () => {
    const { data } = await supabase.from('materiales').select('*');
    if (data) setMaterials(data);
  }, []);

  useEffect(() => { fetchMaterials(); }, [fetchMaterials]);

  const handleSelectMaterial = (material: Material | null) => {
    setSelectedMaterial(material);
    if (material) {
      setStep(2);
    }
  };

  const handleDetailsSubmit = (data: EntryDetailsValues) => {
    setEntryData(data);
    setStep(3);
  };

  const handleConfirmEntry = async () => {
    if (!selectedMaterial || !entryData || !user) return;
    
    const stock_anterior = selectedMaterial.stock_actual;
    const stock_nuevo = stock_anterior + entryData.cantidad;

    const { error: updateError } = await supabase.from('materiales').update({ stock_actual: stock_nuevo }).eq('id', selectedMaterial.id);
    if (updateError) {
      toast.error("Error al actualizar stock", { description: updateError.message });
      return;
    }

    const movimiento: Omit<MovimientoStock, 'id' | 'fecha'> = {
      material_id: selectedMaterial.id,
      tipo: 'ingreso',
      cantidad: entryData.cantidad,
      stock_anterior,
      stock_nuevo,
      motivo: entryData.motivo,
      usuario_id: user.id,
      notas: null,
    };
    const { error: insertError } = await supabase.from('movimientos_stock').insert(movimiento);

    if (insertError) {
      toast.error("Stock actualizado, pero falló el registro del movimiento.", { description: insertError.message });
      return;
    }
    
    setStep(4);
    toast.success("Ingreso registrado exitosamente!");
    fetchMaterials(); // Recargar materiales para actualizar stock en la UI
  };

  const resetProcess = () => {
    setSelectedMaterial(null);
    setEntryData(null);
    form.reset();
    setStep(1);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Registrar Ingreso de Material</h1>
      <Card className="max-w-2xl mx-auto shadow-sm">
        <CardHeader>
          <CardTitle>Paso {step}: {
            step === 1 ? "Seleccionar Material" :
            step === 2 ? `Ingresar Detalles para "${selectedMaterial?.nombre}"` :
            step === 3 ? "Confirmar Ingreso" : "Proceso Completado"
          }</CardTitle>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <MaterialCombobox materials={materials} onSelect={handleSelectMaterial} selectedMaterialId={selectedMaterial?.id} />
          )}
          {step === 2 && (
             <Form {...form}>
              <form onSubmit={form.handleSubmit(handleDetailsSubmit)} className="space-y-4">
                <FormField name="cantidad" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>Cantidad a Ingresar</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField name="motivo" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>Proveedor / Motivo</FormLabel><FormControl><Input placeholder="Ej: Compra a proveedor X" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={resetProcess}>Atrás</Button>
                  <Button type="submit">Siguiente</Button>
                </div>
              </form>
            </Form>
          )}
          {step === 3 && selectedMaterial && entryData && (
            <div className="space-y-4">
              <p><strong>Material:</strong> {selectedMaterial.nombre}</p>
              <p><strong>Cantidad a Ingresar:</strong> {entryData.cantidad}</p>
              <p><strong>Stock Anterior:</strong> {selectedMaterial.stock_actual}</p>
              <p><strong>Nuevo Stock:</strong> {selectedMaterial.stock_actual + entryData.cantidad}</p>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>Atrás</Button>
                <Button onClick={handleConfirmEntry}>Confirmar Ingreso</Button>
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="text-center space-y-4">
              <p>El ingreso se ha registrado correctamente.</p>
              <Button onClick={resetProcess}>Registrar Otro Ingreso</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Entries;
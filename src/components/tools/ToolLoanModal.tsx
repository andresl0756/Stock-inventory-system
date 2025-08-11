"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tool } from "@/types/tool";
import { Stepper } from "@/components/shared/Stepper";

const loanFormSchema = z.object({
  user: z.string().min(3, { message: "El nombre de usuario es requerido." }),
  estimatedReturnDate: z.date().optional(),
}).refine(data => data.estimatedReturnDate !== undefined && data.estimatedReturnDate !== null, {
  message: "La fecha de devolución es requerida.",
  path: ["estimatedReturnDate"],
});

type LoanFormValues = z.infer<typeof loanFormSchema>;

interface ToolLoanModalProps {
  tool: Tool | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmLoan: (details: { user: string; estimatedReturnDate: Date }) => void;
}

const ToolLoanModal = ({ tool, isOpen, onOpenChange, onConfirmLoan }: ToolLoanModalProps) => {
  const [step, setStep] = useState(1);
  const steps = ["Usuario", "Fecha", "Confirmar"];

  const form = useForm<LoanFormValues>({
    resolver: zodResolver(loanFormSchema),
    defaultValues: { user: "", estimatedReturnDate: undefined }
  });

  useEffect(() => {
    if (isOpen) {
      form.reset();
      setStep(1);
    }
  }, [isOpen, form]);

  const handleNext = async () => {
    let isValid = false;
    if (step === 1) isValid = await form.trigger("user");
    if (step === 2) isValid = await form.trigger("estimatedReturnDate");
    if (isValid) setStep(s => s + 1);
  };

  const handleBack = () => setStep(s => s - 1);

  const onSubmit = (data: LoanFormValues) => {
    // Sabemos que en este punto la validación de Zod ha pasado,
    // por lo que 'user' es un string y 'estimatedReturnDate' es una Date.
    onConfirmLoan({
      user: data.user as string,
      estimatedReturnDate: data.estimatedReturnDate as Date,
    });
  };

  if (!tool) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Prestar Herramienta: {tool.name}</DialogTitle>
          <DialogDescription>Sigue los pasos para registrar el préstamo.</DialogDescription>
        </DialogHeader>
        
        <Stepper steps={steps} currentStep={step} />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className={cn(step !== 1 && "hidden")}>
              <FormField control={form.control} name="user" render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del Usuario</FormLabel>
                  <FormControl><Input placeholder="Ej: Juan Pérez" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <div className={cn(step !== 2 && "hidden")}>
              <FormField control={form.control} name="estimatedReturnDate" render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Fecha de Devolución</FormLabel> {/* Changed from Fecha de Devolución Estimada */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                          {field.value ? format(field.value, "dd/MM/yyyy", { locale: es }) : <span>Selecciona una fecha</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date()} initialFocus />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <div className={cn("space-y-4", step !== 3 && "hidden")}>
                <h3 className="font-semibold">Resumen del Préstamo</h3>
                <div className="p-4 border rounded-md space-y-2 text-sm">
                    <p><strong>Herramienta:</strong> {tool.name}</p>
                    <p><strong>Usuario:</strong> {form.watch("user")}</p>
                    <p><strong>Devolver antes de:</strong> {form.watch("estimatedReturnDate") ? format(form.watch("estimatedReturnDate"), "dd/MM/yyyy", { locale: es }) : 'N/A'}</p>
                </div>
                <p className="text-xs text-muted-foreground">Al confirmar, el usuario acepta la responsabilidad por el cuidado y la devolución de la herramienta en la fecha acordada.</p>
            </div>

            <DialogFooter className="pt-4">
              {step > 1 && <Button type="button" variant="ghost" onClick={handleBack}>Anterior</Button>}
              {step < steps.length && <Button type="button" onClick={handleNext}>Siguiente</Button>}
              {step === steps.length && <Button type="submit">Confirmar Préstamo</Button>}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ToolLoanModal;
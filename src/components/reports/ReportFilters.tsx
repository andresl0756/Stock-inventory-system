// src/components/reports/ReportFilters.tsx

"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// Suponiendo que tienes un componente DatePicker
// import { DatePicker } from "@/components/ui/date-picker";

const reportFilterSchema = z.object({
  dateRange: z.object({ from: z.date().optional(), to: z.date().optional() }).optional(),
  type: z.string().optional(),
  user: z.string().optional(),
  category: z.string().optional(),
});

export type ReportFilterValues = z.infer<typeof reportFilterSchema>;

interface ReportFiltersProps {
  onFiltersChange: (filters: ReportFilterValues) => void;
  // En el futuro, recibirás las listas de categorías y usuarios como props
  // categories: Categoria[];
  // users: UserProfile[];
}

const ReportFilters = ({ onFiltersChange }: ReportFiltersProps) => {
  const form = useForm<ReportFilterValues>({
    resolver: zodResolver(reportFilterSchema),
  });

  const onSubmit = (values: ReportFilterValues) => {
    onFiltersChange(values);
  };

  return (
    <Card>
      <CardHeader><CardTitle>Filtros de Reporte</CardTitle></CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Aquí irían los campos del formulario, como DatePicker para el rango de fechas */}
            <FormField name="type" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Movimiento</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Todos" /></SelectTrigger></FormControl>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="ingreso">Ingreso</SelectItem>
                    <SelectItem value="egreso">Egreso</SelectItem>
                    <SelectItem value="ajuste">Ajuste</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )} />
            <Button type="submit" className="w-full">Aplicar Filtros</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ReportFilters;
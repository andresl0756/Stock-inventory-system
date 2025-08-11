import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileWarning } from "lucide-react";

// Datos de ejemplo para simular borradores o tareas pendientes
const pendingTasks = [
  { id: 1, name: "Completar registro de 'Taladro percutor'", progress: 80 },
  { id: 2, name: "Verificar ingreso de 'Cajas de tornillos'", progress: 50 },
];

const PendingTasksWidget = () => {
  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileWarning className="text-yellow-500" />
          <span>Tareas Pendientes</span>
        </CardTitle>
        <CardDescription>
          Tienes algunas tareas sin finalizar. ¡No pierdas tu progreso!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pendingTasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <p className="font-medium">{task.name}</p>
              <Button size="sm">Continuar</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PendingTasksWidget;
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tool, ToolStatus } from "@/types/tool";
import { Wrench, MapPin, CalendarDays, Edit } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface ToolCardProps {
  tool: Tool;
  onLoan: (toolId: string) => void;
  onEdit: (tool: Tool) => void;
}

const getStatusClass = (status: ToolStatus): string => {
  switch (status) {
    case "Disponible":
      return "bg-green-100 text-green-800 border-green-200 hover:bg-green-200";
    case "Prestada":
      return "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200";
    case "En Reparación":
      return "bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200";
    case "Fuera de Servicio":
      return "bg-red-100 text-red-800 border-red-200 hover:bg-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200";
  }
};

const ToolCard = ({ tool, onLoan, onEdit }: ToolCardProps) => {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{tool.name}</CardTitle>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(tool)}>
            <Edit className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
        <CardDescription>{tool.brand} - {tool.code}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <div className="flex items-center justify-between text-sm">
          <p className="text-muted-foreground">Estado:</p>
          <Badge className={cn("border", getStatusClass(tool.status))}>{tool.status}</Badge>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-2" />
          <span>{tool.location}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4 mr-2" />
          <span>Comprada: {format(tool.purchaseDate, "dd MMM yyyy", { locale: es })}</span>
        </div>
        <p className="pt-2 text-sm text-muted-foreground">{tool.description}</p>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          disabled={tool.status !== "Disponible"}
          onClick={() => onLoan(tool.id)}
        >
          Prestar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ToolCard;
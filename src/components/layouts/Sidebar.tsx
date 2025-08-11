import { NavLink, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  LayoutDashboard,
  Book,
  Boxes,
  ArrowRightLeft,
  FileText,
  Wrench,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  AlertTriangle,
  LogOut,
  UserCircle,
} from 'lucide-react';
import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

const IconWrapper = ({ Icon, ...props }) => (
  <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
    <Icon 
      size={16} 
      className="w-4 h-4" 
      style={{ 
        width: '16px', 
        height: '16px',
        minWidth: '16px',
        minHeight: '16px'
      }}
      {...props}
    />
  </div>
);

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/catalog', icon: Book, label: 'Catálogo de Materiales' },
  { to: '/stock', icon: Boxes, label: 'Control de Stock' },
  { to: '/stock-critico', icon: AlertTriangle, label: 'Stock Crítico' },
  {
    label: 'Movimientos',
    icon: ArrowRightLeft,
    subItems: [
      { to: '/entries', label: 'Ingresos' },
      { to: '/exits', label: 'Egresos' },
    ],
  },
  { to: '/reports', icon: FileText, label: 'Reportes' },
  { to: '/tools', icon: Wrench, label: 'Herramientas' },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const openCollapsible = useMemo(() => {
    const activeItem = navItems.find(item => 
      item.subItems?.some(sub => location.pathname.startsWith(sub.to))
    );
    return activeItem?.label;
  }, [location.pathname]);

  return (
    <TooltipProvider>
      <aside
        className={cn(
          'flex flex-col border-r border-gray-700 bg-gray-900 transition-all duration-300 ease-in-out',
          isCollapsed ? 'w-20' : 'w-64'
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-700 px-4">
          <img 
            src="/Logo_DuocUC.png" 
            alt="Duoc UC Logo" 
            className={cn('h-10', isCollapsed && 'hidden')} 
          />
          <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5 text-white" />
            ) : (
              <ChevronLeft className="h-5 w-5 text-white" />
            )}
          </Button>
        </div>
        <nav className="flex-1 flex flex-col space-y-2 p-2 overflow-y-auto">
          {navItems.map((item) =>
            item.subItems ? (
              <Collapsible key={item.label} defaultOpen={openCollapsible === item.label}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className={cn(
                          'w-full flex items-center gap-3 rounded-lg px-3 py-2 text-gray-100 hover:bg-gray-700 hover:text-white transition-colors',
                          isCollapsed ? 'justify-center' : 'justify-start'
                        )}
                      >
                        <IconWrapper Icon={item.icon} />
                        <span className={cn('flex-1 text-left', isCollapsed && 'hidden')}>
                          {item.label}
                        </span>
                        {!isCollapsed && (
                          <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                  </TooltipTrigger>
                  {isCollapsed && <TooltipContent side="right">{item.label}</TooltipContent>}
                </Tooltip>
                <CollapsibleContent className="space-y-1 py-1 pl-6">
                  {item.subItems.map((subItem) => (
                    <Tooltip key={subItem.to}>
                      <TooltipTrigger asChild>
                        <NavLink
                          to={subItem.to}
                          end
                          className={({ isActive }) =>
                            cn(
                              'w-full flex items-center gap-3 rounded-lg px-3 py-2 text-gray-100 hover:bg-gray-700 hover:text-white transition-colors',
                              isActive && 'bg-blue-600 text-white',
                              isCollapsed && 'justify-center'
                            )
                          }
                        >
                          <span className={cn('flex-1 text-left', isCollapsed && 'hidden')}>
                            {subItem.label}
                          </span>
                        </NavLink>
                      </TooltipTrigger>
                      {isCollapsed && <TooltipContent side="right">{subItem.label}</TooltipContent>}
                    </Tooltip>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <Tooltip key={item.to}>
                <TooltipTrigger asChild>
                  <NavLink
                    to={item.to}
                    end
                    className={({ isActive }) =>
                      cn(
                        'w-full flex items-center gap-3 rounded-lg px-3 py-2 text-gray-100 hover:bg-gray-700 hover:text-white transition-colors',
                        isActive && 'bg-blue-600 text-white',
                        isCollapsed && 'justify-center'
                      )
                    }
                  >
                    <IconWrapper Icon={item.icon} />
                    <span className={cn('flex-1 text-left', isCollapsed && 'hidden')}>
                      {item.label}
                    </span>
                  </NavLink>
                </TooltipTrigger>
                {isCollapsed && <TooltipContent side="right">{item.label}</TooltipContent>}
              </Tooltip>
            )
          )}
        </nav>

        <div className="mt-auto border-t border-gray-700 p-2">
          <div className={cn("flex items-center gap-3 p-2 rounded-lg", isCollapsed && "justify-center")}>
            <UserCircle className="h-8 w-8 text-white flex-shrink-0" />
            <div className={cn("flex-1 overflow-hidden", isCollapsed && "hidden")}>
              <p className="text-sm font-semibold text-white truncate">{user?.nombre_completo}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            </div>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  'w-full flex items-center gap-3 rounded-lg px-3 py-2 text-gray-100 hover:bg-red-800 hover:text-white transition-colors',
                  isCollapsed ? 'justify-center' : 'justify-start'
                )}
                onClick={logout}
              >
                <IconWrapper Icon={LogOut} />
                <span className={cn('flex-1 text-left', isCollapsed && 'hidden')}>
                  Cerrar Sesión
                </span>
              </Button>
            </TooltipTrigger>
            {isCollapsed && <TooltipContent side="right">Cerrar Sesión</TooltipContent>}
          </Tooltip>
        </div>
      </aside>
    </TooltipProvider>
  );
};

export default Sidebar;
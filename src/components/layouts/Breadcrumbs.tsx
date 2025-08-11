import { useLocation, NavLink } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const breadcrumbNameMap: { [key: string]: string } = {
  '/': 'Dashboard',
  '/catalog': 'Catálogo de Materiales',
  '/stock': 'Control de Stock',
  '/stock-critico': 'Stock Crítico',
  '/entries': 'Ingresos',
  '/exits': 'Egresos',
  '/reports': 'Reportes',
  '/tools': 'Herramientas',
  '/activity': 'Actividad',
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav className="flex mb-6" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        <li className="inline-flex items-center">
          <NavLink to="/" className="text-sm font-medium text-gray-500 hover:text-blue-600">
            Dashboard
          </NavLink>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const name = breadcrumbNameMap[to] || value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' ');

          return (
            <li key={to}>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <NavLink
                  to={to}
                  className={cn(
                    "ml-1 text-sm font-medium md:ml-2",
                    isLast ? "text-gray-800 cursor-default" : "text-gray-500 hover:text-blue-600"
                  )}
                  onClick={(e) => isLast && e.preventDefault()}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {name}
                </NavLink>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;